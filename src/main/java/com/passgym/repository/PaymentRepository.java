package com.passgym.repository;

import org.springframework.data.repository.CrudRepository;

import com.passgym.payment.entity.Payment;

public interface PaymentRepository extends CrudRepository<Payment, String> {

}
