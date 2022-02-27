package com.passgym.owner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.owner.entity.Owner;
import com.passgym.repository.OwnerRepository;
import com.passgym.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/owner")
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    @Autowired
    OwnerRepository ownerRepository;

    @Autowired
    ObjectMapper mapper;

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginInfo){
        System.out.println(loginInfo.get("pwd"));
        Optional<Owner> ownerOptional = ownerRepository.findOwnerById(loginInfo.get("id"));
        if(!ownerOptional.isPresent()){
            return "id fail";
        }else{
            System.out.println(ownerOptional.get().getPwd());
            if(!loginInfo.get("pwd").equals(ownerOptional.get().getPwd())){
                return "pwd fail";
            }else{
                return ownerOptional.get().getOwnerNo();
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
        Owner ownerSave = new Owner();
//        String signupJson = mapper.writeValueAsString(owner);
//        Map<String, String> transferedJson = new HashMap<>();
//        Map transferOwner = mapper.readValue(signupJson, transferedJson.getClass());
//        Optional<Owner> ownerOptional = ownerRepository.findById((String)transferOwner.get("ownerNo"));
        Optional<Owner> ownerOptional = ownerRepository.findById(owner.get("ownerNo"));
        if(ownerOptional.isPresent()){
            return new ResponseEntity<>("OwnerNo is exists", HttpStatus.OK);
        }else{
//            ownerSave.setId((String)transferOwner.get("id"));
//            ownerSave.setPwd((String)transferOwner.get("pwd"));
//            ownerSave.setOwnerNo((String)transferOwner.get("ownerNo"));
            ownerSave.setId(owner.get("id"));
            ownerSave.setPwd(owner.get("pwd"));
            ownerSave.setOwnerNo(owner.get("ownerNo"));
            ownerRepository.save(ownerSave);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
