package com.passgym.owner.entity;

import java.util.List;

import javax.persistence.*;

import com.passgym.gym.entity.Gym;
import com.passgym.ownerqna.entity.OwnerQna;
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
	private Gym gym; //단방향 설정이 필요한가?

}
