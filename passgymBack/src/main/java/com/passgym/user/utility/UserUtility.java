package com.passgym.user.utility;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

@Component
public class UserUtility {

    public void profileImgSave(List<MultipartFile> profileImg, String id){

        try{
            if(profileImg != null){
                for(MultipartFile img : profileImg){
                    File imgDirectory = new File("/passGymUserImg/" + id , "profile.jpg");
                    if(!imgDirectory.exists()){
                        imgDirectory.mkdirs();
                    }
                    img.transferTo(imgDirectory);
                }
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }


    public String imgToByteString(String id) {

        try{
            InputStream imageStream = new FileInputStream("/passGymUserImg/" + id + "/" + "profile.jpg");
            byte[] imgByte = IOUtils.toByteArray(imageStream);
            String gymImgEncode = Base64.getEncoder().withoutPadding().encodeToString(imgByte);
            if(imageStream != null){
                imageStream.close();
            }
            return gymImgEncode;
        }catch(Exception e){
            return null;
        }
    }
}
