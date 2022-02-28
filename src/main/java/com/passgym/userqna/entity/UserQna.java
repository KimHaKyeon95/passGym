package com.passgym.userqna.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter	@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(name = "USER_QNA_SEQ_GENARATOR",
		sequenceName = "user_qna_seq",
		allocationSize = 1
)
public class UserQna {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,
	generator = "USER_QNA_SEQ_GENARATOR")
	private int qnaNo;
	private String title;
	private String content;
	private String reply;
	private int userNo;
	private int replyStatus;
	private Date qnaDate;
}
