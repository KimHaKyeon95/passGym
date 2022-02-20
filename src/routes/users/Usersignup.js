import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import PostcodeModal from "../../components/owener/PostcodeModal";
import HorizonLine from "../common/HorizonLine";
import kakao from "../../images/kakao.png";
import naver from "../../images/naver.png";
import "../css/Usersignup.css";

function Usersignup() {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdChk, setPwdChk] = React.useState("");
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
    idChkResult: 0,
    idDupChkResult: 0,
    pwdChkResult: 0,
  });

  const [idRegexChkResult, setIdRegexChkResult] = React.useState({
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
    setIdRegexChkResult({ result: regex.test(value) });
    return regex.test(value);
  }

  function onIdHandler(event) {
    const value = event.target.value;
    setId(value);
    const nextResult = {
      result: onIdRegexChkHandler(value),
      resultMsg: "",
    };

    if (!nextResult.result) {
      setIdRegexChkResult({ resultMsg: "아이디를 이메일형식으로 입력하세요." });
      setResults({ ...chkResults, idChkResult: 0 });
      setIdChkMsg({ msg: "" });
      // setResults({ ...chkResults, idDupChkResult: 0 });
    } else {
      if (response.id === value) {
        setIdChkMsg({ msg: "이미 존재하는 아이디입니다." });
        setResults({ ...chkResults, idDupChkResult: 0 });
      } else {
        setIdChkMsg({ msg: "사용가능한 아이디입니다." });
        setResults({ ...chkResults, idDupChkResult: 1 });
      }
    }
  }

  //테스트
  let response = {
    id: "id1@naver.com",
  };

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
    const value = event.target.value;
    setPwd(value);
    const nextResult = {
      result: onPwdRegexChkHandler(value),
      resultMsg: "",
    };
    console.log("result:", nextResult.result);
    if (!nextResult.result) {
      setPwdChkResult({
        resultMsg: "8~10자리 숫자와 영어 조합으로 입력하세요.",
      });
      setPwdChkMsg({ msg: "" });
      setResults({ ...chkResults, pwdChkResult: 0 });
    } else {
      setPwdChkResult({
        resultMsg: "",
      });
      setPwdChkMsg({ msg: "" });
    }
  }

  function onPwdChkHandler(event) {
    const value = event.target.value;
    const nextResult = {
      result: onPwdRegexChkHandler(value),
      resultMsg: "",
    };
    setPwdChk(value);
    if (!nextResult) {
      setPwdChkResult({
        resultMsg: "8~10자리 숫자와 영어 조합으로 입력하세요.",
      });
    } else {
      if (value === "") {
        setPwdChkMsg({ msg: "비밀번호를 입력하세요." });
      } else if (value != pwd) {
        setPwdChkMsg({ msg: "비밀번호가 일치하지 않습니다." });
      } else {
        setPwdChkMsg({ msg: "비밀번호가 일치합니다." });
        setResults({ ...chkResults, pwdChkResult: 1 });
      }
    }
    if (nextResult.result && pwd === pwdChk) {
      setResults({ chkResults, pwdChkResult: 1 });
    } else {
      setResults({ chkResults, pwdChkResult: 0 });
    }
  }

  function onNameHandler(event) {
    setName(event.target.value);
  }

  function onPhoneNoHandler(event) {
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(event.target.value)) {
      setPhoneNo(event.target.value);
    }
  }

  //번호 사이에 자동 하이픈'-' 넣기
  // React.useEffect(() => {
  //   if (phoneNo.length === 10) {
  //     setPhoneNo(phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
  //   }
  //   // if(phoneNo.length === 11){
  //   //   setPhoneNo(phoneNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
  //   // }
  //   if (phoneNo.length === 13) {
  //     setPhoneNo(
  //       phoneNo.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
  //     );
  //   }
  // });

  function onPhoneNoVarifHandler() {}

  function onPhoneNoVarifCodeHandler(event) {
    const regex = /^[0-9]{0,10}$/;
    if (regex.test(event.target.value)) {
      setPhoneNoVarifCode(event.target.value);
    }
  }

  function onSubmitHandler(event) {
    const submitInfo = Object.assign(id, pwd, name, phoneNo, address);
    const forSubmitConfirm = Object.assign(
      chkResults.idChkResult,
      chkResults.idDupChkResult,
      chkResults.pwdChkResult
    );
    let submitUrl = "http://localhost:3000/usersignup/signup";
    if (forSubmitConfirm === 1) {
      axios.post(submitUrl, submitInfo);
    } else {
      alert("가입 실패하였습니다.");
      event.preventDefault();
    }
  }

  return (
    <div>
      <div className="usersignup">
        <Form className="usersignup__form">
          <h1 className="h1__title">사용자 회원가입</h1>
          <div className="usersignup__id">
            <Form.Group
              className="usersignup__email"
              controlId="usersignup__email"
            >
              <Form.Control
                name="id"
                onChange={onIdHandler}
                value={id}
                placeholder="아이디(이메일)"
                size="lg"
              />
              <div className="msg">{idRegexChkResult.resultMsg}</div>
              <div className="msg">{idChkMsg.msg}</div>
            </Form.Group>
          </div>
          <div className="usersignup__password">
            <Form.Group className="usersignup__pwd" controlId="usersignup__pwd">
              <Form.Control
                name="pwd"
                onChange={onPwdHandler}
                value={pwd}
                type="password"
                placeholder="비밀번호"
                required
                size="lg"
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
                required
                size="lg"
              />
            </Form.Group>
            <div className="msg">{pwdChkResult.resultMsg}</div>
            <div className="msg">{pwdChkMsg.msg}</div>
          </div>
          <Form.Group className="usersignup__name" controlId="usersignup__name">
            <Form.Control
              name="name"
              onChange={onNameHandler}
              value={name}
              placeholder="이름"
              required
              size="lg"
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
                type="text"
                placeholder="휴대전화번호"
                size="lg"
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
                size="lg"
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
                size="lg"
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
                size="lg"
              />
            </Form.Group>
            <Form.Group
              className="usersignup__addr2"
              controlId="usersignup__addr2"
            >
              <Form.Control
                value={address.addr2}
                placeholder="상세주소"
                size="lg"
              />
            </Form.Group>
          </div>
          <Button
            className="usersignup__submitBtn"
            variant="outline-dark"
            type="submit"
            onSubmit={onSubmitHandler}
          >
            회원가입
          </Button>
          <HorizonLine text="SNS 회원가입"></HorizonLine>
          <Button className="snsBtn" variant="link">
            <img src={kakao} />
          </Button>
          <Button className="snsBtn" variant="link">
            <img src={naver} />
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Usersignup;
