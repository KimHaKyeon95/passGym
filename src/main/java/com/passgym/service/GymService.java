package com.passgym.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.repository.GymRepository;

@Service
public class GymService {
	@Autowired
	private GymRepository gymRepository;
	
	public Gym findByOwnerNo(String ownerNo) throws FindException{
		try {
			Optional<Gym> optGym = gymRepository.findById(ownerNo);
			if(!optGym.isPresent()) {
				throw new FindException("Gym 조회 실패");
			}
			return optGym.get();
		}catch(FindException e) {
			e.printStackTrace();
			throw new FindException("Gym 조회 실패");
		}
	}
}
