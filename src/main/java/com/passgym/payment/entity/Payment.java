package com.passgym.payment.entity;

import com.passgym.gympass.entity.GymPass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Payment {
	@Id
	private String paymentNo;

	@OneToOne(mappedBy = "payment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private GymPass gymPass;

	private int paymentPrice;
	private int paymentType;
	private String bankName;
	private Date paymentDate;

}
