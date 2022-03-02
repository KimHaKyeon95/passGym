import axios from 'axios';
import React from 'react';
import {Button, Modal} from "react-bootstrap";
import DaumPostcode from 'react-daum-postcode';

const Postcode = (props) => {

  let zipCode = "";

  const handleComplete = (data) => {

    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    zipCode = data.zonecode
    let addrResult = fullAddress; //꼭 전체 주소를 넣어줘야 검색이 된다...extraAdrress로는 검색이 잘 되지 않는다...
    
    addressResearch(addrResult);
    props.onHide();
  }



  const addressResearch = (address) => {
    const { kakao } = window;
    let geocoder = new kakao.maps.services.Geocoder();
    let yLocation = "";
    let xLocation = ""; 
    
    geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            yLocation = result[0].y;
            xLocation = result[0].x;  
            props.setValues({zipcode: zipCode,
                            addr: address,
                            lat: yLocation,
                            lon: xLocation });
        } else{
          console.log("fail");
        }
    });
  }

  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header>
        <Modal.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <DaumPostcode
        onComplete={handleComplete}
      />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    
  );
}

export default Postcode;