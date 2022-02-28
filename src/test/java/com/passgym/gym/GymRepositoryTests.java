package com.passgym.gym;

import com.passgym.dto.GymSortDto;
import com.passgym.gym.entity.Gym;
import com.passgym.gym.utility.GymCompare;
import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.repository.GymRepository;
import com.passgym.repository.OwnerRepository;
import com.passgym.service.GymService;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import javax.transaction.Transactional;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertTrue;
@SpringBootTest
public class GymRepositoryTests {

	@Autowired
	GymRepository gymRepository;

	@Autowired
	OwnerRepository ownerRepository;

	@Autowired
	GymService service;

	Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	@Transactional
	@Commit
	void test() {
		String ownerNo = "1111111111";
		int passNo = 5;

		Optional<Gym> optGym = gymRepository.findById(ownerNo);
		assertTrue(optGym.isPresent());
		Gym g = optGym.get();
		//Gym의 pass정보 확인
		List<Pass> passes = g.getPasses();

		Pass pass = new Pass();
		PassPK passPK = new PassPK();

		passPK.setOwnerNo(ownerNo);
		passPK.setPassNo(passNo);
		pass.setPassPk(passPK);

		pass.setPassName("test1");
		pass.setPassPrice(12345);
		pass.setPassDate(new Date());
		pass.setPassStatus(1);
		pass.setPassMonth(1);
		pass.setPauseCount(2);
		pass.setPauseDate(30);
		pass.setRemarks("test");

		passes.add(pass);
		g.setPasses(passes);
		gymRepository.save(g);
	}

	@Test
	@Transactional
	@Commit
	void gymDetailTest() {
		String ownerNo = "1";
		Optional<Gym> optGym = gymRepository.findById(ownerNo);
		assertTrue(optGym.isPresent());
		Gym gym = optGym.get();
		logger.info(gym.getName());
		for (Pass p : gym.getPasses()) {
			logger.info(p.getPassName());
		}
	}

	@Test
	@Transactional
	void gymSaveTest() {

		Owner owner = new Owner();
		owner.setOwnerNo("testOwnerNo");
		owner.setId("testId");
		owner.setPwd("testPwd");
		owner.setOwnerStatus(1);


		Gym gym = new Gym();
		gym.setOwnerNo(owner.getOwnerNo());
		gym.setName("testName");
		gym.setPhoneNo("testPhoneNo");
		gym.setZipcode("testZipcode");
		gym.setAddr("testAddr");
		gym.setAddrDetail("testAddrDetail");
		gym.setIntroduce("testIntroduce");
		gym.setNotice("testNotice");
		gym.setOperatingTime("testTime");
		gym.setOperatingProgram("testProgram");
		gym.setExtraService("testService");
		gym.setEtc("tesEtc");
		gym.setLat(0.0);
		gym.setLon(0.0);

		gym.setOwner(owner);

		List<Pass> passes = new ArrayList<>();
		Pass pass0 = new Pass();
		PassPK passPK0 = new PassPK();
		Pass pass1 = new Pass();
		PassPK passPK1 = new PassPK();

		passPK0.setOwnerNo(gym.getOwnerNo());
		passPK0.setPassNo(0);

		pass0.setPassPk(passPK0);
		pass0.setPassName("testName0");
		pass0.setPassPrice(1000);
		pass0.setPassDate(new Date());
		pass0.setPassStatus(1);
		pass0.setPassMonth(1);
		pass0.setPauseCount(1);
		pass0.setRemarks("test0");

		passPK1.setOwnerNo(gym.getOwnerNo());
		passPK1.setPassNo(1);

		pass1.setPassPk(passPK1);
		pass1.setPassName("testName1");
		pass1.setPassPrice(2000);
		pass1.setPassDate(new Date());
		pass1.setPassStatus(2);
		pass1.setPassMonth(2);
		pass1.setPauseCount(2);
		pass1.setRemarks("test1");

		passes.add(pass0);
		passes.add(pass1);

		gym.setPasses(passes);

		ownerRepository.save(owner);
		gymRepository.save(gym);

	}

	@Test
	void getGymDistance() {
		double userLat = 37.3652694;
		double userLon = 126.7366344;

		List<Gym> gymList = gymRepository.findAll();
		for (Gym gym : gymList) {
			double gymLat = gym.getLat();
			double gymLon = gym.getLon();
			double distance = service.gymDistance(userLat, userLon, gymLat, gymLon, "kilometer");
			System.out.println("Distance from " + gym.getOwnerNo() + " = " + distance);
		}
	}

	@Test
	@Transactional
	void gymFindAndSortTest() {
		double userLat = 37.3652694;
		double userLon = 126.7366344;
		List<Gym> gymList = gymRepository.findAll();
		List<GymSortDto> gymDtoList = new ArrayList<>();
		for (Gym gym : gymList) {
			double gymLat = gym.getLat();
			double gymLon = gym.getLon();
			double distance = service.gymDistance(userLat, userLon, gymLat, gymLon, "kilometer");
			GymSortDto gymDto = new GymSortDto(gym.getOwnerNo(), gym.getName(),
												gym.getAddr(), distance,
												gym.getTotalStar(), gym.getTotalMember());
			gymDtoList.add(gymDto);
		}
		gymDtoList.sort(new GymCompare());
		for(GymSortDto gym : gymDtoList){
			System.out.println(gym.getOwnerNo() + " : "
								 + gym.getAddr() + " : " + gym.getDistance());
		}
	}
}
