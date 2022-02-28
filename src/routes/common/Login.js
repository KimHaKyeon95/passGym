import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import "../../css/owner/login.css";
import HorizonLine from "./HorizonLine";


function Login() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "사용자", value: "1" },
    { name: "사업자", value: "2" },
  ];
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const [submit, setSubmit] = useState(false);
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

  //테스트
  let response = {
    id: "id1@naver.com",
    pwd: "p1",
  };

  //이거 때문에 id의 value가 ""으로 설정되어 아이디가 입력되지 않는 현상이 발생
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
    }
  }

  function onSubmitHandler(event) {
    console.log("login button clicked");
    const submitInfo = { id, pwd };
    let userSubmitUrl = "http://localhost:3000/userlogin/login";
    let ownerSubmitUrl = "http://localhost:8082/passgym/owner/login";
    if (radioValue == 1) {
      if (response.id === submitInfo.id) {
        console.log("사용자 로그인");
        sessionStorage.setItem("id", submitInfo.id);
        navigate("/");
        // axios
        //   .post(userSubmitUrl, submitInfo)
        //   .then(() => {
        //     sessionStorage.setItem("id", submitInfo.id);
        //     navigate("/");
        //   })
        //   .catch((error) => {
        //     if (error.response) {
        //       alert(error.response.status);
        //     }
        //   });
      } else {
        alert("로그인 실패");
      }
    } else if (radioValue == 2) {
        axios
          .post(ownerSubmitUrl, submitInfo)
          .then((response) => {
            if(response.data === "id fail"){
              alert("아이디가 존재하지 않습니다.");
              setId("");
            }else if(response.data === "pwd fail"){
              alert("비밀번호가 틀렸습니다.");
              setPwd("");
            }else{
              sessionStorage.setItem("ownerNo", response.data);
              window.location.href = "../owner/home";
            }           
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.status);
            }
          });
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
            <Form.Group className="login__id" controlId="login__id">
              {radioValue == 1 ?  <Form.Control
                                      name="id"
                                      onChange={onIdHandler}
                                      value={id}
                                      type="email"
                                      placeholder="아이디(이메일)"
                                      required
                                    /> 
                                    : <Form.Control
                                      name="id"
                                      onChange={onIdHandler}
                                      value={id}
                                      placeholder="아이디"
                                      required
            />}
              {/* <div className="msg">{idChkMsg.msg}</div> */}
              {/* <div className="msg">{idChkResult.resultMsg}</div> */}
            </Form.Group>
            <Form.Group className="login__pwd" controlId="login__pwd">
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
            <Link to="../searchIdPwd">
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
