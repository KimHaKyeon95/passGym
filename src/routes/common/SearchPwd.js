import React from "react";
import { axios } from "axios";
import { Form, Button } from "react-bootstrap";

function SearchPwd() {
  const [id, setId] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");

  function onIdHandler(event) {
    setId(event.target.value);
  }

  function onPhoneNoHandler(event) {
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(event.target.value)) {
      setPhoneNo(event.target.value);
    }
  }

  //테스트
  let response = {
    id: "id1@naver.com",
    pwd: "1qaz2wsx",
    name: "패스짐",
    phoneNo: "01012345678",
  };

  function onSearchHandler(event) {
    const submitInfo = Object.assign(id, phoneNo);
    console.log(submitInfo);
    let submitUrl = "http://localhost:3000/searchidpwd/findid";
    if (response.id === submitInfo.id) {
      if (response.phoneNo === submitInfo.phoneNo) {
        axios
          .post(submitUrl, submitInfo)
          .then(() => {
            alert(`비밀번호는 "${response.password}" 입니다.`);
          })
          .cath((error) => {
            if (error.response) {
              alert(error.response.status);
              event.preventDefault();
            }
          });
      } else {
        alert("아이디를 찾을 수 없습니다.");
      }
    } else {
      alert("아이디를 찾을 수 없습니다.");
    }
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="Id">
          <Form.Control
            name="id"
            onChange={onIdHandler}
            value={id}
            placeholder="아이디(이메일)"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNo">
          <Form.Control
            name="phoneNo"
            onChange={onPhoneNoHandler}
            value={phoneNo}
            placeholder="등록된 휴대전화번호"
            required
          />
        </Form.Group>
        <Button className="resetbtn" onClick={onSearchHandler} type="submit">
          검색
        </Button>
      </Form>
    </div>
  );
}

export default SearchPwd;
