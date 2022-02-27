package com.passgym.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.passgym.exception.FindException;
import com.passgym.user.entity.User;
import com.passgym.user.service.UserService;

@RestController
@RequestMapping("user/*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserService service;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
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
	public void signup(@RequestBody Map <String, Object> requestMap){
//		String resultMsg = "";
//		int status = 0;
//		try {
//			String id = (String)requestMap.get("id");
//			String pwd = (String)requestMap.get("pwd");
//			user.setUserStatus(1);
//			service.signup(user);
//			status = 1;
//			resultMsg = "가입 성공";
//		} catch (AddException e) {
//			e.printStackTrace();
//			resultMsg = e.getMessage(); //"가입 실패";
//		}
//		Map <String, Object> returnMap = new HashMap<>();
//		returnMap.put("msg", resultMsg);
//		returnMap.put("status", status);
//		return returnMap;
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
	
	@RequestMapping("logout")
	public ResponseEntity logout(HttpSession session) {
		session.removeAttribute("user");
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("searchid")
	@ResponseBody
	public Map <String, Object> searchid(String name, String phoneNo) throws FindException {
		String resultMsg = "";
		int status = 0;
		String userId = service.searchid(name, phoneNo);
		status = 1;
		resultMsg = "아이디 " + userId;
		Map <String, Object> returnMap = new HashMap<>();
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}
	
	@PostMapping("searchpwd")
	@ResponseBody
	public Map <String, Object> searchpwd(String id, String phoneNo) throws FindException {
		String resultMsg = "";
		int status = 0;
		String userPwd = service.searchid(id, phoneNo);
		status = 1;
		resultMsg = "비밀번호 " + userPwd;
		Map <String, Object> returnMap = new HashMap<>();
		returnMap.put("msg", resultMsg);
		returnMap.put("status", status);
		return returnMap;
	}
	
//	@GetMapping("removeuser")
//	@ResponseBody
//	public Map <String, Object> removeuser(String id, String pwd){
//		
//	}
}
