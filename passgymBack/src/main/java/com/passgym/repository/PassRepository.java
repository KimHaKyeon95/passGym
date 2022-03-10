package com.passgym.repository;

import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassRepository extends JpaRepository<Pass, PassPK> {
}
