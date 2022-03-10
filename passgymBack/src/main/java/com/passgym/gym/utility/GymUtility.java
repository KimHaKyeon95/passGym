package com.passgym.gym.utility;


import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

@Component
public class GymUtility {
	
	private Logger logger = LoggerFactory.getLogger(getClass());

    public void gymImgSave(List<MultipartFile> files, List<MultipartFile> detailFiles, String ownerNo){
    	
        try{
        	if(files != null) { //헬스장정보 수정할때 대표이미지를 변경하지 않는다면 files가 널일수 있다 
	            for(MultipartFile file : files) {
					File imgDirectory = new File("/passGymImg/" + ownerNo);
	                if (!imgDirectory.exists()) {
	                    boolean flag = imgDirectory.mkdirs();
	                    logger.info("not exists mkdirs=" + flag);
	                }else {
	                	logger.info("exists");
	                }
	                File imgFile = new File ("/passGymImg/" + ownerNo , "main.jpg");
	                file.transferTo(imgFile);
	            }
        	}
        	if(detailFiles != null) {
				int nameNum = 1;
	            for(MultipartFile detailFile : detailFiles){
	                File detailImgDirectory = new File("/passGymImg/" + ownerNo, "d" + nameNum + ".jpg");
	                if (!detailImgDirectory.exists()) {
	                    detailImgDirectory.mkdirs();
	                }
					nameNum++;
	                detailFile.transferTo(detailImgDirectory);
	            }
        	}
        }catch(IOException e){
            e.printStackTrace();
        }

    }

    public String imgToByteString(String ownerNo) throws IOException {
        InputStream imageStream = new FileInputStream("/passGymImg/" + ownerNo + "/" + "main.jpg");
        byte[] imgByte = IOUtils.toByteArray(imageStream);
        String gymImgEncode = Base64.getEncoder().withoutPadding().encodeToString(imgByte);
        if(imageStream != null){
            imageStream.close();
        }
        return gymImgEncode;
    }
}
