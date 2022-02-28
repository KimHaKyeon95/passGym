package com.passgym.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.passgym.user.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	User findById(String id);
	

	
	List <User> findByName(String name);
	
	List <User> findByNameAndPhoneNo(String name, String phoneNo);
}
