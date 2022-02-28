import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import "../css/login.css";
// import { KAKAO_AUTH_URL } from "./Oauth";
import HorizonLine from "../../components/common/HorizonLine";
// import kakao from "../../images/kakao.png";
// import naver from "../../images/naver.png";

function Login() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "사용자", value: "1" },
    { name: "사업자", value: "2" },
  ];
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  // const [submit, setSubmit] = useState(false);
  // const [error, setErrors] = useState({});
  const navigate = useNavigate();

  function onRadioChkHandler(event) {
    setRadioValue(event.currentTarget.value);
  }

  function onIdHandler(event) {
    setId(event.target.value);
  }

  function onPwdHandler(event) {
    setPwd(event.target.value);
  }

  // useEffect(() => {
  //   if (localStorage.id !== undefined) {
  //     setId(localStorage.id);
  //     setIsRemember(true);
  //   }
  // });

  function onCheckHandler(event) {
    const nextIsRememberValue = event.target.checked;

    setIsRemember(nextIsRememberValue);

    if (nextIsRememberValue) {
      console.log("isRemeberValue true");
      window.localStorage.setItem("id", id);
    } else {
      console.log("isRemeberValue false");
      window.localStorage.removeItem("id", id);
    }
  }

  // useEffect(() => {
  //   id;
  // });

  function onSubmitHandler(event) {
    console.log("login button clicked");
    console.log(radioValue);
    const submitInfo = { id, pwd };
    // console.log(submitInfo);
    let userSubmitUrl = "http://localhost:9999/passgym/user/login";
    // let ownerSubmitUrl = "http://localhost:9999/ownerlogin/login";
    if (radioValue == 1) {
      axios
        .post(userSubmitUrl, submitInfo)
        .then((response) => {
          if (response.data.status == 1) {
            // console.log(response.data);
            sessionStorage.setItem("user", response.data.user);
            navigate("/");
            navigate(0); //새로고침
            alert("로그인 성공하였습니다.");
          } else {
            alert("로그인 실패하였습니다.");
          }
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.status);
          }
        });
    } else if (radioValue == 2) {
      // console.log("사업자 로그인");
      //   axios
      //     .post(ownerSubmitUrl, submitInfo)
      //     .then()
      //     .catch((error) => {
      //       if (error.response) {
      //         alert(error.response.status);
      //       }
      //     });
    } else {
      alert("로그인에 실패하였습니다.");
    }
    event.preventDefault();
  }

  return (
    <div>
      <div className="login">
        <Form className="login__form">
          <>
            <ButtonGroup className="radioBtn">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-dark" : "outline-dark"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={onRadioChkHandler}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br />
          </>
          <div className="login__input">
            <Form.Group className="mb-3 login__id" controlId="login__id">
              <Form.Control
                name="id"
                onChange={onIdHandler}
                value={id}
                type="email"
                placeholder="아이디(이메일)"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 login__pwd" controlId="login__pwd">
              <Form.Control
                name="pwd"
                onChange={onPwdHandler}
                value={pwd}
                type="password"
                placeholder="비밀번호"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="아이디 저장"
                onChange={onCheckHandler}
                checked={isRemember}
              />
            </Form.Group>
            <Button
              className="login__submitBtn"
              variant="outline-dark"
              type="submit"
              onClick={onSubmitHandler}
            >
              로그인
            </Button>
            <Link to="../searchidpwd">
              <Button className="login__findBtn" variant="link">
                이메일/비밀번호 찾기
              </Button>
            </Link>
            {/* <HorizonLine text="SNS 로그인"></HorizonLine>
            <Button
              // href={KAKAO_AUTH_URL}
              className="snsBtn"
              variant="link"
            >
              <img src={kakao} />
            </Button>
            <Button className="snsBtn" variant="link">
              <img src={naver} />
            </Button> */}
            <HorizonLine text="회원가입"></HorizonLine>
            <Link to="../usersignup">
              <Button className="login__usersignupBtn" variant="outline-dark">
                사용자 회원가입
              </Button>
            </Link>
            <Link to="../ownersignup">
              <Button className="login__ownersignupBtn" variant="outline-dark">
                사업자 회원가입
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
