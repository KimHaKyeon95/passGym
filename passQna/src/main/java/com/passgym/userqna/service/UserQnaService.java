package com.passgym.userqna.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.AddException;
import com.passgym.exception.FindException;
import com.passgym.repository.UserQnaRepository;
import com.passgym.userqna.entity.UserQna;

@Service
public class UserQnaService {
	
	@Autowired
	private UserQnaRepository repository;
	
	Logger logger = LoggerFactory.getLogger(getClass());
	
	public List<UserQna> findUserQna(int userNo) throws FindException{
		List<UserQna> uqList = null;
		try {
			uqList = repository.findByUserNo(userNo);
			if(uqList.size() <= 0) {
				throw new FindException("조회할 목록이 없습니다.");
			}
		}catch(FindException e) {
			e.printStackTrace();
		}catch(Exception e) {
			e.printStackTrace();
			throw new FindException("조회에 실패하였습니다.");
		}
		
		return uqList;
	}
	
	public void addUserQna(UserQna uq) throws AddException{
		try {
			repository.save(uq);
		}catch(Exception e) {
			e.printStackTrace();
			throw new AddException(e.getMessage());
		}	
	}
}
