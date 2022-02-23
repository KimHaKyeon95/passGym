package com.passgym.gympass;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.passgym.gym.entity.Gym;
import com.passgym.gympass.entity.GymPass;
import com.passgym.pass.entity.Pass;
import com.passgym.payment.entity.Payment;
import com.passgym.repository.GymPassRepository;
import com.passgym.star.entity.Star;
import com.passgym.user.entity.User;



@SpringBootTest
class GymPassRepositoryTest {
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private GymPassRepository repository;
	
	@Test
	void testSave() {
		GymPass gp = new GymPass();
		Payment payment = new Payment();
		payment.setPaymentNo("123212");
		payment.setPaymentPrice(15000);
		payment.setPaymentType(1);
		payment.setBankName("하나은행");
		payment.setPaymentDate(new Date());
		gp.setPayment(payment);
		gp.setPaymentNo("123212");
//		gp.setOwnerNo(1);
//		gp.setPassNo(1);
		User u = new User();
		u.setUserNo(10);
		gp.setUser(u);
		Pass pass = new Pass();
		Gym gym = new Gym();
		gym.setOwnerNo("2");
		pass.setGym(gym);
		gp.setStartDate(new Date());
		gp.setEndDate(new Date());
		gp.setPauseCount(1);
		gp.setPauseDate(1);
		gp.setStatus(1);
		repository.save(gp);
	}

	@Test
	@Transactional
	void testFindByID() {
		String paymentNo = "433212232";
		Optional<GymPass> optp1 = repository.findById(paymentNo);
		assertTrue(optp1.isPresent());
		GymPass gymPass = optp1.get();
		logger.info("사용자이름" + gymPass.getUser().getName());
		logger.info("이용권이름" + gymPass.getPass().getPassName());
		logger.info("헬스장이름" + gymPass.getPass().getGym().getName());
		//mapping  할 때 처리
		logger.info("별점" + gymPass.getStar());
		if(gymPass.getStar() == null) {
			gymPass.setStar(new Star());
		}
		logger.info("별점" + gymPass.getStar().getStar());
		//assertEquals("tname2", gymPass.getUser().getName());
	}
	
}
