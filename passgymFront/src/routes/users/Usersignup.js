import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import PostcodeModal from "../../components/owner/PostcodeModal";
import "../../css/user/usersignup.css";

function Usersignup() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdChk, setPwdChk] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState({
    zipcode: "",
    addr: "",
  });
  const [addrDetail, setAddrDetail] = useState("");
  const navigate = useNavigate();
  const [postcodeModalShow, setPostcodeModalShow] = useState(false);

  const [chkResults, setResults] = useState({
    idChkResult: 0,
    idDupChkResult: 0,
    pwdChkResult: 0,
  });

  const [idRegexChkResult, setIdRegexChkResult] = useState({
    result: false,
    resultMsg: "",
  });

  const [idChkMsg, setIdChkMsg] = useState({
    msg: "",
  });

  const [pwdChkResult, setPwdChkResult] = useState({
    result: false,
    resultMsg: "",
  });

  const [pwdChkMsg, setPwdChkMsg] = useState({
    msg: "",
  });

  const onIdRegexChkHandler = (value) => {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setIdRegexChkResult({ result: regex.test(value) });
    return regex.test(value);
  };

  const onIdHandler = (event) => {
    setId(event.target.value);
  };

  let idDupChkUrl = "http://localhost:9999/passgym/user/iddupchk";

  const onIdDupChkHandler = () => {
    const nextResult = {
      result: onIdRegexChkHandler(id),
      resultMsg: "",
    };

    if (!nextResult.result) {
      setIdRegexChkResult({ resultMsg: "아이디를 이메일형식으로 입력하세요." });
      setResults({ ...chkResults, idChkResult: 0 });
      setIdChkMsg({ msg: "" });
      setResults({ ...chkResults, idDupChkResult: 0 });
    } else {
      setResults({ ...chkResults, idChkResult: 1 });
      axios
        .get(idDupChkUrl, { params: { id: id } })
        .then((response) => {
          if (response.data.status === 0) {
            setIdChkMsg({ msg: "이미 사용중인 아이디입니다." });
            setResults({ ...chkResults, idDupChkResult: 0 });
          } else {
            setIdChkMsg({ msg: "사용가능한 아이디입니다." });
            setResults({ ...chkResults, idDupChkResult: 1 });
          }
        })
        .catch((error) => {
          alert(error.response.status);
        });
    }
  };

  //비밀번호 형식 체크
  const onPwdRegexChkHandler = (value) => {
    //8~10자 영문, 숫자 조합
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    //형식에 맞는 경우 true 리턴
    setPwdChkResult({ result: regex.test(value) });
    return regex.test(value);
  };

  //비밀번호 실시간 체크
  const onPwdHandler = (event) => {
    const value = event.target.value;
    setPwd(value);
    const nextResult = {
      result: onPwdRegexChkHandler(value),
      resultMsg: "",
    };
    if (value == null) {
      setPwdChkMsg({ msg: "비밀번호를 입력하세요" });
    }
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
  };

  const onPwdChkHandler = (event) => {
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
    if (nextResult.result && pwd === value) {
      setResults({ chkResults, pwdChkResult: 1 });
    } else {
      setResults({ chkResults, pwdChkResult: 0 });
    }
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onPhoneNoHandler = (event) => {
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(event.target.value)) {
      setPhoneNo(event.target.value);
    }
  };

  const onAddrDetailHandler = (event) => {
    setAddrDetail(event.target.value);
  };

  const onSubmitHandler = (event) => {
    const submitInfo = {
      id: id,
      pwd: pwd,
      name: name,
      phoneNo: phoneNo,
      zipcode: address.zipcode,
      addr: address.addr,
      addrDetail: addrDetail,
    };

    let submitUrl = "http://localhost:9999/passgym/user/";
    if (
      (chkResults.idChkResult,
      chkResults.idDupChkResult,
      chkResults.pwdChkResult === 1)
    ) {
      axios
        .post(submitUrl, submitInfo, { withCredentials: true })
        .then(() => {
          console.log(submitInfo);
          alert("가입 성공하였습니다.");
          navigate("/login");
          navigate(0);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.status);
          }
        });
    } else {
      alert("가입 실패하였습니다.");
    }
    event.preventDefault();
  };

  return (
    <div>
      <div className="usersignup">
        <Form className="usersignup__form">
          <h1 className="h1__title">사용자 회원가입</h1>
          <div className="usersignup__id">
            <InputGroup className="mb-3 usersignup__email">
              <Form.Control
                name="id"
                aria-label="Recipient's username"
                aria-describedby="basic-addon"
                onChange={onIdHandler}
                value={id}
                placeholder="아이디(이메일)"
              />

              <Button
                className="usersignup__idDupChkBtn"
                id="button-addon"
                onClick={onIdDupChkHandler}
                variant="outline-dark"
              >
                중복확인
              </Button>
            </InputGroup>
            <Form.Text className="text-muted msg">
              {idRegexChkResult.resultMsg}
            </Form.Text>
            <Form.Text className="text-muted msg">{idChkMsg.msg}</Form.Text>
          </div>

          <div className="usersignup__password">
            <Form.Group
              className="mb-3 usersignup__pwd"
              controlId="usersignup__pwd"
            >
              <Form.Control
                name="pwd"
                onChange={onPwdHandler}
                value={pwd}
                type="password"
                placeholder="비밀번호"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 usersignup__pwdChk"
              controlId="usersignup__pwdChk"
            >
              <Form.Control
                name="pwdChk"
                onChange={onPwdChkHandler}
                value={pwdChk}
                type="password"
                placeholder="비밀번호 확인"
                required
              />
            </Form.Group>
            <Form.Text className="text-muted msg">
              {pwdChkResult.resultMsg}
            </Form.Text>
            <Form.Text className="text-muted msg">{pwdChkMsg.msg}</Form.Text>
          </div>
          <Form.Group
            className="mb-3 usersignup__name"
            controlId="usersignup__name"
          >
            <Form.Control
              name="name"
              onChange={onNameHandler}
              value={name}
              placeholder="이름"
              required
            />
          </Form.Group>
          <div className="usersignup__phone">
            <InputGroup
              className="mb-3 usersignup__phoneNo"
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            >
              <Form.Control
                name="phoneNo"
                onChange={onPhoneNoHandler}
                value={phoneNo}
                placeholder="휴대전화번호"
              />
            </InputGroup>
          </div>
          <div className="usersignup__address">
            <InputGroup className="mb-3 usersignup__zipcode">
              <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={address.zipcode}
                placeholder="우편번호"
                readOnly
                required
              />
              <PostcodeModal
                show={postcodeModalShow}
                onHide={() => {
                  setPostcodeModalShow(false);
                }}
                setValues={setAddress}
              />
              <Button
                className="usersignup__zipcodebtn"
                id="button-addon2"
                onClick={() => setPostcodeModalShow(true)}
                variant="outline-dark"
              >
                검색
              </Button>
            </InputGroup>
            <Form.Group
              className="mb-3 usersignup__addr"
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
              className="mb-3 usersignup__addrDetail"
              controlId="usersignup__addrDetail"
            >
              <Form.Control
                value={addrDetail}
                placeholder="상세주소"
                onChange={onAddrDetailHandler}
              />
            </Form.Group>
          </div>
          <Button
            className="usersignup__submitBtn"
            variant="outline-dark"
            type="submit"
            onClick={onSubmitHandler}
          >
            회원가입
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Usersignup;
