package com.passgym.owner.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.passgym.gym.entity.Gym;

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
public class Owner {

	@Id
	private String ownerNo;
	private String id;
	private String pwd;
	private int ownerStatus;
	
	@OneToOne
	@JoinColumn(name = "owner_no")
	private Gym gym; //단방향 설정이 필요한가?

}
