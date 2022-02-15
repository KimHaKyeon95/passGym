import React from "react";
import axios from "axios";
import "../css/Usersignup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import PostcodeModal from "../../components/owener/PostcodeModal";

function Usersignup() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState({
    pwd: "",
    pwdChk: "",
  });
  const [name, setName] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [phoneNoVarifCode, setPhoneNoVarifCode] = React.useState("");
  const [address, setAddress] = React.useState({
    zipCode: "",
    addr: "",
    addr2: "",
  });
  const [postcodeModalShow, setPostcodeModalShow] = React.useState(false);

  const [chkResults, setResults] = React.useState({
    idDupChkResult: 0,
    pwdChkResult: 0,
  });

  const [idChkResult, setIdChkResult] = React.useState({
    result: false,
    resultMsg: "",
  });

  const [idChkMsg, setIdChkMsg] = React.useState({
    msg: "",
  });

  const [pwdChkResult, setPwdChkResult] = React.useState({
    result: false,
    resultMsg: "",
  });

  const [pwdChkMsg, setPwdChkMsg] = React.useState({
    msg: "비밀번호를 입력하세요",
  });

  function onIdRegexChkHandler(value) {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setIdChkResult({ result: regex.test(value) });
    return regex.test(value);
  }

  function onIdHandler(event) {
    const { name, value } = event.target;
    const nextValues = {
      ...id,
      [name]: value,
    };
    setId(nextValues.id);
    // console.log(nextValues.id);
  }

  //테스트
  let response = {
    id: "id1@naver.com",
  };

  function onIdDupChk(event) {
    if (!idChkResult.result) {
      setIdChkResult({ resultMsg: "아이디를 이메일형식으로 입력하세요." });
    }
    if (response.id === id) {
      setIdChkMsg({ msg: "이미 존재하는 아이디입니다." });
      setResults({ ...chkResults, idDupChkResult: 0 });
    } else {
      setIdChkMsg({ msg: "사용가능한 아이디입니다." });
      setResults({ ...chkResults, idDupChkResult: 1 });
    }
  }

  //비밀번호 형식 체크
  function onPwdRegexChkHandler(value) {
    //8~10자 영문, 숫자 조합
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    //형식에 맞는 경우 true 리턴
    setPwdChkResult({ result: regex.test(value) });
    return regex.test(value);
  }

  //비밀번호 실시간 체크
  function onPwdHandler(event) {
    const { name, value } = event.target;
    const nextValues = {
      ...password,
      [name]: value,
    };
    setPassword(nextValues);

    const nextResult = {
      result: onPwdRegexChkHandler(value),
      resultMsg: "",
    };
    if (!nextResult.result) {
      setPwdChkResult({
        resultMsg: "8~10자리 숫자와 영어 조합으로 입력하세요.",
      });
      setResults({ ...chkResults, pwdChkResult: 0 });
    }
    if (name === "pwd") {
      if (value === "") {
        // console.log("비밀번호 입력안함:", value);
        setPwdChkMsg({ msg: "비밀번호를 입력하세요." });
      } else if (value != nextValues.pwdChk) {
        // console.log("비밀번호 일치안함:", value);
        setPwdChkMsg({ msg: "비밀번호가 일치하지 않습니다." });
      } else {
        // console.log("비밀번호 일치함:", value);
        setPwdChkMsg({ msg: "비밀번호가 일치합니다." });
        setResults({ ...chkResults, pwdChkResult: 1 });
      }
    }
    if (name === "pwdChk") {
      if (value === "") {
        // console.log("비밀번호 입력안함:", value);
        setPwdChkMsg({ msg: "비밀번호를 입력하세요." });
      } else if (value != nextValues.pwdChk) {
        // console.log("비밀번호 일치안함:", value);
        setPwdChkMsg({ msg: "비밀번호가 일치하지 않습니다." });
      } else {
        // console.log("비밀번호 일치함:", value);
        setPwdChkMsg({ msg: "비밀번호가 일치합니다." });
        setResults({ ...chkResults, pwdChkResult: 1 });
      }
    }
    if (nextResult.result && nextValues.pwd === nextValues.pwdChk) {
      setResults({ chkResults, pwdChkResult: 1 });
    } else {
      setResults({ chkResults, pwdChkResult: 0 });
    }
  }

  function onNameHandler(event) {
    setName(event.target.value);
  }

  function onPhoneNoHandler(event) {
    console.log(event);
    const regex = /^[0-9\b -]{0, 13}$/;
    if (!regex.test(event.target.value)) {
      console.log("if", regex.test(event.target.value));
      setPhoneNo(event.target.value);
    }
  }

  //번호 사이에 자동 하이픈'-' 넣기
  React.useEffect(() => {
    if (phoneNo.length === 10) {
      setPhoneNo(phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    // if(phoneNo.length === 11){
    //   setPhoneNo(phoneNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    // }
    if (phoneNo.length === 13) {
      setPhoneNo(
        phoneNo.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  });

  function onPhoneNoVarifHandler() {}

  function onPhoneNoVarifCodeHandler(event) {
    const regex = /^[0-9]{0,10}$/;
    if (regex.test(event.target.value)) {
      setPhoneNoVarifCode(event.target.value);
    }
  }

  function onSubmitHandler(event) {
    const submitInfo = Object.assign(id, password, name, phoneNo, address);
    // const forSubmitConfirm = Object.assign(chkResults);
    let submitUrl = "http://localhost:3001/usersignup/singup";
    if (chkResults.idDupChkResult === 1 && chkResults.pwdChkResult === 1) {
      axios.post(submitUrl, submitInfo);
    } else {
      alert("가입 실패하였습니다.");
    }
    event.preventDefault();

    let signupInfo = {
      id,
      //pwd,
      name,
      phoneNo,
      // address.zipcode,
      // address.addr1,
      // address.addr2,
    };
  }

  return (
    <div>
      <div className="usersignup">
        <Form className="usersignup__form">
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
                // type="email"
                placeholder="아이디(이메일)"
              />
              <div className="msg">{idChkMsg.msg}</div>
              <div className="msg">{idChkResult.resultMsg}</div>
            </Form.Group>
            <Button onClick={onIdDupChk} className="usersignup__iddupchkbtn">
              아이디 중복확인
            </Button>
          </div>
          <div className="usersignup__password">
            <Form.Group className="usersignup__pwd" controlId="usersignup__pwd">
              <Form.Control
                name="pwd"
                onChange={onPwdHandler}
                value={password.pwd}
                type="password"
                placeholder="비밀번호"
                required
              />
            </Form.Group>
            <Form.Group
              className="usersignup__pwdChk"
              controlId="usersignup__pwdChk"
            >
              <Form.Control
                name="pwdChk"
                onChange={onPwdHandler}
                value={password.pwdChk}
                type="password"
                placeholder="비밀번호 확인"
                required
              />
              <div className="msg">{pwdChkMsg.msg}</div>
              <div className="msg">{pwdChkResult.resultMsg}</div>
            </Form.Group>
          </div>
          <Form.Group className="usersignup__name" controlId="usersignup__name">
            <Form.Control
              name="name"
              onChange={onNameHandler}
              value={name}
              placeholder="이름"
              required
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
                placeholder="휴대전화번호"
              />
            </Form.Group>
            <Button
              onClick={onPhoneNoVarifHandler}
              className="usersignup__phonenovarifbtn"
            >
              인증
            </Button>
            <Form.Group
              className="usersignup__phoneNoVarifCode"
              controlId="usersignup__phoneNoVarifCode"
            >
              <Form.Control
                name="phoneNoVarifCode"
                onChange={onPhoneNoVarifCodeHandler}
                value={phoneNoVarifCode}
                placeholder="인증번호"
              />
            </Form.Group>
          </div>
          <div className="usersignup__address">
            <Form.Group
              className="usersignup__zipcode"
              controlId="usersignup__zipcode"
            >
              <Form.Control
                value={address.zipCode}
                placeholder="우편번호"
                readOnly
                required
              />
            </Form.Group>
            <PostcodeModal
              show={postcodeModalShow}
              onHide={() => {
                setPostcodeModalShow(false);
              }}
              setValues={setAddress}
            />
            <Button
              className="usersignup__zipcodebtn"
              onClick={() => setPostcodeModalShow(true)}
              variant="primary"
            >
              검색
            </Button>
            <Form.Group
              className="usersignup__addr"
              controlId="usersignup__addr"
            >
              <Form.Control
                value={address.addr}
                placeholder="주소"
                readOnly
                required
              />
            </Form.Group>
            <Form.Group
              className="usersignup__addr2"
              controlId="usersignup__addr2"
            >
              <Form.Control value={address.addr2} placeholder="상세주소" />
            </Form.Group>
          </div>
          <Button
            className="usersignup__submitBtn"
            variant="primary"
            type="submit"
            onSubmit={onSubmitHandler}
          >
            회원가입
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Usersignup;
