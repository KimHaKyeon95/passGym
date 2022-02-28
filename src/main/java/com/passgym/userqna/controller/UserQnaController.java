package com.passgym.userqna.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.exception.AddException;
import com.passgym.exception.FindException;
import com.passgym.userqna.entity.UserQna;
import com.passgym.userqna.service.UserQnaService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("userqna/*")
public class UserQnaController {
private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private UserQnaService service;
	
	@Autowired
	ObjectMapper objectMapper;
	
	@GetMapping("/{userNo}")
	public Object userqna(@PathVariable(name="userNo") int userNo) {
		Map<String,Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		try {
			List<UserQna> uq = service.findUserQna(userNo);
			returnMap.put("userQnaList", uq);
		} catch (FindException e) {
			e.printStackTrace();
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
	
	@PostMapping("/")
	public Object userqna(@RequestBody Map<String,Object> requestMap, HttpSession session) {
		Map<String,Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		try {
			UserQna uq = new UserQna();
			String title = (String)requestMap.get("title");
			String content = (String)requestMap.get("content");
			int userNo = (Integer)requestMap.get("userNo");
			uq.setTitle(title);
			uq.setContent(content);
			uq.setUserNo(userNo);
			uq.setReplyStatus(0);
			uq.setQnaDate(new Date());
			service.addUserQna(uq);
			msg = "문의 성공";
			status = 1;
		} catch (AddException e) {
			e.printStackTrace();
			msg = e.getMessage();
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
}
