package com.passgym.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.FindException;
import com.passgym.repository.UserRepository;
import com.passgym.user.entity.User;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public User findById(int userNo) throws FindException{
		return userRepository.findById(userNo).get();
	}
}
