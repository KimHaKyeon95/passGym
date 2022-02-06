package com.passgym.gympass.entity;

import java.util.Date;

import javax.persistence.Entity;

import com.passgym.pass.entity.Pass;
import com.passgym.payment.entity.Payment;

import com.passgym.star.entity.Star;
import com.passgym.user.entity.User;

@Entity
public class GymPass {
	private String paymentNo;
  
	private Pass pass;
	private User user;

	private Date startDate;
	private Date endDate;
	private int pauseCount;
	private int pauseDate;
	private int status;
	private int remain;//남은일수
	
	private Payment payment;
	private Star star;
	
	public GymPass() {}

	public GymPass(String paymentNo, Pass pass, User user, Date startDate, Date endDate, int pauseCount, int pauseDate,
			int status,int remain, Payment payment, Star star) {
		super();
		this.paymentNo = paymentNo;
		this.pass = pass;
		this.user = user;
		this.startDate = startDate;
		this.endDate = endDate;
		this.pauseCount = pauseCount;
		this.pauseDate = pauseDate;
		this.status = status;
		this.remain = remain;
		this.payment = payment;
		this.star = star;
	}

	public String getPaymentNo() {
		return paymentNo;
	}

	public void setPaymentNo(String paymentNo) {
		this.paymentNo = paymentNo;
	}

	public Pass getPass() {
		return pass;
	}

	public void setPass(Pass pass) {
		this.pass = pass;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getPauseCount() {
		return pauseCount;
	}

	public void setPauseCount(int pauseCount) {
		this.pauseCount = pauseCount;
	}

	public int getPauseDate() {
		return pauseDate;
	}

	public void setPauseDate(int pauseDate) {
		this.pauseDate = pauseDate;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getRemain() {
		return remain;
	}

	public void setRemain(int remain) {
		this.remain = remain;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public Star getStar() {
		return star;
	}

	public void setStar(Star star) {
		this.star = star;
	}

	@Override
	public String toString() {
		return "GymPass [paymentNo=" + paymentNo + ", pass=" + pass + ", user=" + user + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", pauseCount=" + pauseCount + ", pauseDate=" + pauseDate + ", status="
				+ status + ", payment=" + payment + ", star=" + star + "]";
	}
}
