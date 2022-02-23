package com.passgym.repository;

import org.springframework.data.repository.CrudRepository;

import com.passgym.gympass.entity.GymPass;

public interface GymPassRepository extends CrudRepository<GymPass, String> {

}
