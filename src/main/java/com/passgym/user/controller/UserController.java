package com.passgym.user.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.exception.FindException;
import com.passgym.exception.ModifyException;
import com.passgym.exception.RemoveException;
import com.passgym.gympass.entity.GymPass;
import com.passgym.user.entity.User;
import com.passgym.user.service.UserService;

@RestController
@RequestMapping("user/*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	UserService service;
	
	@Autowired
	ObjectMapper objectMapper;
	
	@GetMapping("/")
	public Object user(HttpSession session) {
		//세션에서 가져올것
//		User sessionUser = (User)session.getAttribute("User");
//		if(sessionUser == null) {
//			logger.info("로그인 안됨");
//		}
//		int userNo = sessionUser.getUserNo();
		int userNo = 1;
		Map<String, Object> returnMap = new HashMap<>();
		
		try {
			User user = service.findById(userNo);
			session.setAttribute("user", user);
			String name = user.getName();
			String id = user.getId();
			String pwd = user.getPwd();
			String phoneNo = user.getPhoneNo();
			String addr = user.getAddr();
			String addrDetail = user.getAddrDetail();
			String zipcode = user.getZipcode();
			
			Map<String, Object> map = new HashMap<>();
			map.put("userNo", userNo);
			map.put("name", name);
			map.put("id", id);
			map.put("pwd", pwd);
			map.put("pwdChk", "");
			map.put("phoneNo", phoneNo);
			map.put("addr", addr);
			map.put("addrDetail", addrDetail);
			map.put("zipcode", zipcode);
			
			String result = objectMapper.writeValueAsString(map);
			return result;
		}catch(FindException e) {
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
		}
		return returnMap;
	}
	
	@PutMapping("/")
	public Object editUser(@RequestBody Map<String,Object> requestMap, HttpSession session) {
		//세션에서 가져올것
//		User sessionUser = (User)session.getAttribute("User");
//		if(sessionUser == null) {
//			logger.info("로그인 안됨");
//		}
//		int userNo = sessionUser.getUserNo();
		int userNo = 1;
		User user;
		
		//결과값
		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		try {
			user = service.findById(userNo);
			//String id = user.getId();
			String name = (String)requestMap.get("name");
			String pwd = (String)requestMap.get("pwd");
			String phoneNo = (String)requestMap.get("phoneNo");
			String zipcode = (String)requestMap.get("zipcode");
			String addr = (String)requestMap.get("addr");
			String addrDetail = (String)requestMap.get("addrDetail");
			
			user.setName(name);
			user.setPwd(pwd);
			user.setPhoneNo(phoneNo);
			user.setZipcode(zipcode);
			user.setAddr(addr);
			user.setAddrDetail(addrDetail);
			
			service.modifyUser(user);
			session.setAttribute("user", user);
			msg = "수정에 성공했습니다.";
			status = 1;
		} catch (FindException e) {
			e.printStackTrace();
			msg = e.getMessage();
		} catch (ModifyException e) {
			e.printStackTrace();
			msg = e.getMessage();
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
	
	@PutMapping("/withdrawal")
	public Object withdrawalUser(HttpSession session) {
		//세션에서 가져올것
//		User sessionUser = (User)session.getAttribute("User");
//		if(sessionUser == null) {
//			logger.info("로그인 안됨");
//		}
//		int userNo = sessionUser.getUserNo();
		int userNo = 1;
		User user;
		
		//결과값
		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		try {
			user = service.findById(userNo);
			user.setUserStatus(0);
			
			service.withdrawalUser(user);
			session.removeAttribute("User");
			msg = "회원탈퇴에 성공했습니다.";
			status = 1;
		} catch (FindException e) {
			e.printStackTrace();
			msg = e.getMessage();
		} catch (RemoveException e) {
			e.printStackTrace();
			msg = e.getMessage();
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
	
	
	@GetMapping("/gympasses")
	public Object getGympasses(HttpSession session) {
		//세션에서 가져올것
//		User sessionUser = (User)session.getAttribute("User");
//		if(sessionUser == null) {
//			logger.info("로그인 안됨");
//		}
//		int userNo = sessionUser.getUserNo();
		int userNo = 1;
		try {
			
			List<Map> GymPasses = new ArrayList<>();
			//지울것
			User sessionUser = service.findById(userNo);
			List<GymPass> gympassList = sessionUser.getGymPasses();
			
			for(GymPass gp: gympassList) {
				Map<String, Object> GymPassMap = new HashMap<>();
				String paymentNo = gp.getPaymentNo();
				String status = "사용중";
				if(gp.getStatus() == 1) {
					status = "대기중";
				}else if(gp.getStatus() == 2) {
					status = "일시정지";
				}else if(gp.getStatus() == 3) {
					status = "만료됨";
				}else if(gp.getStatus() == 4) {
					status = "환불";
				}
				String gymName = gp.getPass().getGym().getName();
				String ownerNo = gp.getPass().getGym().getOwnerNo();
				String passName = gp.getPass().getPassName();
				int PassNo = gp.getPass().getPassPk().getPassNo();
				
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				String startDate =  formatter.format(gp.getStartDate());
				String endDate = formatter.format(gp.getEndDate());
				double avgStar = Math.round((double)gp.getPass().getGym().getTotalStar() / gp.getPass().getGym().getTotalMember());
				//long remain = (gp.getEndDate().getTime() - gp.getStartDate().getTime()) / (24*60*60*1000);
				int star = 0;
				if(gp.getStar() != null) {
					star = gp.getStar().getStar();
				}
				
				GymPassMap.put("paymentNo", paymentNo);
				GymPassMap.put("ownerNo", ownerNo);
				GymPassMap.put("status", status);
				GymPassMap.put("gymName", gymName);
				GymPassMap.put("passName", passName);
				GymPassMap.put("PassNo", PassNo);
				GymPassMap.put("startDate", startDate);
				GymPassMap.put("endDate", endDate);
				GymPassMap.put("avgStar", avgStar);
				//GymPassMap.put("remain", remain);
				GymPassMap.put("star", star);
				
				GymPasses.add(GymPassMap);
			}

			
			String result = objectMapper.writeValueAsString(GymPasses);
			return result;
		}catch(FindException e) {
			Map<String, Object> returnMap = new HashMap<>();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
			return returnMap;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			Map<String, Object> returnMap = new HashMap<>();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
			return returnMap;
		}
	}
}
