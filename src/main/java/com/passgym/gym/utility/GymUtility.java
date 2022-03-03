package com.passgym.gym.utility;


import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Component
public class GymUtility {

    public void gymImgSave(List<MultipartFile> files, List<MultipartFile> detailFiles, String ownerNo){
    	
        try{
        	if(files != null) { //헬스장정보 수정할때 대표이미지를 변경하지 않는다면 files가 널일수 있다 
	            for(MultipartFile file : files) {
	                String imgName = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
	                String originFileName = file.getOriginalFilename();
	                String fileExtension = originFileName.substring(originFileName.lastIndexOf(".") + 1);
	                File imgDirectory = new File("C:/passGymImg/" + ownerNo , imgName + "." + fileExtension);
	                if (!imgDirectory.exists()) {
	                    imgDirectory.mkdirs();
	                }
	                file.transferTo(imgDirectory);
	            }
        	}
        	if(detailFiles != null) { 
	            for(MultipartFile detailFile : detailFiles){
	                String detailImgName =  (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
	                String originDetailFileName = detailFile.getOriginalFilename();
	                String detailFileExtension = originDetailFileName.substring(originDetailFileName.lastIndexOf(".") + 1);
	                File detailImgDirectory = new File("C:/passGymImg/" + ownerNo + "/detailImg" , detailImgName + "." + detailFileExtension);
	                if (!detailImgDirectory.exists()) {
	                    detailImgDirectory.mkdirs();
	                }
	                detailFile.transferTo(detailImgDirectory);
	            }
        	}

        }catch(IOException e){
            e.printStackTrace();
        }

    }

    public String imgToByteString(String ownerNo) throws IOException {
        InputStream imageStream = new FileInputStream("C://passGymImg/" + ownerNo + "/" + ownerNo + ".jpg");
        byte[] imgByte = IOUtils.toByteArray(imageStream);
        String gymImgEncode = Base64.getEncoder().withoutPadding().encodeToString(imgByte);
        if(imageStream != null){
            imageStream.close();
        }
        return gymImgEncode;
    }
}
