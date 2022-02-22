package com.passgym.paymentmethod.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class PaymentMethod {

	@Id
	private int ownerNo;
	private int paymentType;
	private String apiKey;
	

}
