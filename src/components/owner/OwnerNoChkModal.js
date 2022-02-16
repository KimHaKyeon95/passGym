import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function OwnersignupModal(props) {
const [ownerInfo, setOwnerInfo] = useState(
  {
    "b_no": "",
    "start_dt": "",
    "p_nm": "",
  }
);

const ownerInfoInput = (event) => {
  const {name, value} = event.target;
  const nextInfo = {
    ...ownerInfo,
    [name] : value
  }
  setOwnerInfo(nextInfo);
}

const ownerInfoSubmit = () => {
    let ownerChkUrl = 
    "https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey="+
    "yeWTleWFMbrdJHGNZ46UuS0YS5oxQIUTzI10VMS68rhvPvEOg6awer3deybNn5OvMayF29zNgt83UrDj7tBrZw%3D%3D";
    axios.post(ownerChkUrl, 
      {
        "businesses": [
          ownerInfo
        ]
      })
      .then((response) => {
        if(response.data.data[0].valid == "01"){
            alert("사업자 인증 완료");
            props.setResults({ownerNoChkResult: 1});
            props.setValues({ownerNo: ownerInfo.b_no,
                            ownerName: ownerInfo.p_nm});
            props.onHide();
        }else{
            alert("사업자 등록이 되어있지 않습니다.");
            props.setResults({ownerNoChkResult: 0});
        }
    })
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          사업자 번호 인증
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>사업자 정보</h4>
        <Container> 
          <Row>
          <Form.Group className="ownersignup__ownername-chk" onChange={ownerInfoInput} controlId="ownersignup__owner-name">
            <Form.Control  placeholder="사업자명" name="p_nm" required/>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group className="ownersignup__ownerno-chk" onChange={ownerInfoInput} controlId="ownersignup__owner-no">
            <Form.Control  placeholder="사업자 번호('-'를 제외하고 입력)" name="b_no" required/>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group className="ownersignup__ownerno-chk" onChange={ownerInfoInput} controlId="ownersignup__owner-opendate">
            <Form.Control  placeholder="개업일자('YYYYMMDD'형식으로 입력)" name="start_dt" required/>
          </Form.Group>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ownerInfoSubmit}>사업자 인증</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OwnersignupModal;