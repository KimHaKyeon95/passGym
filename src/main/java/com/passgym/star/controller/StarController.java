package com.passgym.star.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.passgym.exception.AddException;
import com.passgym.service.StarService;
import com.passgym.star.entity.Star;

@RestController
@RequestMapping("star/*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StarController {
	
	Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	StarService service;
	
	@PostMapping("/")
	public Object addStar(@RequestBody Map<String,Object> requestMap) {
		Map<String, Object> returnMap = new HashMap<>();
		//0실패1성공
		int status = 0;
		String msg = "";
		try {
			Star star = new Star();
			String paymentNo = (String)requestMap.get("paymentNo");
			int starPoint = Integer.parseInt((String)requestMap.get("star"));
			logger.info(paymentNo);
			logger.info("" + starPoint);
			star.setPaymentNo(paymentNo);
			star.setStar(starPoint);
			service.addStar(star);
			status = 1;
			msg = "별점추가 성공";
		} catch (AddException e) {
			e.printStackTrace();
			msg = e.getMessage();
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
}
