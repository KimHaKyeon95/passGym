package com.passgym.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import com.passgym.repository.UserRepository;
import com.passgym.user.entity.User;
@SpringBootTest
class UserRepositoryTest {

	@Autowired
	UserRepository repository;

	Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	@Transactional
	@Commit
	void testSave() {
		User u1 = new User();
		u1.setId("test1@naver.com");
		u1.setPwd("tpwd1");
		u1.setName("tname1");
		u1.setPhoneNo("01011111111");
		u1.setZipcode("04540");
		u1.setAddr("서울 중구 남대문로 116-6");
		repository.save(u1);
		logger.info("------test1 saved-------");
	}

	@Test
	void testFindById() {
		logger.info("------userNo find -------");
		int userNo = 1;
		Optional <User> optU1 = repository.findById(userNo);
		assertTrue(optU1.isPresent());
		User u1= optU1.get();
		String expectedId = "id1@naver.com";
		assertEquals(expectedId, u1.getId());
		logger.info("------userNo found -------");

		logger.info("------id find -------");
		User u2 = repository.findById(expectedId);
		assertEquals( userNo,  u2.getUserNo());
//		int expectedSize = 1;
//		assertTrue(expectedSize == U2.size());
		
		logger.info("------id found -------");
	}
	
	@Test
	void testFindByName() {
		String name = "이름5";
		List <User> list = repository.findByName(name);
		int expectedSize = 1;
		assertTrue(expectedSize == list.size());
		assertEquals("0512300",list.get(0).getPhoneNo());
	}

	@Test
	void testFindByNameAndPhoneNo() { //오류
		String name = "이름5";
		String phoneNo = "0512300    ";
		List <User> list = repository.findByNameAndPhoneNo(name, phoneNo);
		logger.info(""+list.size());
		int expectedSize = 1;
		assertTrue(expectedSize == list.size());
	}
	
	@Test
	@Transactional
	@Commit
	void testUpdate() {
//		logger.info("------Update ByUserNo start------");
//		int userNo = 7;
//		Optional <User> optU3 = repository.findById(userNo);
//		assertTrue(optU3.isPresent());
//		User u3 = optU3.get();
//		assertEquals("testpwd2", u3.getPwd());
//		u3.setPwd("pwd1212");
//		repository.save(u3);
//		logger.info("------Update ByUserNo finish------");

		logger.info("------Update ById start------"); //오류
		String id = "id4@naver.com";
		User u4 = repository.findById(id);
//		int expectedSize = 1;
//		assertTrue(expectedSize == listU4.size());
//		User u4 = listU4.get(expectedSize);
	
		assertEquals("0512300    ", u4.getPhoneNo());
		u4.setPhoneNo("01012344444");
		repository.save(u4);
		logger.info("------Update ById finish------");

	}
	
	@Test
	@Transactional
	@Commit
	void testDelete() {
		int userNo = 12;
		repository.deleteById(userNo);
	}
}
