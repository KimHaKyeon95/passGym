package com.passgym.gym.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.passgym.gymequip.entity.GymEquip;
import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;
import com.passgym.paymentmethod.entity.PaymentMethod;
import com.passgym.zzim.entity.Zzim;

@Entity
public class Gym {
	//@Id @GeneratedValue
	//@OneToOne
	//@JoinColumn(name="owner_no")
	//private Owner owner; //포함관계를 만들 필요가 없으면 연결을 안시켜도 되나?
	@Id @GeneratedValue
	private int ownerNo; //사업자번호
	private String name; //헬스장이름
	private String phoneNo; //헬스장전화번호
	private String zipcode; //우편번호
	private String addr; //주소
	private String addrDetail; //상세주소
	private String introduce; //헬스장 소개
	private String notice; //공지사항
	private String operatingTime; //운영시간
	private String operatingProgram; // 운영프로그램
	private String extraService; //부가서비스
	private String etc; //기타
	private int totalStar; //총별점
	private int totalMember; //총인원수
	private double avgStar;
	private double lat; //위도 latitude 
	private double lon; //경도 longitude
	private double distance;//거리
	
	@MapsId("ownerNo")
	@OneToOne
	@JoinColumn(name = "owner_no")
	private Owner owner;
	
	private List<PaymentMethod> paymentMethods;
	private List<Pass> passes;
	private List<GymEquip> gymequips;
	private List<Zzim> zzims;
	
	public Gym() {}
	public Gym(int ownerNo, String name, String phoneNo, String zipcode, String addr, String addrDetail, String introduce,
			String notice, String operatingTime, String operatingProgram, String extraService, String etc,
			int totalStar, int totalMember, double avgStar,double lat, double lon, double distance) {
		super();
		this.ownerNo = ownerNo;
		this.name = name;
		this.phoneNo = phoneNo;
		this.zipcode = zipcode;
		this.addr = addr;
		this.addrDetail = addrDetail;
		this.introduce = introduce;
		this.notice = notice;
		this.operatingTime = operatingTime;
		this.operatingProgram = operatingProgram;
		this.extraService = extraService;
		this.etc = etc;
		this.totalStar = totalStar;
		this.totalMember = totalMember;
		this.avgStar = avgStar;
		this.lat = lat;//위도 latitude 
		this.lon = lon;//경도 longitude
		this.distance = distance;//거리
	}
//	public Gym(int ownerNo, String name, String addr, double distance, double avgStar) {
//		this.ownerNo = ownerNo;
//		this.name = name;
//		this.addr = addr;
//		this.distance = distance;
//		this.avgStar = avgStar;
//	}
	
	public double getDistance() {
		return distance;
	}
	public void setDistance(double distance) {
		this.distance = distance;
	}
	public int getOwnerNo() {
		return ownerNo;
	}
	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getAddrDetail() {
		return addrDetail;
	}
	public void setAddrDetail(String addrDetail) {
		this.addrDetail = addrDetail;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public String getNotice() {
		return notice;
	}
	public void setNotice(String notice) {
		this.notice = notice;
	}
	public String getOperatingTime() {
		return operatingTime;
	}
	public void setOperatingTime(String operatingTime) {
		this.operatingTime = operatingTime;
	}
	public String getOperatingProgram() {
		return operatingProgram;
	}
	public void setOperatingProgram(String operatingProgram) {
		this.operatingProgram = operatingProgram;
	}
	public String getExtraService() {
		return extraService;
	}
	public void setExtraService(String extraService) {
		this.extraService = extraService;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	public int getTotalStar() {
		return totalStar;
	}
	public void setTotalStar(int totalStar) {
		this.totalStar = totalStar;
	}
	public int getTotalMember() {
		return totalMember;
	}
	public void setTotalMember(int totalMember) {
		this.totalMember = totalMember;
	}
	public double getAvgStar() {
		return avgStar;
	}
	public void setAvgStar(double avgStar) {
		this.avgStar = avgStar;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}

	public List<PaymentMethod> getPaymentMethods() {
		return paymentMethods;
	}
	public void setPaymentMethods(List<PaymentMethod> paymentMethods) {
		this.paymentMethods = paymentMethods;
	}
	public List<Pass> getPasses() {
		return passes;
	}
	public void setPasses(List<Pass> passes) {
		this.passes = passes;
	}
	public List<GymEquip> getGymequips() {
		return gymequips;
	}
	public void setGymequips(List<GymEquip> gymequips) {
		this.gymequips = gymequips;
	}

	public List<Zzim> getZzims() {
		return zzims;
	}
	public void setZzims(List<Zzim> zzims) {
		this.zzims = zzims;
	}
	@Override
	public String toString() {
		return "Gym [ownerNo=" + ownerNo + ", name=" + name + ", phoneNo=" + phoneNo + ", zipcode=" + zipcode
				+ ", addr=" + addr + ", addrDetail=" + addrDetail + ", introduce=" + introduce + ", notice=" + notice
				+ ", operatingTime=" + operatingTime + ", operatingProgram=" + operatingProgram + ", extraService="
				+ extraService + ", etc=" + etc + ", totalStar=" + totalStar + ", totalMember=" + totalMember + ", avgStar=" + avgStar + ", lat="
				+ lat + ", lon=" + lon + ", distance=" + distance + "]";
	}
	
	
}
