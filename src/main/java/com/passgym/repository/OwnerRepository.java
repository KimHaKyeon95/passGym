package com.passgym.repository;

import com.passgym.owner.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, String> {

    public Optional<Owner> findOwnerByOwnerNo(String ownerNo);

    public  Optional<Owner> findOwnerById(String id);

    
    Owner findByIdAndPwd(String id , String pwd);
    
}
