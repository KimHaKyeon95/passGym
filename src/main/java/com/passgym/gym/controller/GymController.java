package com.passgym.gym.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.pass.entity.Pass;
import com.passgym.service.GymService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("gym/*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymController {
	@Autowired
	private GymService service;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	ObjectMapper objectMapper;
	
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
	public void saveGym(@RequestParam("files") List<MultipartFile> files,
						@RequestParam("gymInfo") String gymInfo,
						@RequestParam("passes") String passes) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		try{
			Map<String, String> gym = mapper.readValue(gymInfo,
					new TypeReference<Map<String, String>>(){});
			logger.info(""+gym.get("phoneNo"));

			for(MultipartFile file : files) {
				String imgName = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
				String originFileName = file.getOriginalFilename();
				String fileExtension = originFileName.substring(originFileName.lastIndexOf(".") + 1);
				File imgDirectory = new File("C:/passGymImg/" + gym.get("ownerNo") , imgName + "." + fileExtension);
				if (!imgDirectory.exists()) {
					imgDirectory.mkdir();
				}
				file.transferTo(imgDirectory);
			}

			List<Map<String,Object>> mapPasses = mapper.readValue(passes,
					new TypeReference<List<Map<String, Object>>>(){});
			for (Map<String, Object> pass : mapPasses) {
				logger.info(pass.get("passNo") + " : " + pass.get("passName"));
			}
		}catch(IOException e){
			e.printStackTrace();
		}catch (Exception e){
			e.printStackTrace();
		}
	}
}
