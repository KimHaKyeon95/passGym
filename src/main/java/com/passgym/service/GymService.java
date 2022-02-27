package com.passgym.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.repository.GymRepository;
import com.passgym.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

	public void gymSetting(List<MultipartFile> files, List<MultipartFile> detailFiles,
						  String gymInfo, String passes) throws IOException {

		Map<String, String> gym = mapper.readValue(gymInfo,
				new TypeReference<Map<String, String>>(){});

		List<Map<String,String>> mapPasses = mapper.readValue(passes,
				new TypeReference<List<Map<String, String>>>(){});
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

		for(MultipartFile file : files) {
			String imgName = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
			String originFileName = file.getOriginalFilename();
			String fileExtension = originFileName.substring(originFileName.lastIndexOf(".") + 1);
			File imgDirectory = new File("C:/passGymImg/" + gym.get("ownerNo") , imgName + "." + fileExtension);
			if (!imgDirectory.exists()) {
				imgDirectory.mkdirs();
			}
			file.transferTo(imgDirectory);
		}

		for(MultipartFile detailFile : detailFiles){
			String detailImgName =  (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
			String originDetailFileName = detailFile.getOriginalFilename();
			String detailFileExtension = originDetailFileName.substring(originDetailFileName.lastIndexOf(".") + 1);
			File detailImgDirectory = new File("C:/passGymImg/" + gym.get("ownerNo") + "/detailImg" , detailImgName + "." + detailFileExtension);
			if (!detailImgDirectory.exists()) {
				detailImgDirectory.mkdirs();
			}
			detailFile.transferTo(detailImgDirectory);
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

		String operatingTime = startHour + ":" + startMinute
				+ " ~ " + endHour + ":" + endMinute;
		realGym.setOperatingTime(operatingTime);

		realGym.setExtraService(gym.get("extraService"));
		realGym.setEtc(gym.get("etc"));
		realGym.setLat(Double.parseDouble(gym.get("lat")));
		realGym.setLon(Double.parseDouble(gym.get("lon")));

		realGym.setPasses(realPasses);

		Optional<Owner> owner = ownerRepository.findById(gym.get("ownerNo"));
		realGym.setOwner(owner.get());

		gymRepository.save(realGym);
	}

}
