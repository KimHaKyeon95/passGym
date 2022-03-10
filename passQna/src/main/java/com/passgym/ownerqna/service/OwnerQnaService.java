package com.passgym.ownerqna.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.AddException;
import com.passgym.exception.FindException;
import com.passgym.ownerqna.entity.OwnerQna;
import com.passgym.repository.OwnerQnaRepository;
import com.passgym.userqna.entity.UserQna;

@Service
public class OwnerQnaService {
	@Autowired
	private OwnerQnaRepository repository;
	
	Logger logger = LoggerFactory.getLogger(getClass());
	
	public List<OwnerQna> findOwnerQna(String ownerNo) throws FindException{
		List<OwnerQna> oqList = null;
		try {
			oqList = repository.findByOwnerNo(ownerNo);
			if(oqList.size() <= 0) {
				throw new FindException("조회할 목록이 없습니다.");
			}
		}catch(FindException e) {
			e.printStackTrace();
		}catch(Exception e) {
			e.printStackTrace();
			throw new FindException("조회에 실패하였습니다.");
		}
		
		return oqList;
	}
	
	public void addOwnerQna(OwnerQna oq) throws AddException{
		try {
			repository.save(oq);
		}catch(Exception e) {
			e.printStackTrace();
			throw new AddException(e.getMessage());
		}	
	}
}
