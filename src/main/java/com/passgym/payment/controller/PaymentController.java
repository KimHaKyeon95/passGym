package com.passgym.payment.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.passgym.exception.AddException;
import com.passgym.gympass.entity.GymPass;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.payment.entity.Payment;
import com.passgym.service.PaymentService;
import com.passgym.user.entity.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class PaymentController {
	Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	PaymentService service;

	@PostMapping("/payment")
	public Object payment(@RequestBody Map<String, Object> requestMap, HttpSession session) {
		// 세션에서 가져올것
		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		User sessionUser = (User) session.getAttribute("user");
		if (sessionUser == null) {
			logger.info("로그인 안됨");
			msg = "로그인 안됨";
		} else {
			try {
				String paymentNo = (String) requestMap.get("paymentNo");
				int paymentPrice = Integer.parseInt((String) requestMap.get("paymentPrice"));
				int paymentType = (int) requestMap.get("paymentType");
				String bankName = (String) requestMap.get("bankName");

				Map<String, Object> gpMap = (Map) requestMap.get("gymPass");
				String ownerNo = (String) gpMap.get("ownerNo");
				int passNo = Integer.parseInt((String) gpMap.get("passNo"));
				int userNo = Integer.parseInt((String) gpMap.get("userNo"));

				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				Date startDate = formatter.parse((String) gpMap.get("startDate"));
				Date endDate = formatter.parse((String) gpMap.get("endDate"));

				int pauseCount = (int) gpMap.get("pauseCount");
				int pauseDate = (int) gpMap.get("pauseDate");
				int gpStatus = (int) gpMap.get("status");

				// 결제 정보 생성
				Payment pay = new Payment();
				pay.setPaymentNo(paymentNo);
				pay.setPaymentPrice(paymentPrice);
				pay.setPaymentType(paymentType);
				pay.setBankName(bankName);
				pay.setPaymentDate(new Date());
				// 결제 관련 이용권 정보 생성
				GymPass gp = new GymPass();
				gp.setPayment(pay);// 결제정보와 연결

				Pass pass = new Pass();
				PassPK passPK = new PassPK();

				passPK.setOwnerNo(ownerNo);
				passPK.setPassNo(passNo);
				pass.setPassPk(passPK);
				gp.setPass(pass);

				User u = new User();
				u.setUserNo(userNo);
				gp.setUser(u);

				gp.setStartDate(startDate);
				gp.setEndDate(endDate);
				gp.setPauseCount(pauseCount);
				gp.setPauseDate(pauseDate);
				gp.setStatus(gpStatus);
				pay.setGymPass(gp);

				service.addPayment(pay);
				status = 1;
				msg = "결제에 성공했습니다.";
			} catch (ParseException e) {
				e.printStackTrace();
				msg = e.getMessage();
			} catch (AddException e) {
				e.printStackTrace();
				msg = e.getMessage();
			}
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}

}
