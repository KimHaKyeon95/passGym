import React from 'react';
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import DaumPostcode from 'react-daum-postcode';

const Postcode = (props) => {

  const handleComplete = (data) => {
    const { kakao } = window;
    let yLocation = "";
    let xLocation = ""; 
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
    }

    let addr = extraAddress;
    //입력된 주소를 통해 좌표를 검색한다
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(addr, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            yLocation = result[0].y;
            xLocation = result[0].x;  
            console.log(yLocation + ":" + xLocation);
            props.setValues({zipCode: data.zonecode,
              addr: data.address,
              lat: yLocation,
              lon: xLocation });
        } 
    });

    
    
    props.onHide();
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