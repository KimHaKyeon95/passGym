package com.passgym.payment;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
import org.springframework.test.annotation.Commit;

import com.passgym.gym.entity.Gym;
import com.passgym.gympass.entity.GymPass;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.payment.entity.Payment;
import com.passgym.repository.PaymentRepository;
import com.passgym.user.entity.User;

@SpringBootTest
class PaymentRepositoryTest {
	Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	EntityManager entityManager;
	
	@Autowired
	PaymentRepository repository;
	
	@Test
	@Transactional
	@Commit
	void testSave() {
		Payment pay = new Payment();
		pay.setPaymentNo("123212");
		pay.setPaymentPrice(15000);
		pay.setPaymentType(1);
		pay.setBankName("하나은행");
		pay.setPaymentDate(new Date());
		repository.save(pay);
	}
//	@Autowired
//	UserRepository userRepository;
//	@Autowired
//	PassRepository Repository;
	
	//결제에서 바로 gympass를 저장하고 싶은데 어떻게 해야 하나요
	@Test
	@Transactional
	@Commit
	void testGympassSave() {
		//결제 정보 생성
		Payment pay = new Payment();
		pay.setPaymentNo("533212232");
		pay.setPaymentPrice(15000);
		pay.setPaymentType(1);
		pay.setBankName("농협은행");
		pay.setPaymentDate(new Date());
		//결제 관련 이용권 정보 생성
		GymPass gp = new GymPass();
		gp.setPayment(pay);//결제정보와 연결
//		gp.setOwnerNo(1);
//		gp.setPassNo(1);
		//이용권 정보 생성
		Pass pass = new Pass();
		PassPK passPK = new PassPK();
		
		passPK.setOwnerNo("2222222222");
		passPK.setPassNo(1);
		pass.setPassPk(passPK);
		gp.setPass(pass);
		
//		Gym gym = new Gym();
//		gym.setOwnerNo("2");
//		pass.setGym(gym);
		
		
		User u = new User();
		u.setUserNo(5);
		gp.setUser(u);
		
		
//		int userId = 2;
//		Optional<User> optU = userRepository.findById(userId);
//		assertTrue(optU.isPresent());
//		User u = optU.get();
//		gp.setUser(u);
		
		gp.setStartDate(new Date());
		gp.setEndDate(new Date());
		gp.setPauseCount(2);
		gp.setPauseDate(2);
		gp.setStatus(2);
		pay.setGymPass(gp);
		repository.save(pay);
	}

	@Test
	@Transactional
	void testFindByID() {
		String paymentNo = "1";
		Optional<Payment> optp1 = repository.findById(paymentNo);
		assertTrue(optp1.isPresent());
		Payment payment = optp1.get();
		logger.info(payment.getGymPass().getUser().getName());
		assertEquals("tname2", payment.getGymPass().getUser().getName());
	}
	
	//User 정보까지 조회 하고 싶으면 다른 장치를 해야 하나요?
	//Payment 테이블에 설정이 필요한가?
	@Test
	//lazyLoading으로 불러올 때 필요
	@Transactional
	void testFindAll() {
		Iterable<Payment> listPayment = repository.findAll();
		for(Payment p: listPayment) {
//			logger.info(p.toString());
//			logger.info("" + p.getGymPass().getPauseCount());
			logger.info("유저 이름:" + p.getGymPass().getUser().getName());
		}
		//assertEquals(5, ((List)listPayment).size());
	}
	
}
