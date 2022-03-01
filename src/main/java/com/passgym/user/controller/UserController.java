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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.exception.AddException;
import com.passgym.exception.FindException;
import com.passgym.exception.ModifyException;
import com.passgym.exception.RemoveException;
import com.passgym.gympass.entity.GymPass;
import com.passgym.user.entity.User;
import com.passgym.user.service.UserService;

@RestController
@RequestMapping("user/*")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserService service;

	@Autowired
	ObjectMapper objectMapper;

	@GetMapping("iddupchk")
	@ResponseBody
	public Map <String, Object> iddupchk(String id) throws FindException{
		String resultMsg = "";
		int status = 0;
		try {
			service.iddupchk(id);
			resultMsg = "이미 사용중인 아이디입니다.";
		} catch(FindException e) {
			e.printStackTrace();
			resultMsg = "사용가능한 아이디";
			status = 1;
		}
		Map <String, Object> returnMap = new HashMap<>();
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}

	@PostMapping("")
	public Object signup(@RequestBody Map <String, Object> requestMap){
		String resultMsg = "";
		int status = 0;
		try {
			String id = (String)requestMap.get("id");
			String pwd = (String)requestMap.get("pwd");
			String name = (String)requestMap.get("name");
			String phoneNo = (String)requestMap.get("phoneNo");
			String zipcode = (String)requestMap.get("zipcode");
			String addr = (String)requestMap.get("addr");
			String addrDetail = (String)requestMap.get("addrDetail");
			User user = new User(); //id, pwd, name, phoneNo, zipcode, addr, addrDetail
			user.setId(id);
			user.setPwd(pwd);
			user.setName(name);
			user.setPhoneNo(phoneNo);
			user.setZipcode(zipcode);
			user.setAddr(addr);
			user.setAddrDetail(addrDetail);
			User user = new User();
			user.setUserStatus(1);
			service.signup(user);
			status = 1;
			resultMsg = "가입 성공";
		} catch (AddException e) {
			e.printStackTrace();
			resultMsg = e.getMessage(); //"가입 실패";
		}
		Map <String, Object> returnMap = new HashMap<>();
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}

	@PostMapping("login")
	public Map <String, Object> login(@RequestBody Map <String, Object> requestMap, HttpSession session) {
		//String id, String pwd, HttpSession session) throws FindException{

		session.removeAttribute("user"); //초기화
		String resultMsg = "";
		int status = 0;
		String id = (String)requestMap.get("id");
		String pwd = (String)requestMap.get("pwd");
		Map <String, Object> returnMap = new HashMap<>();

		try {
			User user = service.login(id, pwd);
			for(GymPass gp: user.getGymPasses()) {
				logger.info(gp.getPaymentNo());
			}
			session.setAttribute("user", user);
			resultMsg = "로그인 성공";
			status = 1;
			returnMap.put("user", user.getUserNo());
		} catch(FindException e) {
			e.printStackTrace();
			resultMsg = "로그인 실패";
		}

		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);

		return returnMap;
	}

	@GetMapping("logout")
	public Object logout(HttpSession session) {
		Map <String, Object> returnMap = new HashMap<>();
		String resultMsg = "s";
		int status = 0;
		session.removeAttribute("user");
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}

	@PostMapping("searchid")
	public Object searchid(@RequestBody Map <String, String> request) {
		String resultMsg = "";
		int status = 0;
		String name = request.get("name");
		String phoneNo = request.get("phoneNo");
		try {
			String userId = service.searchid(name, phoneNo);
			status = 1;
			resultMsg = userId;
		} catch(FindException e) {
			e.printStackTrace();
			resultMsg = "아이디 찾기 실패";
		}
		Map <String, Object> returnMap = new HashMap<>();
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}

	@PostMapping("searchpwd")
	public Object searchpwd(@RequestBody Map <String, String> request) {
		String resultMsg = "";
		int status = 0;
		String id = (String)request.get("id");
		String phoneNo = (String)request.get("phoneNo");
		logger.info("아이디 전화번호" + id +"  " + phoneNo);
		try {
			String userPwd = service.searchpwd(id, phoneNo);
			status = 1;
			resultMsg = userPwd;
		} catch(FindException e) {
			e.printStackTrace();
			resultMsg = "비밀번호 찾기 실패";
		}
		Map <String, Object> returnMap = new HashMap<>();
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}




	@GetMapping("/")
	public Object user(HttpSession session) {
		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		//세션에서 가져올것
		User sessionUser = (User)session.getAttribute("user");
		if(sessionUser == null) {
			logger.info("로그인 안됨");
			msg = "로그인 안됨";
		}else {
			int userNo = sessionUser.getUserNo();
			//int userNo = 1;
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
				e.printStackTrace();
				msg = e.getMessage();
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				msg = e.getMessage();
			}
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}

	@PutMapping("/")
	public Object editUser(@RequestBody Map<String,Object> requestMap, HttpSession session) {
		//세션에서 가져올것

		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		//세션에서 가져올것
		User sessionUser = (User)session.getAttribute("user");
		if(sessionUser == null) {
			logger.info("로그인 안됨");
			msg = "로그인 안됨";
		}else {
			try {
				User user;
				user = sessionUser;
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
			} catch (ModifyException e) {
				e.printStackTrace();
				msg = e.getMessage();
			}
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}

	@PutMapping("/withdrawal")
	public Object withdrawalUser(HttpSession session) {
		//세션에서 가져올것

		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		User sessionUser = (User)session.getAttribute("user");
		if(sessionUser == null) {
			logger.info("로그인 안됨");
			msg = "로그인 안됨";
		}else {
			try {
				sessionUser.setUserStatus(0);
				service.withdrawalUser(sessionUser);
				session.removeAttribute("User");
				msg = "회원탈퇴에 성공했습니다.";
				status = 1;
			} catch (RemoveException e) {
				e.printStackTrace();
				msg = e.getMessage();
			}
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}


	@GetMapping("/gympasses")
	public Object getGympasses(HttpSession session) {
		//세션에서 가져올것

		Map<String, Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		User sessionUser = (User)session.getAttribute("user");
		if(sessionUser == null) {
			logger.info("로그인 안됨");
			msg = "로그인 안됨";
		}else {
			try {	
				List<Map> GymPasses = new ArrayList<>();
				List<GymPass> gympassList = sessionUser.getGymPasses();
				
				for(GymPass gp: gympassList) {
					Map<String, Object> GymPassMap = new HashMap<>();
					String paymentNo = gp.getPaymentNo();
					String gpStatus = "사용중";
					if(gp.getStatus() == 1) {
						gpStatus = "대기중";
					}else if(gp.getStatus() == 2) {
						gpStatus = "일시정지";
					}else if(gp.getStatus() == 3) {
						gpStatus = "만료됨";
					}else if(gp.getStatus() == 4) {
						gpStatus = "환불";
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
					GymPassMap.put("status", gpStatus);
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
			}catch (JsonProcessingException e) {
				e.printStackTrace();
				msg = e.getMessage();
			}
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
}
