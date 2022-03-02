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

            for(MultipartFile detailFile : detailFiles){
                int nameNum = 0;
                String detailImgName =  (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
                String originDetailFileName = detailFile.getOriginalFilename();
                String detailFileExtension = originDetailFileName.substring(originDetailFileName.lastIndexOf(".") + 1);
                String detailFilePath = "C:/passGymImg/" + ownerNo + "/detailImg" + ownerNo + nameNum + "." + detailFileExtension;
                File detailImgDirectory = new File("C:/passGymImg/" + ownerNo + "/detailImg" , ownerNo + nameNum + "." + detailFileExtension);
                if (!detailImgDirectory.exists()) {
                    detailImgDirectory.mkdirs();
                }
                nameNum++;
                detailFile.transferTo(detailImgDirectory);
            }


            for(MultipartFile file : files) {
                String originFileName = file.getOriginalFilename();
                String fileExtension = originFileName.substring(originFileName.lastIndexOf(".") + 1);
                File imgDirectory = new File("C:/passGymImg/" + ownerNo , ownerNo + "." + fileExtension);
                if (!imgDirectory.exists()) {
                    imgDirectory.mkdirs();
                } else{

                }
                file.transferTo(imgDirectory);
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
