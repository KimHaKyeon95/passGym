package com.passgym.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.FindException;
import com.passgym.exception.ModifyException;
import com.passgym.exception.RemoveException;
import com.passgym.repository.UserRepository;
import com.passgym.user.entity.User;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public User findById(int userNo) throws FindException{
		User user;
		try {
			user = userRepository.findById(userNo).get();
		}catch(Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}
		return user;
	}
	
	public void modifyUser(User user) throws ModifyException{
		try {
			userRepository.save(user);
		}catch(Exception e) {
			e.printStackTrace();
			throw new ModifyException(e.getMessage());
		}
	}
	
	public void withdrawalUser(User user) throws RemoveException{
		try {
			userRepository.save(user);
		}catch(Exception e) {
			e.printStackTrace();
			throw new RemoveException(e.getMessage());
		}
	}
}
