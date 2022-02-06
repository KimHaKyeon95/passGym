package com.passgym.userqna.entity;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class UserQna {
	private int qnaNo;
	private String title;
	private String content;
	private String reply;
	private int userNo;
	private int replyStatus;
	private Date qnaDate;
	
	public UserQna() {}

	public UserQna(int qnaNo, String title, String content, String reply, int userNo, int replyStatus, Date qnaDate) {
		super();
		this.qnaNo = qnaNo;
		this.title = title;
		this.content = content;
		this.reply = reply;
		this.userNo = userNo;
		this.replyStatus = replyStatus;
		this.qnaDate = qnaDate;
	}

	public int getQnaNo() {
		return qnaNo;
	}

	public void setQnaNo(int qnaNo) {
		this.qnaNo = qnaNo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getReply() {
		return reply;
	}

	public void setReply(String reply) {
		this.reply = reply;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public int getReplyStatus() {
		return replyStatus;
	}

	public void setReplyStatus(int replyStatus) {
		this.replyStatus = replyStatus;
	}

	public Date getQnaDate() {
		return qnaDate;
	}

	public void setQnaDate(Date qnaDate) {
		this.qnaDate = qnaDate;
	}

	@Override
	public String toString() {
		return "UserQna [qnaNo=" + qnaNo + ", title=" + title + ", content=" + content + ", reply=" + reply
				+ ", userNo=" + userNo + ", replyStatus=" + replyStatus + ", qnaDate=" + qnaDate + "]";
	}
}
