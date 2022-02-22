package com.passgym.owner.repository;

import com.passgym.owner.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, String> {

    public Optional<Owner> findOwnerByOwnerNo(String ownerNo);
}
