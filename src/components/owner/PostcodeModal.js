import React from 'react';
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import DaumPostcode from 'react-daum-postcode';

const Postcode = (props) => {
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

    props.setValues({zipCode: data.zonecode,
                      addr: data.address})
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