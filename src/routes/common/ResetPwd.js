import React from "react";
import { Form, Button } from "react-bootstrap";

function ResetPwd() {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdChk, setPwdChk] = React.useState("");

  function onResetHandler() {}
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="Id">
          <Form.Control
            name="id"
            // onChange={onIdHandler}
            value={id}
            placeholder="아이디(이메일)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pwd">
          <Form.Control
            name="pwd"
            // onChange={onPwdHandler}
            value={pwd}
            type="password"
            placeholder="새로 등록할 비밀번호"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pwdChk">
          <Form.Control
            name="pwdChk"
            // onChange={onPwdChkHandler}
            value={pwdChk}
            type="password"
            placeholder="비밀번호 확인"
            required
          />
          {/* <Form.Text className="msg">{pwdChkResult.resultMsg}</Form.Text>
          <Form.Text className="msg">{pwdChkMsg.msg}</Form.Text> */}
        </Form.Group>
        <Button className="resetbtn" onClick={onResetHandler} type="submit">
          변경
        </Button>
      </Form>
    </div>
  );
}

export default ResetPwd;
