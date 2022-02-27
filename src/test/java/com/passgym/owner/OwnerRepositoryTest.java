package com.passgym.owner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.passgym.gym.entity.Gym;
import com.passgym.repository.GymRepository;
import com.passgym.owner.entity.Owner;
import com.passgym.repository.OwnerRepository;
import com.passgym.pass.entity.Pass;
import com.passgym.pass.entity.PassPK;
import com.passgym.repository.PassRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.junit.jupiter.api.DisplayName;

 

@SpringBootTest
public class OwnerRepositoryTest {

    @Autowired
    OwnerRepository ownerRepository;

    @Autowired
    GymRepository gymRepository;

    @Autowired
    PassRepository passRepository;
    Logger logger = LoggerFactory.getLogger(getClass());
    @Test
    public void ownerFindTest(){

        Optional<Owner> owner = ownerRepository.findOwnerById("id1@naver.com");
        assertEquals("1", owner.get().getOwnerNo());
    }

    @Test
    public void OwnerSaveTest(){

        Owner owner = new Owner();
        owner.setOwnerNo("123");
        owner.setId("testId");
        owner.setPwd("testPwd");
        owner.setOwnerStatus(1);
//        Gym gym = new Gym();
//        gym.setOwnerNo(owner.getOwnerNo());
//        owner.setGym(gym);
        ownerRepository.save(owner);
    }

    @Test
    public void findGymByOwnerTest(){
        Optional<Owner> owner = ownerRepository.findOwnerByOwnerNo("123");
        Gym ownerGym = owner.get().getGym();
        Optional<Gym> gym = gymRepository.findById("123");
        assertEquals(gym.get().getName(), ownerGym.getName());
    }

    @Test
    public void GymSaveTest(){
        Optional<Owner> owner = ownerRepository.findOwnerByOwnerNo("123");
        Gym gym = new Gym();
        gym.setOwnerNo(owner.get().getOwnerNo());
        gym.setName("testGymName");
        gym.setPhoneNo("01012345678");
        gym.setZipcode("15017");
        gym.setAddr("testAddr");
        gym.setAddrDetail("testAddrDetail");
        gym.setIntroduce("testIntroduce");
        gym.setNotice("testNotice");
        gym.setOperatingTime("testTime");
        gym.setOperatingProgram("testProgram");
        gym.setExtraService("testService");
        gym.setEtc("testEtc");
        gym.setTotalStar(0);
        gym.setTotalMember(0);
        gym.setLat(0.0);
        gym.setLon(0.0);
        gymRepository.save(gym);
    }

    @Test
    @Transactional
    @Commit
    public void passSaveTest(){
        Optional<Gym> gymOptional = gymRepository.findById("123");
        Gym gym = gymOptional.get();
        List<Pass> passes = new ArrayList<>();
        Pass pass = new Pass();
        PassPK passPK = new PassPK("123", 1);
        pass.setPassPk(passPK);
        pass.setPassName("testPass");
        pass.setPassPrice(12345);
        pass.setPassDate(new Date());
        pass.setPassStatus(1);
        pass.setPassMonth(1);
        pass.setPauseCount(2);
        pass.setPauseDate(30);
        pass.setRemarks("test");
        pass.setGym(gym);
        passes.add(pass);
        gym.setPasses(passes);
        gymRepository.save(gym);


//        String ownerNo = "123";
//        int passNo = 1;
//        PassPK passPK = new PassPK(ownerNo, passNo);
//
//        Optional<Pass> optPass = passRepository.findById(passPK);
//        assertTrue(optPass.isPresent());
//        Pass pass = optPass.get();

    }
    @Test
    void testInsert(){

//        Pass pass = new Pass();
//        String ownerNo = "123";
//        int passNo = 1;
//        PassPK passPK = new PassPK(ownerNo, passNo);
//        PassPK.setOwnerNo(ownerNo);
//        PassPK.setPassNo(passNo);
//        pass.setPassPK(passpk);
//        Gym g = new Gym(
//                ownerNo
//                ,name, phoneNo, zipcode, addr, addrDetail


//        );

    }
    
    
	@Test
	@DisplayName("판매자insert_ownerTest")
	void testInsert1() { //owner 값 넣기
		for(int i=1; i<10; i++) {
			Owner o = new Owner();
			o.setOwnerNo("1000000001");
			o.setId("ownerid"+i);
			o.setPwd("ownerp"+i);
			o.setOwnerStatus(1);		//1: 관리자 승인 , 2: 관리자 승인거절
			ownerRepository.save(o);
		}
	}
    

}
