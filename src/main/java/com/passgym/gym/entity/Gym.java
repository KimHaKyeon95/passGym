package com.passgym.gym.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Gym {
	//@Id @GeneratedValue
	//@OneToOne
	//@JoinColumn(name="owner_no")
	//private Owner owner; //포함관계를 만들 필요가 없으면 연결을 안시켜도 되나?

	@Id
	private String ownerNo; //사업자번호
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
	private double lat; //위도 latitude 
	private double lon; //경도 longitude
//	private double distance;//거리

//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "owner_no", insertable = false, updatable = false)
//    private Owner owner;
	
//	private List<PaymentMethod> paymentMethods;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name="owner_no")
	private List<Pass> passes;

}
