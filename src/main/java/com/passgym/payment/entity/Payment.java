package com.passgym.payment.entity;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class Payment {
	private String paymentNo;
	private int paymentPrice;
	private int paymentType;
	private String bankName;
	private Date paymentDate;
	
	public Payment() {}

	public Payment(String paymentNo, int paymentPrice, int paymentType, String bankName) {
		super();
		this.paymentNo = paymentNo;
		this.paymentPrice = paymentPrice;
		this.paymentType = paymentType;
		this.bankName = bankName;
	}

	public String getPaymentNo() {
		return paymentNo;
	}

	public void setPaymentNo(String paymentNo) {
		this.paymentNo = paymentNo;
	}

	public int getPaymentPrice() {
		return paymentPrice;
	}

	public void setPaymentPrice(int paymentPrice) {
		this.paymentPrice = paymentPrice;
	}

	public int getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	@Override
	public String toString() {
		return "Payment [paymentNo=" + paymentNo + ", paymentPrice=" + paymentPrice + ", paymentType=" + paymentType
				+ ", bankName=" + bankName + ", paymentDate=" + paymentDate + "]";
	}
}
