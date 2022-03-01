package com.passgym.gym.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.dto.GymSortDto;
import com.passgym.exception.FindException;
import com.passgym.gym.utility.GymCompare;
import com.passgym.gym.entity.Gym;
import com.passgym.gym.utility.GymUtility;
import com.passgym.pass.entity.Pass;
import com.passgym.repository.GymRepository;
import com.passgym.repository.OwnerRepository;
import com.passgym.service.GymService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("gym/*")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class GymController {
	@Autowired
	private GymService service;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	GymRepository gymRepository;

	@Autowired
	GymUtility utility;

	@Autowired
	OwnerRepository ownerRepository;

	@Autowired
	GymService gymService;
	
	@GetMapping("/{ownerNo}")
	public Object gymDetail(@PathVariable(name="ownerNo") String ownerNo) {
		try {
			Gym gym = service.findByOwnerNo(ownerNo);
			String name = gym.getName();
			String phoneNo = gym.getPhoneNo();
			String addr = gym.getAddr();
			String addrDetail = gym.getAddrDetail();
			double avgStar = (double)gym.getTotalStar() / gym.getTotalMember();
			String introduce = gym.getIntroduce();
			String notice = gym.getNotice();
			String operatingTime = gym.getOperatingTime();
			String operatingProgram = gym.getOperatingProgram();
			String extraService = gym.getExtraService();
			String etc = gym.getEtc();
			
			Map<String, Object> map = new HashMap<>();
			map.put("name", name);
			map.put("phoneNo", phoneNo);
			map.put("avgStar", avgStar);
			map.put("introduce", introduce);
			map.put("notice", notice);
			map.put("operatingTime", operatingTime);
			map.put("operatingProgram", operatingProgram);
			map.put("extraService", extraService);
			map.put("etc", etc);
			
			List<Map> passes = new ArrayList<>();
			for(Pass p: gym.getPasses()) {
				Map<String, Object> pass = new HashMap<>();
				int passNo = p.getPassPk().getPassNo();
				String passName = p.getPassName();
				int passPrice = p.getPassPrice();
				int passMonth = p.getPassMonth();
				pass.put("passNo", passNo);
				pass.put("passName", passName);
				pass.put("passPrice", passPrice);
				pass.put("passMonth", passMonth);
				passes.add(pass);
			}
			map.put("passes", passes);
			
			String result = objectMapper.writeValueAsString(map);
			return result;
		}catch(FindException e) {
			Map<String, Object> returnMap = new HashMap<>();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
			return returnMap;
		}catch (JsonProcessingException e) {
			e.printStackTrace();
			Map<String, Object> returnMap = new HashMap<>();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
			return returnMap;
		}
	}

	@PostMapping(value = "/gymregist", consumes = "multipart/form-data")
	public String saveGym(@RequestParam("files") List<MultipartFile> files,
						@RequestParam("detailFiles") List<MultipartFile> detailFiles,
						@RequestParam("gymInfo") String gymInfo,
						@RequestParam("passes") String passes) {
		try{
			String ownerNo = gymService.gymSetting(gymInfo, passes);
			utility.gymImgSave(files, detailFiles, ownerNo);
		}catch(Exception e){
			e.printStackTrace();
			return "error";
		}
		return "ok";
	}

	@GetMapping("/sort-gym-distance")
	@ResponseBody
	public List<GymSortDto> gymInquire(@RequestParam String lat, @RequestParam String lon){
		double userLat = Double.parseDouble(lat);
		double userLon = Double.parseDouble(lon);
		List<Gym> gymList = gymRepository.findAll();
		List<GymSortDto> gymDtoList = new ArrayList<>();

		for (Gym gym : gymList) {
			double gymLat = gym.getLat();
			double gymLon = gym.getLon();
			double distance = service.gymDistance(userLat, userLon, gymLat, gymLon, "kilometer");
			if(distance <= 1.0){
				GymSortDto gymDto = new GymSortDto(gym.getOwnerNo(), gym.getName(),
						gym.getAddr(), distance,
						gym.getTotalStar(), gym.getTotalMember());
				gymDtoList.add(gymDto);
			}
		}
		gymDtoList.sort(new GymCompare());
//		Arrays.sort(gymDtoList, (e1, e2) -> {
//			return e1.getDistance() - e2.getDistance();
//		})
		
		return gymDtoList;
	}
}
