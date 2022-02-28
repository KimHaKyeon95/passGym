package com.passgym.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GymSortDto {

    private String ownerNo; //사업자번호
    private String name; //헬스장이름
    private String addr; //주소
    private double distance;//거리
    private int totalStar; //총별점
    private int totalMember; //총인원수

}
