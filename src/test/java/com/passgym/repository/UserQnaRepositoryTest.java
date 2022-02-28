package com.passgym.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import com.passgym.userqna.entity.UserQna;

@SpringBootTest
class UserQnaRepositoryTest {
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private UserQnaRepository repository;

	@Test
	@Transactional
	@Commit
	void saveTest() {
		UserQna uq = new UserQna();
		uq.setTitle("테스트 제목");
		uq.setContent("테스트 내용");
		uq.setUserNo(1);
		uq.setReplyStatus(0);
		uq.setQnaDate(new Date());
		repository.save(uq);
	}
	
	@Test
	@Transactional
	@Commit
	void findByUserNoTest() {
		int userNo = 1;
		List<UserQna> uqList = repository.findByUserNo(userNo);
		assertTrue(uqList.size() > 0);
		for(UserQna uq: uqList) {
			logger.info(uq.getQnaNo() + " : " + uq.getTitle() + " : " + uq.getContent());
		}
	}
	
	@Test
	@Transactional
	@Commit
	void replyTest() {
		int qnaNo = 5;
		UserQna uq = repository.findById(qnaNo).get();
		uq.setReply("답변내용");
		repository.save(uq);
	}

}
