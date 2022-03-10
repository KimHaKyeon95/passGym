package com.passgym.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.passgym.ownerqna.entity.OwnerQna;

public interface OwnerQnaRepository extends CrudRepository<OwnerQna, Integer> {
	List<OwnerQna> findByOwnerNo(String ownerNo);
}
