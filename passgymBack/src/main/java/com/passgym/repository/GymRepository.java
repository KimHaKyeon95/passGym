package com.passgym.repository;

import com.passgym.gym.entity.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRepository extends JpaRepository<Gym, String> {
}
