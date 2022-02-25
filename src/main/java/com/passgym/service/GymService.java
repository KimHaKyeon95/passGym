package com.passgym.service;

import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.repository.GymRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

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
		}catch(Exception e) {
			e.printStackTrace();
			throw new FindException("Gym 조회 실패");
		}
	}

	public Gym gymSetting(Map<String, String> gym){
		Gym realGymInfo = new Gym();
		realGymInfo.setOwnerNo(gym.get("ownerNo"));
		realGymInfo.setName(gym.get("name"));
		realGymInfo.setPhoneNo(gym.get("phoneNo"));
		realGymInfo.setZipcode(gym.get("zipcode"));
		realGymInfo.setAddr(gym.get("addr"));
		realGymInfo.setAddrDetail(gym.get("addrDetail"));
		realGymInfo.setIntroduce(gym.get("introduce"));
		realGymInfo.setNotice(gym.get("notice"));
		realGymInfo.setOperatingTime(gym.get("operatingProgram"));

		String startHour = gym.get("startHour");
		String startMinute = gym.get("startMinute");
		String endHour = gym.get("endHour");
		String endMinute = gym.get("endMinute");

		String operatingTime = startHour + ":" + startMinute
				+ " ~ " + endHour + ":" + endMinute;
		realGymInfo.setOperatingTime(operatingTime);

		realGymInfo.setExtraService(gym.get("extraService"));
		realGymInfo.setEtc(gym.get("etc"));

		return realGymInfo;
	}

}
