package com.passgym.owner.entity;

import com.passgym.gym.entity.Gym;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


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
	
	@OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
	@JoinColumn(name="owner")
	private Gym gym;

}
