package com.passgym.pass.entity;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.passgym.gym.entity.Gym;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class PassPK implements Serializable {

    @Column(name="owner_no")
    private String ownerNo;

    @Column(name="pass_no")
    private int passNo;


    public PassPK() {
    }

    public PassPK(String owner_no, int pass_no) {
        this.ownerNo = owner_no;
        this.passNo = pass_no;
    }

    @Override
    public int hashCode() {
        return Objects.hash(ownerNo, passNo);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PassPK other = (PassPK) obj;
        return ownerNo == other.ownerNo && passNo == other.passNo;
    }
}
