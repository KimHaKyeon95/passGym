import React from "react";
import { Form, Button } from "react-bootstrap";
import { axios } from "axios";

function FindId() {
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
    setPhoneNo(event.target.value);
    console.log(phoneNo);
  }

  //테스트
  let response = {
    id: "id1@naver.com",
    name: "패스짐",
    phoneNo: "01012345678",
  };

  function onSearchHandler(event) {
    const submitInfo = Object.assign(name, phoneNo);
    console.log(submitInfo);
    let submitUrl = "http://localhost:3000/searchidpwd/findid";
    if (response.name === submitInfo.name) {
      if (response.phoneNo === submitInfo.phoneNo) {
        axios
          .post(submitUrl, submitInfo)
          .then(() => {
            alert(`아이디는 "${response.id}" 입니다.`);
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
        <Form.Group className="findByName" controlId="findByName">
          <Form.Control
            name="name"
            onChange={onNameHandler}
            value={name}
            placeholder="이름"
            required
          />
          {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
        </Form.Group>

        <Form.Group className="findByPhoneNo" controlId="findByPhoneNo">
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
          className="searchbtn"
          onClick={onSearchHandler}
          type="submit"
          sytle={{ width: "100%" }}
        >
          검색
        </Button>
      </Form>
    </div>
  );
}

export default FindId;
