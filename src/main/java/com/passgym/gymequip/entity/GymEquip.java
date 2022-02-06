package com.passgym.gymequip.entity;

import com.passgym.equip.entity.Equip;

public class GymEquip {
	private int ownerNo;
	private int equipNo;
	private int equipCount;

	private Equip equip; 

	
	public GymEquip() {}

	public GymEquip(int ownerNo, int equipNo, int equipCount) {
		super();
		this.ownerNo = ownerNo;
		this.equipNo = equipNo;
		this.equipCount = equipCount;
	}

	public int getOwnerNo() {
		return ownerNo;
	}

	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}

	public int getEquipNo() {
		return equipNo;
	}

	public void setEquipNo(int equipNo) {
		this.equipNo = equipNo;
	}

	public int getEquipCount() {
		return equipCount;
	}

	public void setEquipCount(int equipCount) {
		this.equipCount = equipCount;
	}
	
	public Equip getEquip() {
		return equip;
	}

	public void setEquip(Equip equip) {
		this.equip = equip;
	}

	@Override
	public String toString() {
		return "GymEquip [ownerNo=" + ownerNo + ", equipNo=" + equipNo + ", equipCount=" + equipCount + "]";
	}
}
