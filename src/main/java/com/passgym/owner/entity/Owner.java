package com.passgym.owner.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.passgym.gym.entity.Gym;
import com.passgym.ownerqna.entity.OwnerQna;

@Entity
@Table(name = "owner")
public class Owner {
	@Id
	private int ownerNo;
	private String id;
	private String pwd;
	private int ownerStatus;
	
	@OneToOne(mappedBy = "owner")
	private Gym gym; //단방향 설정이 필요한가?
	
	private List<OwnerQna> ownerQnas;
	
	public List<OwnerQna> getOwnerQnas() {
		return ownerQnas;
	}



	public void setOwnerQnas(List<OwnerQna> ownerQnas) {
		this.ownerQnas = ownerQnas;
	}



	public Owner() {}
 
	
	
	public Owner(int ownerNo, String id, String pwd, int ownerStatus) {
		super();
		this.ownerNo = ownerNo;
		this.id = id;
		this.pwd = pwd;
		this.ownerStatus = ownerStatus;
	}

	public int getOwnerNo() {
		return ownerNo;
	}

	public void setOwnerNo(int owner_no) {
		this.ownerNo = owner_no;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	public int getOwnerStatus() {
		return ownerStatus;
	}

	public void setOwnerStatus(int ownerStatus) {
		this.ownerStatus = ownerStatus;
	}



	@Override
	public String toString() {
		return "Owner [ownerNo=" + ownerNo + ", id=" + id + ", pwd=" + pwd + ", ownerStatus=" + ownerStatus
				+ ", ownerQnas=" + ownerQnas + "]";
	}

 
}
