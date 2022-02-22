package com.passgym.user.entity;

import java.util.List;

import javax.persistence.*;

import com.passgym.gympass.entity.GymPass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter	@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="USER_INFO")
@SequenceGenerator(name = "USER_NO_SEQ_GENARATOR",
		sequenceName = "user_seq",
		//initialValue = 1,
		allocationSize = 1
)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,
			generator = "USER_NO_SEQ_GENARATOR")
	private int userNo;

	private String id; //사용자아이디
	private String name; //사용자이름
	private String pwd; //비밀번호
	private String phoneNo; //핸드폰번호
	private String zipcode; //우편번호
	private String addr; //지번주소
	private String addrDetail; //상세주소
	private String sns; //sns(회원가입정보)
	private int userStatus;

	@OneToMany(mappedBy = "user",
			cascade = CascadeType.ALL,
			fetch = FetchType.LAZY)
	private List<GymPass> gymPasses;
}
