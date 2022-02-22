package com.passgym.repository;

import org.springframework.data.repository.CrudRepository;

import com.passgym.gym.entity.Gym;

public interface GymRepository extends CrudRepository<Gym, String> {

}
