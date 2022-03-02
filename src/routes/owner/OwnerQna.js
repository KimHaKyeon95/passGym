import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

function OwnerQna() {
  const [OwnerQna, setOwnerQna] = useState({
    ownerNo: "1111111111",
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const changValue = (e) => {
    setOwnerQna({
      ...OwnerQna,
      [e.target.name]: e.target.value,
    });
  };

  const submitQna = (e) => {
    const url = "http://localhost:9998/passgym/ownerqna/";
    axios
      .post(url, OwnerQna)
      .then((response) => {
        if (response.data.status === 1) {
          navigate("/ownerqnalist");
        } else {
          alert(response.data.status);
        }
      })
      .catch((error) => {
        alert(error.response.status);
      });
    e.preventDefault();
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

export default OwnerQna;
