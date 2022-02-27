package com.passgym.pass;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.passgym.gym.entity.Gym;
import com.passgym.owner.repository.OwnerRepository;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.pass.repository.PassRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
@SpringBootTest
public class PassRepositoryTest {
	@Autowired
	OwnerRepository ownerRepository;
	@Autowired
	PassRepository passRepository;
	
	Logger logger = LoggerFactory.getLogger(getClass());


	@DisplayName("Pass test")
	@Test
	void testInsert() {
		String ownerNo = "1000000001";
		for(int i=1; i<=3; i++) {
			int passNo = i;
			PassPK passPK = new PassPK(ownerNo, passNo);
			
			String passName = "1헬스_이용권"+i;
			int passPrice=i;
			Date passDate = null; 
			//Timestamp passDate=new Timestamp(System.currentTimeMillis());
			int passStatus=i;
			int passMonth=i;
			int pauseCount=i;
			int pauseDate=i;
			String remarks="1헬스_remarks"+i;
			
			Pass pass = new Pass(
					passPK 
//					,0
					,passName, passPrice, passDate,passStatus,passMonth, pauseCount,pauseDate, remarks
					,null //gym
					,null //gympass
					);
//			pass.setOwnerNo(ownerNo);
			passRepository.save(pass);
		}
	}

	@DisplayName("Pass의 gym정보, owner정보 확인")
	@Test
	@Transactional
	void testFindById1() {
		String ownerNo = "1000000001";
		int passNo = 1;
		PassPK passPK = new PassPK(ownerNo, passNo);
		
		Optional<Pass> optPass = passRepository.findById(passPK);
		assertTrue(optPass.isPresent());
		Pass pass = optPass.get();
		String expectedPassName = "1헬스_이용권1";
		int expectedPassMonth= 1;
		int expectedPassPrice=1;
		int expectedPassStatus=1;
		int expectedPasspauseCount=1;
		int expectedPasspauseDate=1;
		String expectedPassremarks = "1헬스_remarks1";
		
		assertEquals(expectedPassName, pass.getPassName());
		assertEquals(expectedPassMonth, pass.getPassMonth());
		assertEquals(expectedPassPrice, pass.getPassPrice());
		assertEquals(expectedPassStatus, pass.getPassStatus());
		assertEquals(expectedPasspauseCount, pass.getPassStatus());
		assertEquals(expectedPasspauseDate, pass.getPassStatus());
		assertEquals(expectedPassremarks, pass.getRemarks());
		
		Gym g = pass.getGym();
		String expectedGymName = "1헬스";
		String expectedGymPhoneNo = "1전화번호"; //헬스장전화번호
		String expectedGymZipcode="1zipcode"; //우편번호
		String expectedGymAddr="1주소"; //주소
		String expectedGymAddrDetail="1상세주소"; //상세주소
		String expectedGymIntroduce="1헬스장 소개"; //헬스장 소개
		String expectedGymNotice="1공지사항"; //공지사항
		String expectedGymOperatingTime="1운영시간"; //운영시간
		String expectedGymOperatingProgram="1운영프로그램"; // 운영프로그램
		String expectedGymExtraService="1부가서비스"; //부가서비스
		String expectedGymEtc="1etc"; //기타
		int expectedGymTotalStar=1; //총별점
		int expectedGymTotalMember=1; //총인원수
		double expectedGymLat=1; //위도 latitude 
		double expectedGymLon=1; //경도 longitude
//		double expectedGymDistance=1;//거리
		
		assertEquals(expectedGymName, g.getName());
		assertEquals(expectedGymPhoneNo, g.getPhoneNo());
		assertEquals(expectedGymZipcode, g.getZipcode());
		assertEquals(expectedGymAddr, g.getAddr());
		assertEquals(expectedGymAddrDetail, g.getAddrDetail());
		assertEquals(expectedGymIntroduce, g.getIntroduce());
		assertEquals(expectedGymNotice, g.getNotice());
		assertEquals(expectedGymOperatingTime, g.getOperatingTime());
		assertEquals(expectedGymOperatingProgram, g.getOperatingProgram());
		assertEquals(expectedGymExtraService, g.getExtraService());
		assertEquals(expectedGymEtc, g.getEtc());
		assertEquals(expectedGymTotalStar, g.getTotalStar());
		assertEquals(expectedGymTotalMember, g.getTotalMember());
		assertEquals(expectedGymLat, g.getLat());
		assertEquals(expectedGymLon, g.getLon());
//		assertEquals(expectedGymDistance, g.getDistance());
		
		
		
		String expectedId = "ownerid9";
		assertEquals(expectedId, g.getOwner().getId());
		
	}

}