package com.passgym.gym;


import com.passgym.dto.GymSortDto;
import com.passgym.gym.entity.Gym;
import com.passgym.gym.utility.GymDistanceCompare;
import com.passgym.gym.utility.GymUtility;
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
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.DisplayName;
import com.passgym.gym.entity.Gym;
import com.passgym.gympass.entity.GymPass;
import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.payment.entity.Payment;
import com.passgym.repository.OwnerRepository;
import com.passgym.repository.GymRepository;
import com.passgym.user.entity.User;

@SpringBootTest
public class GymRepositoryTests {

	@Autowired
	GymRepository gymRepository;
	
	@Autowired
	OwnerRepository ownerRepository;

	@Autowired
	GymService service;


	@Autowired
	GymUtility utility;


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
//	@Transactional
	@DisplayName("gym정보 insertTest")
	void testInsert() {
		String name = "1헬스"; //헬스장이름
		String phoneNo = "1전화번호"; //헬스장전화번호
		String zipcode="1zipcode"; //우편번호
		String addr="1주소"; //주소
		String addrDetail="1상세주소"; //상세주소
		String introduce="1헬스장 소개"; //헬스장 소개
		String notice="1공지사항"; //공지사항
		String operatingTime="1운영시간"; //운영시간
		String operatingProgram="1운영프로그램"; // 운영프로그램
		String extraService="1부가서비스"; //부가서비스
		String etc="1etc"; //기타
		int totalStar=1; //총별점
		int totalMember=1; //총인원수
		double lat=1; //위도 latitude 
		double lon=1; //경도 longitude
//		double distance=1;//거리

		String ownerNo = "1000000001";
		Gym g = new Gym(
				ownerNo 
				,name, phoneNo, zipcode, addr, addrDetail, introduce, notice,operatingTime, operatingProgram, extraService
				,etc//기타
				,totalStar //총별점
				,totalMember //총인원수
				,lat //위도 latitude 
				,lon //경도 longitude
//				,distance//거리
				, null //Owner
				,null //List<Pass>
				);


		gymRepository.save(g);
	}
	
	@DisplayName("Gym의 owner정보 확인")
	@Test
	@Transactional
	void testFindById1() {
		String ownerNo = "1000000001";
		Optional<Gym> optGym = gymRepository.findById(ownerNo);
		assertTrue(optGym.isPresent());
		Gym g = optGym.get();
		String expectedName = "1헬스";
		assertEquals(expectedName, g.getName());
		//Gym의 owner정보 확인
		/*@OneToOne
		  @JoinColumn(name = "owner_no")
		  private Owner owner;
		 */
		String expectedId = "ownerid9";
		String expectedPwd = "ownerp9";
		assertEquals(expectedId, g.getOwner().getId());
		assertEquals(expectedPwd, g.getOwner().getPwd());
	}

	@DisplayName("Gym의 pass정보 확인")
	@Test
	@Transactional
	void testFindById2() {
		String ownerNo = "1000000001";
		Optional<Gym> optGym = gymRepository.findById(ownerNo);
		assertTrue(optGym.isPresent());
		Gym g = optGym.get();
		//Gym의 pass정보 확인
		List<Pass> passes = g.getPasses();
		int expectedSize = 3;
		assertTrue(expectedSize==passes.size());
		passes.forEach(pass->{logger.info(pass.getPassName());});

	}
	
 
	 
	
	@Test
	@Transactional
	void testFindTotal() {
		//판매자 아이디와 비번으로 로그인 성공시 사업자번호조회 & 회원권별 구매한 회원검색
		String ownerId = "ownerid1";
		String ownerPwd = "ownerp1";
		Owner o = ownerRepository.findByIdAndPwd(ownerId, ownerPwd);
		
		logger.info("ownerId =" + o.getId());
		logger.info("ownerPwd =" + o.getPwd());
		logger.info("ownerNo =" + o.getOwnerNo());
		Gym g = o.getGym();
		List<Pass>passes =  g.getPasses();		
		passes.forEach(p->{
			logger.info("---이용권 이름:"+ p.getPassName() +"---");
			 
			List<GymPass> gymPasses = p.getGympasses();
			gymPasses.forEach(gp->{
				User u = gp.getUser();
				String userId = u.getId();
				String userName = u.getName();
				Payment payment = gp.getPayment();
				logger.info("----구매한 회원ID:" + userId + ", 회원명:" + userName +", paymentPrice:" + payment.getPaymentPrice());
			
			});
		});
		
		
		
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
												gym.getTotalStar(), gym.getTotalMember(), 0, 0, null);
			gymDtoList.add(gymDto);
		}
		gymDtoList.sort(new GymDistanceCompare());
		for(GymSortDto gym : gymDtoList){
			System.out.println(gym.getOwnerNo() + " : "
								 + gym.getAddr() + " : " + gym.getDistance());
		}
	}

	@Test
	void imgToBase64StringTest(){
		try{
			String gymImgEncode = utility.imgToByteString("1000000001");
			System.out.println(gymImgEncode);
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@Test
	void imgDeleteTest(){
		String detailFilePath = "C:/passGymImg/test/test.txt";
		File testFile = new File("C:/passGymImg/test", "test.text");
		if (!testFile.exists()) {
			testFile.mkdirs();
		} else{
			testFile.delete();
		}
	}
}
