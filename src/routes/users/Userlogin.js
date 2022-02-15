import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import "../css/Userlogin.css";

function Userlogin() {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [error, setErrors] = React.useState({});

  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("1");

  const radios = [
    { name: "사용자", value: "1" },
    { name: "사업자", value: "2" },
  ];

  function onIdHandler(event) {
    setId(event.target.value);
  }

  function onPwdHandler(event) {
    setPwd(event.target.value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();
  }

  return (
    <div>
      <div className="userlogin">
        <Form className="userlogin__form">
          <>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-success" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br />
          </>
          <div className="userlogin__input">
            <Form.Group className="userlogin__id" controlId="userlogin__id">
              <Form.Control
                name="id"
                onChange={onIdHandler}
                value={id}
                type="email"
                placeholder="아이디(이메일)"
              />
              {/* <div className="msg">{idChkMsg.msg}</div> */}
              {/* <div className="msg">{idChkResult.resultMsg}</div> */}
            </Form.Group>
            <Form.Group className="userlogin__pwd" controlId="userlogin__pwd">
              <Form.Control
                name="pwd"
                onChange={onPwdHandler}
                value={pwd}
                type="password"
                placeholder="비밀번호"
                required
              />
            </Form.Group>
            <Button
              className="userlogin__submitBtn"
              variant="primary"
              type="submit"
              onSubmit={onSubmitHandler}
            >
              로그인
            </Button>
            <Button className="userlogin__findBtn" variant="primary">
              이메일/비밀번호 찾기
            </Button>
            <Button className="userlogin__usersignupBtn" variant="primary">
              사용자 회원가입
            </Button>
            <Button className="userlogin__ownersignupBtn" variant="primary">
              사업자 회원가입
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Userlogin;
