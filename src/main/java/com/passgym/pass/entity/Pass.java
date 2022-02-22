package com.passgym.pass.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.passgym.gym.entity.Gym;
import com.passgym.gympass.entity.GymPass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Pass")
@Entity
public class Pass {

	@EmbeddedId
	private PassPK passPk;

	private String passName;
	private int passPrice;
	private Date passDate;
	private int passStatus;
	private int passMonth;
	private int pauseCount;
	private int pauseDate;
	private String remarks;

	@ManyToOne
	@JoinColumn(name="owner_no", insertable = false, updatable = false)
	private Gym gym;


	@OneToMany
	@JoinColumn(name="owner_no", insertable = false, updatable = false)
	@JoinColumn(name="pass_no", insertable = false, updatable = false)
	private List<GymPass> gympasses;




	//private List<User> users; 




}
