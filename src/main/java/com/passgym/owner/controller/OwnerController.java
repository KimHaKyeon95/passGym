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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/ownersignup")
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    @Autowired
    OwnerRepository ownerRepository;

    @Autowired
    ObjectMapper mapper;

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
        String signupJson = mapper.writeValueAsString(owner);
        Map<String, String> transferedJson = new HashMap<>();
        Map transferOwner = mapper.readValue(signupJson, transferedJson.getClass());
        Optional<Owner> ownerOptional = ownerRepository.findById((String)transferOwner.get("ownerNo"));

        if(ownerOptional.isPresent()){
            return new ResponseEntity<>("OwnerNo is exists", HttpStatus.OK);
        }else{
            ownerSave.setId((String)transferOwner.get("id"));
            ownerSave.setPwd((String)transferOwner.get("pwd"));
            ownerSave.setOwnerNo((String)transferOwner.get("ownerNo"));
            ownerRepository.save(ownerSave);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
