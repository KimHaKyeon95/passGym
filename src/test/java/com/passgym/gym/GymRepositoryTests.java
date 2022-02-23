package com.passgym.gym;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import com.passgym.gym.entity.Gym;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.payment.entity.Payment;
import com.passgym.repository.GymRepository;
@SpringBootTest
public class GymRepositoryTests {
	
	@Autowired
	GymRepository gymRepository;
	
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
		for(Pass p: gym.getPasses()) {
			logger.info(p.getPassName());
		}
	}
}
