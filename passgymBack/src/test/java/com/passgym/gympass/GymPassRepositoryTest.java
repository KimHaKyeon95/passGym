package com.passgym.gympass;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import java.util.List;
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
import com.passgym.pass.entity.PassPK;
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
	
	@Test
	@Transactional
	void findByUser_userNoTest() {
		int userNo = 1;
		List<GymPass> gpList = repository.findByUser_userNo(userNo);
		assertTrue(gpList.size() > 0);
		for(GymPass gp : gpList) {
			
		}
	}
	
	
	@Test
	@Transactional
	void findByUserTest() {
		int userNo = 1;
		User user = new User();
		user.setUserNo(userNo);
		List<GymPass> gpList = repository.findByUser(user);
		assertTrue(gpList.size() > 0);
		for(GymPass gp : gpList) {
			
		}
	}
	
	@Test
	//@Transactional
	void testInsert() {
	GymPass gp = new GymPass();
	Pass pass = new Pass();
	String ownerNo = "1000000001"; //Gym_name이 '1헬스'
	int passNo = 1; //pass_name이 '1헬스_이용권1'
	PassPK passPK = new PassPK();
	passPK.setOwnerNo(ownerNo);
	passPK.setPassNo(passNo);
	pass.setPassPk(passPK);

	
	int userNo = 2; //user_id가 'useridb' 
	User user = new User();
	user.setUserNo(userNo);

	Payment payment = new Payment();
	String paymentNo = "결제번호1";
	payment.setPaymentNo(paymentNo);
	payment.setPaymentPrice(1000);
	payment.setPaymentType(1);
	payment.setBankName("은행1");
	payment.setGymPass(gp); //<----
	
	gp.setPaymentNo(paymentNo);
	gp.setPass(pass);
	gp.setUser(user);
	gp.setPayment(payment); //<----
	repository.save(gp);
	//--------------------

	gp = new GymPass();
	pass = new Pass();
	ownerNo = "1000000001"; //Gym_name이 '1헬스'
	passNo = 1; //pass_name이 '1헬스_이용권1'
	passPK = new PassPK(ownerNo, passNo);
	pass.setPassPk(passPK);
	paymentNo = "결제번호2";
	userNo = 3; //user_id가 'useridc' 
	user = new User();
	user.setUserNo(userNo);

	payment = new Payment();
	payment.setPaymentNo(paymentNo);
	payment.setPaymentPrice(2000);
	payment.setPaymentType(2);
	payment.setBankName("은행2");
	payment.setGymPass(gp);
	gp.setPaymentNo(paymentNo);
	gp.setPass(pass);
	gp.setUser(user);
	gp.setPayment(payment);
	repository.save(gp);
	
	//--------------------	

	gp = new GymPass();
	pass = new Pass();
	ownerNo = "1000000001"; //Gym_name이 '1헬스'
	passNo = 2; //pass_name이 '1헬스_이용권2'
	passPK = new PassPK(ownerNo, passNo);
	pass.setPassPk(passPK);
	paymentNo = "결제번호3";
	userNo = 3; //user_id가 'useridc' 
	user = new User();
	user.setUserNo(userNo);

	payment = new Payment();
	payment.setPaymentNo(paymentNo);
	payment.setPaymentPrice(3000);
	payment.setPaymentType(3);
	payment.setBankName("은행3");
	payment.setGymPass(gp);
	
	gp.setPaymentNo(paymentNo);
	gp.setPass(pass);
	gp.setUser(user);
	gp.setPayment(payment);
	repository.save(gp);
	
}
}
