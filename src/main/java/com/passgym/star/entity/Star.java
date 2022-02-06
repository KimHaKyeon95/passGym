package com.passgym.star.entity;

import javax.persistence.Entity;

@Entity
public class Star {
	private String paymentNo;
	private int star;
	
	public Star() {}

	public Star(String paymentNo, int star) {
		super();
		this.paymentNo = paymentNo;
		this.star = star;
	}

	public String getPaymentNo() {
		return paymentNo;
	}

	public void setPaymentNo(String paymentNo) {
		this.paymentNo = paymentNo;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	@Override
	public String toString() {
		return "Star [paymentNo=" + paymentNo + ", star=" + star + "]";
	}
}
