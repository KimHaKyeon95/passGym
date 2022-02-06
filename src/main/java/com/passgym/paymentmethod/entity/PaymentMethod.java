package com.passgym.paymentmethod.entity;

import javax.persistence.Entity;

@Entity
public class PaymentMethod {
	private int ownerNo;
	private int paymentType;
	private String apiKey;
	
	public PaymentMethod() {}

	public PaymentMethod(int ownerNo, int paymentType, String apiKey) {
		super();
		this.ownerNo = ownerNo;
		this.paymentType = paymentType;
		this.apiKey = apiKey;
	}

	public int getOwnerNo() {
		return ownerNo;
	}

	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}

	public int getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	@Override
	public String toString() {
		return "PaymentMethod [ownerNo=" + ownerNo + ", paymentType=" + paymentType + ", apiKey=" + apiKey + "]";
	}
}
