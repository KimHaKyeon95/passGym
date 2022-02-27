package com.passgym.gym.controller;

 

import javax.servlet.http.HttpSession;

 
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.passgym.exception.FindException;
import com.passgym.gym.entity.Gym;
import com.passgym.owner.entity.Owner;
import com.passgym.pass.entity.Pass;
import com.passgym.repository.GymRepository;
import com.passgym.repository.OwnerRepository;
import com.passgym.service.GymService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.passgym.payment.entity.Payment;
import com.passgym.service.GymService;
import com.passgym.user.entity.User;



@RestController
@RequestMapping("gym/*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymController {
	@Autowired
	private GymService service;
	
 
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	GymRepository gymRepository;

	@Autowired
	OwnerRepository ownerRepository;

	@Autowired
	GymService gymService;
	
	@GetMapping("/{ownerNo}")
	public Object gymDetail(@PathVariable(name="ownerNo") String ownerNo) {
		try {
			Gym gym = service.findByOwnerNo(ownerNo);
			String name = gym.getName();
			String phoneNo = gym.getPhoneNo();
			String addr = gym.getAddr();
			String addrDetail = gym.getAddrDetail();
			double avgStar = (double)gym.getTotalStar() / gym.getTotalMember();
			String introduce = gym.getIntroduce();
			String notice = gym.getNotice();
			String operatingTime = gym.getOperatingTime();
			String operatingProgram = gym.getOperatingProgram();
			String extraService = gym.getExtraService();
			String etc = gym.getEtc();
			
			Map<String, Object> map = new HashMap<>();
			map.put("name", name);
			map.put("phoneNo", phoneNo);
			map.put("avgStar", avgStar);
			map.put("introduce", introduce);
			map.put("notice", notice);
			map.put("operatingTime", operatingTime);
			map.put("operatingProgram", operatingProgram);
			map.put("extraService", extraService);
			map.put("etc", etc);
			
			List<Map> passes = new ArrayList<>();
			for(Pass p: gym.getPasses()) {
				Map<String, Object> pass = new HashMap<>();
				int passNo = p.getPassPk().getPassNo();
				String passName = p.getPassName();
				int passPrice = p.getPassPrice();
				int passMonth = p.getPassMonth();
				pass.put("passNo", passNo);
				pass.put("passName", passName);
				pass.put("passPrice", passPrice);
				pass.put("passMonth", passMonth);
				passes.add(pass);
			}
			map.put("passes", passes);
			
			String result = objectMapper.writeValueAsString(map);
			return result;
		}catch(FindException e) {
			Map<String, Object> returnMap = new HashMap<>();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
			return returnMap;
		}catch (JsonProcessingException e) {
			e.printStackTrace();
			Map<String, Object> returnMap = new HashMap<>();
			returnMap.put("msg", e.getMessage());
			returnMap.put("status", 0);
			return returnMap;
		}
	}


	@PostMapping(value = "/gymregist", consumes = "multipart/form-data")
	public String saveGym(@RequestParam("files") List<MultipartFile> files,
						@RequestParam("detailFiles") List<MultipartFile> detailFiles,
						@RequestParam("gymInfo") String gymInfo,
						@RequestParam("passes") String passes) {
		try{
			gymService.gymSetting(files, detailFiles, gymInfo, passes );
		}catch(Exception e){
			e.printStackTrace();
			return "error";
		}
		return "ok";
	}
}

	
	@Autowired
	private OwnerRepository ownerRepository;
	
		@CrossOrigin
		@GetMapping("/gympass/user")
		//@ResponseBody
		public Object UserInfoList(HttpSession session) {	
			
			
			
			String ownerId = "ownerid9";
			String ownerPwd = "ownerp9";
			Owner o = ownerRepository.findByIdAndPwd(ownerId, ownerPwd);
			Gym g = o.getGym();
			session.setAttribute("loginInfo", g); //세션에 gym정보가 저장되어있다는 가정

			Gym gym = (Gym)session.getAttribute("loginInfo");
			if(gym ==null) {
				//로그인 안된 경우 할 일
			}
			List<Pass>list =  service.gymUserSelect(gym) ;
			//logger.info("list.size=" + list.size());
			//logger.info("0=" + list.get(0));
			//List<Pass>temp = new ArrayList<>();
			//temp.add(list.get(0));
			ObjectMapper mapper = new ObjectMapper();
			List<Map<String,Object>> returnPassJsonList = new ArrayList<>();
			try {
				list.forEach(p -> {
					Map<String, Object> pMap = new HashMap<>();
					pMap.put("passNo", p.getPassPk().getPassNo());
					pMap.put("ownerNo", p.getPassPk().getOwnerNo());//
					pMap.put("passName", p.getPassName());
					pMap.put("passPrice", p.getPassPrice());
					pMap.put("passDate", p.getPassDate());
					pMap.put("passStatus", p.getPassStatus());
					pMap.put("passMonth", p.getPassMonth());
					pMap.put("pauseCount", p.getPauseCount());
					pMap.put("pauseDate", p.getPauseDate());
					pMap.put("remarks", p.getRemarks());

					List<Map<String,Object>>listGP = new ArrayList<>();			

					p.getGympasses().forEach(gp ->{
						Map<String, Object>gpMap = new HashMap<>();
						User u = gp.getUser();
						Map<String, Object> uMap =new HashMap<>();
						uMap.put("userNo", u.getUserNo());
						uMap.put("userId", u.getId());
						uMap.put("userName", u.getName());
						uMap.put("phoneNo", u.getPhoneNo());
						uMap.put("addr", u.getAddr());
						uMap.put("addrDetail", u.getAddrDetail());	
						gpMap.put("userNo", u.getUserNo());
						gpMap.put("user", uMap);

						Payment payment = gp.getPayment();
						Map<String, Object> paymentMap =new HashMap<>();
						paymentMap.put("paymentNo", payment.getPaymentNo());
						paymentMap.put("paymentPrice", payment.getPaymentPrice());
						paymentMap.put("paymentType", payment.getPaymentType());
						paymentMap.put("bankName", payment.getBankName());
						paymentMap.put("paymentDate", payment.getPaymentDate());
						gpMap.put("paymentNo", payment.getPaymentNo());				
						gpMap.put("payment", paymentMap);

						listGP.add(gpMap);
					});
					pMap.put("gymPasses", listGP);
					returnPassJsonList.add(pMap);
				});
				String jsonStr = mapper.writeValueAsString(returnPassJsonList);
				logger.info(jsonStr);
				return jsonStr;
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}

			/*
			g.user_no, g.start_date, g.end_date, g.status, g.pause_count g_pause_count, g.pause_date g_pause_date,

	u.user_id, u.user_name, u.phone_no ,  u.addr, u.add_detail, 
	p.payment_no, p.payment_price, p.payment_type, p.bank_name, p.payment_date 
			 */
			//return temp;
			return null;

		};
	}


 
