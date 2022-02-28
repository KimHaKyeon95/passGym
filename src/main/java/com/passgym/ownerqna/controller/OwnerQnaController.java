package com.passgym.ownerqna.controller;

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
import com.passgym.ownerqna.entity.OwnerQna;
import com.passgym.ownerqna.service.OwnerQnaService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("ownerqna/*")
public class OwnerQnaController {
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private OwnerQnaService service;
	
	@Autowired
	ObjectMapper objectMapper;
	
	@GetMapping("/{ownerNo}")
	public Object userqna(@PathVariable(name="ownerNo") String ownerNo) {
		Map<String,Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		try {
			List<OwnerQna> oq = service.findOwnerQna(ownerNo);
			returnMap.put("ownerQnaList", oq);
		} catch (FindException e) {
			e.printStackTrace();
		}
		returnMap.put("msg", msg);
		returnMap.put("status", status);
		return returnMap;
	}
	
	@PostMapping("/")
	public Object ownerqna(@RequestBody Map<String,Object> requestMap, HttpSession session) {
		Map<String,Object> returnMap = new HashMap<>();
		String msg = "";
		int status = 0;
		try {
			OwnerQna oq = new OwnerQna();
			String title = (String)requestMap.get("title");
			String content = (String)requestMap.get("content");
			String ownerNo = (String)requestMap.get("ownerNo");
			oq.setTitle(title);
			oq.setContent(content);
			oq.setOwnerNo(ownerNo);
			oq.setReplyStatus(0);
			oq.setQnaDate(new Date());
			service.addOwnerQna(oq);
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
