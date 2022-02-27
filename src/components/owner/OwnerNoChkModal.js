import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "../../css/owner/ownerNoChkModal.css";

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

// 실제사용
// const ownerInfoSubmit = () => {
//     let ownerChkUrl = 
//     "https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey="+
//     "yeWTleWFMbrdJHGNZ46UuS0YS5oxQIUTzI10VMS68rhvPvEOg6awer3deybNn5OvMayF29zNgt83UrDj7tBrZw%3D%3D";
//     axios.post(ownerChkUrl, 
//       {
//         "businesses": [
//           ownerInfo
//         ]
//       })
//       .then((response) => {
//         if(response.data.data[0].valid == "01"){
//             alert("사업자 인증 완료");
//             props.setResults({ownerNoChkResult: 1});
//             props.setValues({ownerNo: ownerInfo.b_no,
//                             ownerName: ownerInfo.p_nm});
//             props.onHide();
//         }else{
//             alert("사업자 등록이 되어있지 않습니다.");
//             props.setResults({ownerNoChkResult: 0});
//         }
//     })
//   }

//테스트용
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
            alert("사업자 인증 완료.");
            props.setResults({ownerNoChkResult: 1});
            props.setValues({ownerNo: ownerInfo.b_no,
                            ownerName: ownerInfo.p_nm});
            props.onHide();
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
       
            
            <Form.Control className="ownersignup__ownername-chk" placeholder="사업자명" 
                            name="p_nm" onChange={ownerInfoInput} 
                            autoComplete="off" required/>
            
            
        
            <Form.Control className="ownersignup__ownerno-chk" placeholder="사업자 번호('-'를 제외하고 10자리의 수 입력)" 
                           name="b_no"  onChange={ownerInfoInput} 
                           autoComplete="off" type="number" min="1000000001" max="6210000001" required/>
          
            <Form.Control  className="ownersignup__ownerno-chk" placeholder="개업일자('YYYYMMDD'형식으로 입력)" 
            name="start_dt" onChange={ownerInfoInput} autoComplete="off" required/>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ownerInfoSubmit}>사업자 인증</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OwnersignupModal;