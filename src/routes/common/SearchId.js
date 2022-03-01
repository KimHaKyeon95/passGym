import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "../../css/user/searchidpwd.css";

function SearchId() {
  const [name, setName] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  // const [nameRegexChkResult, setNameRegexChkResult] = React.useState({
  //   result: false,
  //   resultMsg: "",
  // });

  // function onNameRegexChkHandler(value) {
  //   const regex = /^[ㄱ-ㅎ|가-힣|]+$/;
  //   setNameRegexChkResult(result:regex.response(value));
  //   return regex.response(value);
  // }

  function onNameHandler(event) {
    setName(event.target.value);
    console.log(name);
  }

  function onPhoneNoHandler(event) {
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(event.target.value)) {
      setPhoneNo(event.target.value);
    }
  }

  const nextValue = {
    name,
    phoneNo,
  };

  function onSearchHandler(event) {
    const submitInfo = nextValue;
    console.log(submitInfo);
    event.preventDefault();
    let submitUrl = "http://localhost:9999/passgym/user/searchid";
    axios
      .post(submitUrl, submitInfo)
      .then((response) => {
        console.log(response);
        alert(`아이디는 "${response.data.msg}" 입니다.`);
        event.preventDefault();
      })
      .cath((error) => {
        if (error.response) {
          console.log("error" + error);
          alert(error.response.status);
          event.preventDefault();
        }
      });
  }

  return (
    <div className="container">
      <Form className="form">
        <Form.Group className="mb-3" controlId="findByName">
          <Form.Control
            name="name"
            onChange={onNameHandler}
            value={name}
            placeholder="이름"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="findByPhoneNo">
          <Form.Control
            name="phoneNo"
            onChange={onPhoneNoHandler}
            value={phoneNo}
            type="text"
            placeholder="등록된 휴대전화번호"
            required
          />
        </Form.Group>
        <Button
          className="searchbutton"
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

export default SearchId;
