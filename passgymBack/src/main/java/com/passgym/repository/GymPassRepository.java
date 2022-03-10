package com.passgym.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.passgym.gympass.entity.GymPass;
import com.passgym.user.entity.User;

public interface GymPassRepository extends CrudRepository<GymPass, String> {
	List<GymPass> findByUser(User user);
	
	List<GymPass> findByUser_userNo(int userNo);
}
