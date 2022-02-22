package com.passgym.zzim.entity;

import java.util.List;

import javax.persistence.Entity;

import com.passgym.gym.entity.Gym;
import com.passgym.user.entity.User;

public class Zzim {


	private User user;
	private Gym gym;
	
	public Zzim() {}

	public Zzim(User user, Gym gym) {
		super();
		this.user = user;
		this.gym = gym;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Gym getGym() {
		return gym;
	}

	public void setGym(Gym gym) {
		this.gym = gym;
	}

	@Override
	public String toString() {
		return "Zzim [user=" + user + ", gym=" + gym + "]";
	}
}
