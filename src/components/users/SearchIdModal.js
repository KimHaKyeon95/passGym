import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import "../../css/user/searchidmodal.css";

function SearchIdModal(props) {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [showResultMsg, setShowResultMsg] = useState(false);

  function onNameHandler(event) {
    setName(event.target.value);
  }

  function onPhoneNoHandler(event) {
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(event.target.value)) {
      setPhoneNo(event.target.value);
    }
  }

  function onCloseHandler() {
    setName("");
    setPhoneNo("");
    setResultMsg("");
  }

  useEffect(() => {}, []);

  function onSearchHandler(event) {
    const submitInfo = { name, phoneNo };
    let submitUrl = "http://localhost:9999/passgym/user/searchid";
    setShowResultMsg(true);
    axios
      .post(submitUrl, submitInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setResultMsg(`아이디는 "${response.data.msg}" 입니다.`);
          console.log(response.data);
        } else {
          setResultMsg(`아이디를 찾을 수 없습니다.`);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error" + error);
          alert(error.response.status);
        }
      });

    event.preventDefault();
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          아이디(이메일) 찾기
        </Modal.Title>
        <Button
          onClick={() => {
            props.onHide();
            onCloseHandler();
          }}
          variant="outline-dark"
        >
          닫기
        </Button>
      </Modal.Header>
      <Modal.Body>
        {/* <Container> */}
        {/* <Row> */}
        <Form.Group className="mb-3" controlId="findByName">
          <Form.Control
            placeholder="이름"
            name="name"
            onChange={onNameHandler}
            value={name}
            required
          />
        </Form.Group>
        {/* </Row>
          <Row> */}
        <Form.Group className="mb-3" controlId="findByPhoneNo">
          <Form.Control
            placeholder="등록된 휴대전화번호('-'를 제외하고 입력)"
            type="text"
            name="phoneNo"
            onChange={onPhoneNoHandler}
            value={phoneNo}
            required
          />
        </Form.Group>
        {/* </Row> */}
        {/* </Container> */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="searchbtn"
          onClick={onSearchHandler}
          variant="outline-dark"
        >
          검색
        </Button>
        <div className="resultdiv">
          <p className="resultcontext">{resultMsg}</p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchIdModal;
