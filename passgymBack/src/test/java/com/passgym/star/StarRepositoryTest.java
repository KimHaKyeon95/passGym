package com.passgym.star;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import com.passgym.repository.StarRepository;
import com.passgym.star.entity.Star;

@SpringBootTest
class StarRepositoryTest {
	Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	StarRepository repository;
	
	@Test
	@Transactional
	@Commit
	void saveTest() {
		Star star = new Star();
		star.setPaymentNo("433212232");
		star.setStar(5);
		repository.save(star);
	}
}
