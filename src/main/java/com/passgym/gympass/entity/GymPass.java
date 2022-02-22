package com.passgym.gympass.entity;

import java.util.Date;

import javax.persistence.*;

import com.passgym.pass.entity.Pass;
import com.passgym.payment.entity.Payment;

import com.passgym.star.entity.Star;
import com.passgym.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class GymPass {

	@Id
	private String paymentNo;

	@MapsId
	@OneToOne(fetch = FetchType.LAZY
			//,cascade = CascadeType.ALL
	)
	@JoinColumn(name="payment_no")
	private Payment payment;

	@ManyToOne
	@JoinColumn(name="owner_no") //복합키 순서
	@JoinColumn(name="pass_no")
	private Pass pass;

	@ManyToOne(fetch = FetchType.LAZY
			//,cascade = CascadeType.ALL
	)
	@JoinColumn(name = "USER_NO")
	private User user;


	private Date startDate;
	private Date endDate;
	private int pauseCount;
	private int pauseDate;
	private int status;
	private int remain;//남은일수

//	@OneToOne
//	private Payment payment;
//	private Star star;
	

}
