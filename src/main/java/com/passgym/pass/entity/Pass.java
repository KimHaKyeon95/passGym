package com.passgym.pass.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

import com.passgym.gym.entity.Gym;
import com.passgym.gympass.entity.GymPass;

@Entity
public class Pass {
	private int ownerNo;
	private int passNo;
	private String passName;
	private int passPrice;
	private Date passDate;
	private int passStatus;
	private int passMonth;
	private int pauseCount;
	private int pauseDate;
	private String remarks;
	
	private Gym gym;
	private List<GymPass> gympasses;
	
	//private List<User> users; 

	public Pass() {}
	public Pass(int ownerNo, int passNo, String passName, int passPrice, Date passDate, int passStatus, int passMonth,
			int pauseCount, int pauseDate, String remarks) {
		super();
		this.ownerNo = ownerNo;
		this.passNo = passNo;
		this.passName = passName;
		this.passPrice = passPrice;
		this.passDate = passDate;
		this.passStatus = passStatus;
		this.passMonth = passMonth;
		this.pauseCount = pauseCount;
		this.pauseDate = pauseDate;
		this.remarks = remarks;
	}
	public int getOwnerNo() {
		return ownerNo;
	}
	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}
	public int getPassNo() {
		return passNo;
	}
	public void setPassNo(int passNo) {
		this.passNo = passNo;
	}
	public String getPassName() {
		return passName;
	}
	public void setPassName(String passName) {
		this.passName = passName;
	}
	public int getPassPrice() {
		return passPrice;
	}
	public void setPassPrice(int passPrice) {
		this.passPrice = passPrice;
	}
	public Date getPassDate() {
		return passDate;
	}
	public void setPassDate(Date passDate) {
		this.passDate = passDate;
	}
	public int getPassStatus() {
		return passStatus;
	}
	public void setPassStatus(int passStatus) {
		this.passStatus = passStatus;
	}
	public int getPassMonth() {
		return passMonth;
	}
	public void setPassMonth(int passMonth) {
		this.passMonth = passMonth;
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
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public Gym getGym() {
		return gym;
	}
	public void setGym(Gym gym) {
		this.gym = gym;
	}
	public List<GymPass> getGympasses() {
		return gympasses;
	}
	public void setGympasses(List<GymPass> gympasses) {
		this.gympasses = gympasses;
	}
	
	@Override
	public String toString() {
		return "Pass [ownerNo=" + ownerNo + ", passNo=" + passNo + ", passName=" + passName + ", passPrice=" + passPrice
				+ ", passDate=" + passDate + ", passStatus=" + passStatus + ", passMonth=" + passMonth + ", pauseCount="
				+ pauseCount + ", pauseDate=" + pauseDate + ", remarks=" + remarks + "]";
	}
}
