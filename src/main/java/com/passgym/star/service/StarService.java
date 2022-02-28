package com.passgym.star.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.AddException;
import com.passgym.repository.StarRepository;
import com.passgym.star.entity.Star;

@Service
public class StarService {
	@Autowired
	StarRepository repository;
	
	public void addStar(Star star) throws AddException{
		try {
			repository.save(star);
		}catch(Exception e) {
			e.printStackTrace();
			throw new AddException("별점추가에 실패하였습니다.");
		}
	}
}
