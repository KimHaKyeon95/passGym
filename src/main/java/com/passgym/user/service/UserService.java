package com.passgym.user.service;



import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.AddException;
import com.passgym.exception.FindException;
import com.passgym.exception.ModifyException;
import com.passgym.exception.RemoveException;
import com.passgym.repository.UserRepository;
import com.passgym.user.entity.User;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 아이디에 해당하는 사용자가 존재하면 
	 * "이미 사용중인 아이디입니다" 메시지를 갖는 FindException이 발생한다. 
	 * @param id
	 * @throws FindException
	 */
	public void iddupchk(String id) throws FindException {
		//		 logger.info(""+userRepository.findById(id).getUserNo());
		if(userRepository.findById(id) == null) {
			throw new FindException("사용가능한 아이디");
		}
	}

	/**
	 * 사용자가 회원가입한다.
	 * @param user
	 * @throws AddException
	 */
	public void signup(User user) throws AddException {
		userRepository.save(user);
	}

	/**
	 * 아이디와 비밀번호가 일치하는 사용자가 존재하면 고객객체를 반환한다.
	 * 					   사용자가 존재하지 않으면 FindException이 발생한다.
	 * @param id
	 * @param pwd
	 * @return
	 * @throws FindException
	 */
	public User login(String id, String pwd) throws FindException {
		try {
			User user = userRepository.findById(id);
			if(user.getPwd().equals(pwd)) {
				return user;
			} else {
				throw new FindException("로그인 실패");
			}
		} catch(FindException e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}
	}


	/**
	 * 이름과 휴대전화번호로 등록된 사용자가 존재하면 아이디를 반환한다.
	 * 							   존재하지 않으면 FindException이 발생한다.
	 * @param name
	 * @param phoneNo
	 * @return
	 * @throws FindException
	 */
	public String searchid(String name, String phoneNo) throws FindException {
		try {
			List<User> user = userRepository.findByName(name);
			for(User u: user) {
				if(u.getPhoneNo().equals(phoneNo)) {
					return u.getId();
				}
			}
			throw new FindException("아이디 찾기 실패");
		} catch(FindException e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}
	}

	/**
	 * 아이디와 휴대전화번호로 등록된 사용자가 존재하면 비밀번호를 반환한다.
	 * 							   존재하지 않으면 FindException이 발생한다.
	 * @param id
	 * @param phoneNo
	 * @return
	 * @throws FindException
	 */
	public String searchpwd(String id, String phoneNo) throws FindException {
		try {
			User user = userRepository.findById(id);


			if(user.getPhoneNo().equals(phoneNo)) {
				return user.getPwd();

			}

			throw new FindException("비밀번호 찾기 실패");
		} catch(FindException e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}
	}
	
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
