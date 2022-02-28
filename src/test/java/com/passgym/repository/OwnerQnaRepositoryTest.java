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

import com.passgym.ownerqna.entity.OwnerQna;

@SpringBootTest
class OwnerQnaRepositoryTest {
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private OwnerQnaRepository repository;

	@Test
	@Transactional
	@Commit
	void saveTest() {
		OwnerQna oq = new OwnerQna();
		oq.setTitle("테스트 제목");
		oq.setContent("테스트 내용");
		oq.setOwnerNo("1111111111");
		oq.setReplyStatus(0);
		oq.setQnaDate(new Date());
		repository.save(oq);
	}
	
	@Test
	@Transactional
	@Commit
	void findAllTest() {
		List<OwnerQna> oqList = (List<OwnerQna>) repository.findAll();
		//assertTrue(oqList.size() > 0);
		for(OwnerQna oq: oqList) {
			logger.info(oq.getQnaNo() + " : " + oq.getTitle() + " : " + oq.getContent());
		}
	}
	
	@Test
	@Transactional
	@Commit
	void findByOwnerNoTest() {
		String ownerNo = "1111111111";
		List<OwnerQna> oqList = repository.findByOwnerNoIs(ownerNo);
		//assertTrue(oqList.size() > 0);
		for(OwnerQna oq: oqList) {
			logger.info(oq.getQnaNo() + " : " + oq.getTitle() + " : " + oq.getContent());
		}
	}
	
	@Test
	@Transactional
	@Commit
	void replyTest() {
		int qnaNo = 4;
		OwnerQna oq = repository.findById(qnaNo).get();
		oq.setReply("답변내용");
		repository.save(oq);
	}

	@Test
	@Transactional
	@Commit
	void findByIDTest() {
		int qnaNo = 4;
		OwnerQna oq = repository.findById(qnaNo).get();
		logger.info(oq.getContent() +  oq.getOwnerNo());
	}
}
