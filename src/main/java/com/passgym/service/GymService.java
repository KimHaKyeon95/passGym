package com.passgym.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.pass.entity.Pass;
import com.passgym.repository.GymRepository;
import com.passgym.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class GymService {
	@Autowired
	GymRepository gymRepository;

	@Autowired
	OwnerRepository ownerRepository;

	@Autowired
	ObjectMapper mapper;

	public Gym findByOwnerNo(String ownerNo) throws FindException {
		try {
			Optional<Gym> optGym = gymRepository.findById(ownerNo);
			if (!optGym.isPresent()) {
				throw new FindException("Gym 조회 실패");
			}
			return optGym.get();
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException("Gym 조회 실패");
		}
	}

	//Gym과 Pass에 관한 값들을 저장하고 해당 Gym의 ownerNo를 반환함
	public String gymSetting(String gymInfo, String passes) throws IOException {

		Map<String, String> gym = mapper.readValue(gymInfo, new TypeReference<Map<String, String>>() {
		});

		List<Map<String, String>> mapPasses = mapper.readValue(passes, new TypeReference<List<Map<String, String>>>() {
		});
		List<Pass> realPasses = new ArrayList<>();

		for (Map<String, String> pass : mapPasses) {
			PassPK passPK = new PassPK();
			passPK.setOwnerNo(gym.get("ownerNo"));
			passPK.setPassNo(Integer.parseInt(pass.get("passNo")));

			Pass realPass = new Pass();
			realPass.setPassPk(passPK);
			realPass.setPassName(pass.get("passName"));
			realPass.setPassPrice(Integer.parseInt(pass.get("passPrice")));
			realPass.setPassDate(new Date());
			realPass.setPassStatus(1);
			realPass.setPassMonth(Integer.parseInt(pass.get("passMonth")));
			realPass.setPauseCount(Integer.parseInt(pass.get("pauseCount")));
			realPass.setPauseDate(Integer.parseInt(pass.get("pauseDate")));
			realPass.setRemarks(pass.get("remarks"));

			realPasses.add(realPass);
		}

		Gym realGym = new Gym();
		realGym.setOwnerNo(gym.get("ownerNo"));
		realGym.setName(gym.get("name"));
		realGym.setPhoneNo(gym.get("phoneNo"));
		realGym.setZipcode(gym.get("zipcode"));
		realGym.setAddr(gym.get("addr"));
		realGym.setAddrDetail(gym.get("addrDetail"));
		realGym.setIntroduce(gym.get("introduce"));
		realGym.setNotice(gym.get("notice"));
		realGym.setOperatingTime(gym.get("operatingProgram"));

		String startHour = gym.get("startHour");
		String startMinute = gym.get("startMinute");
		String endHour = gym.get("endHour");
		String endMinute = gym.get("endMinute");

		String operatingTime = startHour + ":" + startMinute + " ~ " + endHour + ":" + endMinute;
		realGym.setOperatingTime(operatingTime);

		realGym.setExtraService(gym.get("extraService"));
		realGym.setEtc(gym.get("etc"));
		realGym.setLat(Double.parseDouble(gym.get("lat")));
		realGym.setLon(Double.parseDouble(gym.get("lon")));

		realGym.setPasses(realPasses);

		Optional<Owner> owner = ownerRepository.findById(gym.get("ownerNo"));
		realGym.setOwner(owner.get());

		gymRepository.save(realGym);

		return gym.get("ownerNo");
	}

	// This function converts decimal degrees to radians
	private double deg2rad(double deg) {
		return (deg * Math.PI / 180.0);
	}

	// This function converts radians to decimal degrees
	private double rad2deg(double rad) {
		return (rad * 180 / Math.PI);
	}

	@Transactional(readOnly = true)
	public List<Pass> gymUserSelect(Gym gym) {
		return gym.getPasses();
	}

	
	
	public void gymModifySetting(String gymInfo, String passes) throws IOException {

		Map<String, String> gym = mapper.readValue(gymInfo, new TypeReference<Map<String, String>>() {
		});

		List<Map<String, String>> mapPasses = mapper.readValue(passes, new TypeReference<List<Map<String, String>>>() {
		});
		List<Pass> realPasses = new ArrayList<>();
		for (Map<String, String> pass : mapPasses) {
			PassPK passPK = new PassPK();
			passPK.setOwnerNo(gym.get("ownerNo"));
			passPK.setPassNo(Integer.parseInt(pass.get("passNo")));

			Pass realPass = new Pass();
			realPass.setPassPk(passPK);
			realPass.setPassName(pass.get("passName"));
			realPass.setPassPrice(Integer.parseInt(pass.get("passPrice")));
			realPass.setPassDate(new Date());
			realPass.setPassStatus(1);
			realPass.setPassMonth(Integer.parseInt(pass.get("passMonth")));
			realPass.setPauseCount(Integer.parseInt(pass.get("pauseCount")));
			realPass.setPauseDate(Integer.parseInt(pass.get("pauseDate")));
			realPass.setRemarks(pass.get("remarks"));

			realPasses.add(realPass);
		}
		Gym realGym = new Gym();
			realGym.setOwnerNo(gym.get("ownerNo"));
			realGym.setName(gym.get("name"));
			realGym.setPhoneNo(gym.get("phoneNo"));
			realGym.setZipcode(gym.get("zipcode"));
			realGym.setAddr(gym.get("addr"));
			realGym.setAddrDetail(gym.get("addrDetail"));
			realGym.setIntroduce(gym.get("introduce"));
			realGym.setNotice(gym.get("notice"));
			realGym.setOperatingTime(gym.get("operatingProgram"));
			realGym.setExtraService(gym.get("extraService"));
			realGym.setEtc(gym.get("etc"));
	
			realGym.setPasses(realPasses);

		Optional<Owner> owner = ownerRepository.findById(gym.get("ownerNo"));
			realGym.setOwner(owner.get());

		gymRepository.save(realGym);
	}
	
	@Transactional
	public String Delete(String ownerNo) {
		ownerRepository.deleteById(ownerNo);
		 return "ok";
	}

	public double gymDistance(double userLat, double userLon,
							  double gymLat, double gymLon, String unit){

		double theta = userLon - gymLon;
		double dist = Math.sin(deg2rad(userLat)) * Math.sin(deg2rad(gymLat))
						+ Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(gymLat))
						* Math.cos(deg2rad(theta));

		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515;

		if (unit.equals("kilometer")) {
			dist = dist * 1.609344;
		} else if(unit.equals("meter")){
			dist = dist * 1609.344;
		}

		return (dist);
	}
}
