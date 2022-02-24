package com.passgym.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.passgym.exception.AddException;
import com.passgym.payment.entity.Payment;
import com.passgym.repository.PaymentRepository;

@Service
public class PaymentService {
	@Autowired
	PaymentRepository paymentRepository;
	
	public void addPayment(Payment payment) throws AddException{
		try {
			paymentRepository.save(payment);
		}catch(Exception e){
			e.printStackTrace();
			throw new AddException("결제 실패");
		}
		
	}
}
