package com.passgym.repository;

import org.springframework.data.repository.CrudRepository;

import com.passgym.star.entity.Star;

public interface StarRepository extends CrudRepository<Star, String> {

}
