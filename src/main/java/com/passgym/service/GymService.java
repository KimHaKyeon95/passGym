package com.passgym.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.dto.GymSortDto;
import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.gym.utility.GymUtility;
import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.repository.GymRepository;
import com.passgym.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	@Autowired
	GymUtility utility;
	
	public Gym findByOwnerNo(String ownerNo) throws FindException{
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
		realGym.setOperatingProgram(gym.get("operatingProgram"));

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
		owner.get().setOwnerStatus(0);
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
		System.out.println("test=======" + gym);
		return gym.getPasses();
	}

	public String gymModifySetting(String gymInfo) throws IOException{//, String passes) throws IOException {
		
		Map<String, Object> gym = mapper.readValue(gymInfo, new TypeReference<Map<String, Object>>() {
		});
		List<Map<String, Object>> mapPasses = (List)gym.get("passes");
				//mapper.readValue(passes, new TypeReference<List<Map<String, String>>>() {
		//});
		List<Pass> realPasses = new ArrayList<>();
		for (Map<String, Object> pass : mapPasses) {
			PassPK passPK = new PassPK();
			passPK.setOwnerNo((String)gym.get("ownerNo"));
			passPK.setPassNo((Integer)pass.get("passNo"));

			Pass realPass = new Pass();
			realPass.setPassPk(passPK);
			realPass.setPassName((String)pass.get("passName"));
			realPass.setPassPrice((Integer)pass.get("passPrice"));
			realPass.setPassDate(new Date());
			realPass.setPassStatus(1);
			realPass.setPassMonth((Integer)pass.get("passMonth"));
			realPass.setPauseCount((Integer)pass.get("pauseCount"));
			realPass.setPauseDate((Integer)pass.get("pauseDate"));
			realPass.setRemarks((String)pass.get("remarks"));

			realPasses.add(realPass);
		}
		Gym realGym = new Gym();
			realGym.setOwnerNo((String)gym.get("ownerNo"));
			realGym.setName((String)gym.get("name"));
			realGym.setPhoneNo((String)gym.get("phoneNo"));
			realGym.setZipcode((String)gym.get("zipcode"));
			realGym.setAddr((String)gym.get("addr"));
			realGym.setAddrDetail((String)gym.get("addrDetail"));
			realGym.setIntroduce((String)gym.get("introduce"));
			realGym.setNotice((String)gym.get("notice"));
			realGym.setOperatingTime((String)gym.get("operatingProgram"));
			realGym.setExtraService((String)gym.get("extraService"));
			realGym.setEtc((String)gym.get("etc"));
			
			String startHour = (String)gym.get("startHour");
			String startMinute = (String)gym.get("startMinute");
			String endHour = (String)gym.get("endHour");
			String endMinute = (String)gym.get("endMinute");

			String operatingTime = startHour + ":" + startMinute + " ~ " + endHour + ":" + endMinute;
			realGym.setOperatingTime(operatingTime);

			realGym.setPasses(realPasses);

		Optional<Owner> owner = ownerRepository.findById((String)gym.get("ownerNo"));
			realGym.setOwner(owner.get());

		gymRepository.save(realGym);
		return (String)gym.get("ownerNo");
 
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

	public List<GymSortDto> defineGymDto(String lat, String lon){
		double userLat = Double.parseDouble(lat);
		double userLon = Double.parseDouble(lon);
		List<Gym> gymList = gymRepository.findAll();
		List<GymSortDto> gymDtoList = new ArrayList<>();

		try{
			for (Gym gym : gymList) {
				double gymLat = gym.getLat();
				double gymLon = gym.getLon();
				double gymStarScore = Math.pow(gym.getTotalStar(),7) / Math.pow(gym.getTotalMember(), 6);
				//TotalMember = 0 일 경우 감안
				double gymAvgStar = 0.0;
				if(gym.getTotalMember() != 0){
					gymAvgStar = (double)(gym.getTotalStar()/ gym.getTotalMember());;
				}
				double distance = gymDistance(userLat, userLon, gymLat, gymLon, "kilometer");
				String gymImgEncode =  utility.imgToByteString(gym.getOwnerNo());
				if(distance <= 400.0){
					GymSortDto gymDto = new GymSortDto(gym.getOwnerNo(), gym.getName(),
							gym.getAddr(), distance,
							gym.getTotalStar(), gym.getTotalMember(), gymAvgStar, gymStarScore, gymImgEncode);
					gymDtoList.add(gymDto);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return gymDtoList;
	}
}
