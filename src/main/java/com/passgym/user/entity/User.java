package com.passgym.user.entity;

import java.util.List;

import javax.persistence.Entity;

import com.passgym.gympass.entity.GymPass;
import com.passgym.userqna.entity.UserQna;
import com.passgym.zzim.entity.Zzim;

@Entity
public class User {
	private int userNo; //사용자고유번호 
	private String id; //사용자아이디
	private String name; //사용자이름
	private String pwd; //비밀번호
	private String phoneNo; //핸드폰번호
	private String zipcode; //우편번호
	private String addr; //지번주소
	private String addrDetail; //상세주소
	private String sns; //sns(회원가입정보)
	private int userStatus;

	private List<GymPass> gymPasses;
	private List<UserQna> userQnas;
	private List<Zzim> zzims;

	public User() {}
	
	public User(int userNo, String id, String name, String pwd, String phoneNo, String zipcode, String addr,
			String addrDetail, String sns, int userStatus) {
		super();
		this.userNo = userNo;
		this.id = id;
		this.name = name;
		this.pwd = pwd;
		this.phoneNo = phoneNo;
		this.zipcode = zipcode;
		this.addr = addr;
		this.addrDetail = addrDetail;
		this.sns = sns;
		this.userStatus = userStatus;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
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

	public String getSns() {
		return sns;
	}

	public void setSns(String sns) {
		this.sns = sns;
	}
	
	public int getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(int userStatus) {
		this.userStatus = userStatus;
	}

	public List<GymPass> getGymPasses() {
		return gymPasses;
	}

	public void setGymPasses(List<GymPass> gymPasses) {
		this.gymPasses = gymPasses;
	}

	public List<UserQna> getUserQnas() {
		return userQnas;
	}

	public void setUserQnas(List<UserQna> userQnas) {
		this.userQnas = userQnas;
	}

	public List<Zzim> getZzims() {
		return zzims;
	}

	public void setZzims(List<Zzim> zzims) {
		this.zzims = zzims;
	}

	@Override
	public String toString() {
		return "User [userNo=" + userNo + ", id=" + id + ", name=" + name + ", pwd=" + pwd + ", phoneNo=" + phoneNo
				+ ", zipcode=" + zipcode + ", addr=" + addr + ", addrDetail=" + addrDetail + ", sns=" + sns
				+ ", userStatus=" + userStatus + ", gymPasses=" + gymPasses + ", userQnas=" + userQnas + ", zzims="
				+ zzims + "]";
	}
}
