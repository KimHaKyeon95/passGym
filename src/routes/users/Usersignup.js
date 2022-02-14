import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";

function Usersignup() {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdChk, setPwdChk] = React.useState("");
  const [name, setName] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [phoneNoVarifCode, setPhoneNoVarifCode] = React.useState("");
  const [zipcode, setZipCode] = React.useState("");
  const [addr1, setAddr1] = React.useState("");
  const [addr2, setAddr2] = React.useState(""); //상세주소

  function onIdHandler(event) {
    setId(event.target.value);
  }

  function onIdDupChk() {}

  function onPwdHandler(event) {
    setPwd(event.target.value);
  }

  function onPwdChkHandler(event) {
    setPwdChk(event.target.value);
  }

  function onNameHandler(event) {
    setName(event.target.value);
  }

  function onPhoneNoHandler(event) {
    setPhoneNo(event.tartget.value);
  }

  function onPhoneNoVarifHandler() {}

  function onPhoneNoVarifCodeHandler(event) {
    setPhoneNoVarifCode(event.target.value);
  }

  function onSubmitHandler(event) {
    const submitInfo = Object.assign(signupInfo);
    let submitUrl = "http://localhost:3001/usersignup/singup";
    event.preventDefault();

    if (pwd !== pwdChk) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let signupInfo = {
      id,
      pwd,
      name,
      phoneNo,
      zipcode,
      addr1,
      addr2,
    };
  }

  // 카카오 우편번호 API----------------
  const [isOpenPost, setIsOpenPost] = React.useState(false);

  function onChangeOpenPost() {
    setIsOpenPost(!isOpenPost);
  }

  function onCompletePost(data) {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      // if (data.buildingName !== "") {
      //   extraAddr +=
      //     extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      // }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setZipCode(data.zonecode);
    setAddr1(fullAddr);
    setAddr2(extraAddr);
    setIsOpenPost(false);
  }

  return (
    <div>
      <div className="usersignup">
        <Form className="usersignup__form" onSubmit={onSubmitHandler}>
          <h1>사용자 회원가입</h1>
          <div className="usersignup__id">
            <Form.Group
              className="usersignup__idemail"
              controlId="usersignup__idemail"
            >
              <Form.Control
                name="id"
                onChange={onIdHandler}
                value={id}
                type="email"
                placeholder="아이디(이메일)"
              />
            </Form.Group>
            <Button onClick={onIdDupChk} className="usersignup__iddupchkbtn">
              아이디 중복확인
            </Button>
          </div>
          <Form.Group className="usersignup__pwd" controlId="usersignup__pwd">
            <Form.Control
              name="pwd"
              onChange={onPwdHandler}
              value={pwd}
              type="password"
              placeholder="비밀번호"
            />
          </Form.Group>
          <Form.Group
            className="usersignup__pwdChk"
            controlId="usersignup__pwdChk"
          >
            <Form.Control
              name="pwdChk"
              onChange={onPwdChkHandler}
              value={pwdChk}
              type="password"
              placeholder="비밀번호 확인"
            />
          </Form.Group>
          <Form.Group className="usersignup__name" controlId="usersignup__name">
            <Form.Control
              name="name"
              onChange={onNameHandler}
              value={name}
              placeholder="이름"
            />
          </Form.Group>
          <div className="usersignup__phone">
            <Form.Group
              className="usersignup__phoneNo"
              controlId="usersignup__phoneNo"
            >
              <Form.Control
                name="phoneNo"
                onChange={onPhoneNoHandler}
                value={phoneNo}
                type="password"
                placeholder="휴대전화번호"
              />
            </Form.Group>
            <Button
              onClick={onPhoneNoVarifHandler}
              className="usersignup__phonenovarifbtn"
            >
              휴대전화번호 인증
            </Button>
            <Form.Group
              className="usersignup__phoneNoVarifCode"
              controlId="usersignup__phoneNoVarifCode"
            >
              <Form.Control
                name="phoneNoVarifCode"
                onChange={onPhoneNoVarifCodeHandler}
                value={phoneNoVarifCode}
                type="number"
                placeholder="인증번호"
              />
            </Form.Group>
          </div>
          <>
            {isOpenPost ? (
              <DaumPostcode autoClose onComplete={onCompletePost} />
            ) : null}
          </>
          <div className="usersignup__address">
            <Form.Group
              className="usersignup__zipcode"
              controlId="usersignup__zipcode"
            >
              <Form.Control
                value={zipcode}
                placeholder="우편번호"
                readOnly
                required
              />
            </Form.Group>
            <Button
              // onClick={}
              className="usersignup__zipcodebtn"
            >
              검색
            </Button>
            <Form.Group
              className="usersignup__addr1"
              controlId="usersignup__addr1"
            >
              <Form.Control
                value={addr1}
                placeholder="주소"
                readOnly
                required
              />
            </Form.Group>
            <Form.Group
              className="usersignup__addr2"
              controlId="usersignup__addr2"
            >
              <Form.Control value={addr2} placeholder="상세주소" />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            회원가입
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Usersignup;
