import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

function UserQna() {
  const [UserQna, setUserQna] = useState({
    userNo: sessionStorage.getItem("userNo"),
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const changValue = (event) => {
    setUserQna({
      ...UserQna,
      [event.target.name]: event.target.value,
    });
  };

  const submitQna = (event) => {
    const url = "http://localhost:9998/passgym/userqna/";
    axios
      .post(url, UserQna)
      .then((response) => {
        if (response.data.status === 1) {
          navigate("/mypage");
        } else {
          alert(response.data.status);
        }
      })
      .catch((error) => {
        alert(error.response.status);
      });
    event.preventDefault();
  };

  return (
    <>
      <Form onSubmit={submitQna} style={{ textAlign: "center" }}>
        <FloatingLabel controlId="floatingTextarea" label="문의제목">
          <Form.Control as="textarea" name="title" onChange={changValue} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="문의내용">
          <Form.Control
            as="textarea"
            style={{ width: "500px", height: "350px", margin: "20px 0" }}
            maxLength={500}
            name="content"
            onChange={changValue}
          />
        </FloatingLabel>
        <Button variant="primary" type="submit" style={{ margin: "20px 0" }}>
          글쓰기
        </Button>
      </Form>
    </>
  );
}

export default UserQna;
