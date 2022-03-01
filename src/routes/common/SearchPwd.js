import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "../../css/user/searchidpwd.css";

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

  function onSearchHandler(event) {
    const submitInfo = { id, phoneNo };
    console.log(submitInfo);
    event.preventDefault();
    let submitUrl = "http://localhost:9999/passgym/user/searchpwd";

    axios
      .post(submitUrl, submitInfo)
      .then((response) => {
        event.preventDefault();
        console.log(response);
        alert(`비밀번호는 "${response.data.msg}" 입니다.`);
      })
      .cath((error) => {
        if (error.response) {
          alert(error.response.status);
          event.preventDefault();
        }
      });
    event.preventDefault();
  }

  return (
    <div className="container">
      <Form className="form">
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
        <Button
          className="button"
          onClick={onSearchHandler}
          type="submit"
          variant="outline-dark"
        >
          검색
        </Button>
      </Form>
    </div>
  );
}

export default SearchPwd;
