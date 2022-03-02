package com.passgym.gym.utility;

import com.passgym.dto.GymSortDto;

import java.util.Comparator;

public class GymStarCampare implements Comparator<GymSortDto> {

    @Override
    public int compare(GymSortDto gymDto1, GymSortDto gymDto2) {
        if(gymDto1.getStarScore() < gymDto2.getStarScore()){
            return 1;
        }else if(gymDto1.getStarScore() > gymDto2.getStarScore()){
            return -1;
        }else{
            return 0;
        }
    }
}
