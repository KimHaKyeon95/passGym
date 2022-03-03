package com.passgym.owner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.gym.entity.Gym;
import com.passgym.owner.entity.Owner;
import com.passgym.repository.OwnerRepository;
import com.passgym.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/owner")
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    @Autowired
    OwnerRepository ownerRepository;

    @Autowired
    ObjectMapper mapper;

    @PostMapping("/login")
    @ResponseBody
    public Object login(@RequestBody Map<String, String> loginInfo){
        Optional<Owner> ownerOptional = ownerRepository.findOwnerById(loginInfo.get("id"));
        if(!ownerOptional.isPresent()){
            return "id fail";
        }else{
            if(!loginInfo.get("pwd").equals(ownerOptional.get().getPwd())){
                return "pwd fail";
            }else{
                if(ownerOptional.get().getOwnerStatus() == 1){
                    Map<String, String>  returnMap = new HashMap<>();
                    Gym gym = ownerOptional.get().getGym();
                    returnMap.put("ownerNo", gym.getOwnerNo());
                    returnMap.put("zipcode", gym.getZipcode());
                    returnMap.put("addr", gym.getAddr());
                    returnMap.put("addrDetail", gym.getAddrDetail());
                    returnMap.put("lat", Double.toString(gym.getLat()));
                    returnMap.put("lon", Double.toString(gym.getLon()));
                    returnMap.put("msg", "need gym regist");
                    return returnMap;
                }else {
                    return ownerOptional.get().getOwnerNo();
                }
            }
        }
    }

    @GetMapping("/iddupchk")
    public String idDupChk(@RequestParam String id){
       Optional<Owner> owner = ownerRepository.findOwnerById(id);
        if(owner.isPresent()){
            return "no";
        }else{
            return "ok";
        }
    };

    @PostMapping("/signup")
    public ResponseEntity ownerSignup(@RequestBody Map<String, String> owner) throws IOException {
        System.out.println(owner.get("zipcode"));
        Owner ownerSave = new Owner();
        Gym gym = new Gym();
        Optional<Owner> ownerOptional = ownerRepository.findById(owner.get("ownerNo"));
        if(ownerOptional.isPresent()){
            return new ResponseEntity<>("OwnerNo is exists", HttpStatus.OK);
        }else{

            ownerSave.setId(owner.get("id"));
            ownerSave.setPwd(owner.get("pwd"));
            ownerSave.setOwnerNo(owner.get("ownerNo"));
            gym.setOwner(ownerSave);
            gym.setOwnerNo(ownerSave.getOwnerNo());
            gym.setName("tempName");
            gym.setPhoneNo("00000000000");
            gym.setZipcode(owner.get("zipcode"));
            gym.setAddr(owner.get("addr"));
            gym.setAddrDetail(owner.get("addrDetail"));
            gym.setLat(Double.parseDouble(owner.get("lat")));
            gym.setLon(Double.parseDouble(owner.get("lon")));

            ownerSave.setGym(gym);
            ownerSave.setOwnerStatus(1);

            ownerRepository.save(ownerSave);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
