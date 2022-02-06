package com.passgym.equip.entity;

public class Equip {
	private int equipNo;
	private String equipName;
	
	public Equip() {}
	
	public Equip(int equipNo, String equipName) {
		super();
		this.equipNo = equipNo;
		this.equipName = equipName;
	}

	public int getEquipNo() {
		return equipNo;
	}

	public void setEquipNo(int equipNo) {
		this.equipNo = equipNo;
	}

	public String getEquipName() {
		return equipName;
	}

	public void setEquipName(String equipName) {
		this.equipName = equipName;
	}

	@Override
	public String toString() {
		return "Equip [equipNo=" + equipNo + ", equipName=" + equipName + "]";
	}
}
