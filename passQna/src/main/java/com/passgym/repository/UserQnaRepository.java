package com.passgym.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.passgym.userqna.entity.UserQna;

public interface UserQnaRepository extends CrudRepository<UserQna, Integer> {
	List<UserQna> findByUserNo(int userNo);
}
