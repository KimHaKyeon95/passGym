package com.passgym.user.utility;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;

@Component
public class UserUtility {

    public String imgToByteString(String id) {

        try{
            InputStream imageStream = new FileInputStream("C://passGymUserImg/" + id + "/" + "profile.jpg");
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
