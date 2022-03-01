import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const OwnerQna = (props) => {
  const [book, setBooks] = useState({
    title: "",
    author: "",
  });
  const changValue = (e) => {
    setBooks({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  //클릭시
  const submitBoard = (e) => {
    e.preventDefault(); //submit 이 action을 안타고 자기 할일을 그만함

    fetch("http://localhost:9990/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(book),
    }) //javastript OBJECT를 JSON으로 응답
      .then((res) => {
        //response를 응답
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(2, res);
        if (res !== null) {
          props.history.push("/owner/board");
        } else {
          alert("등록에 실패하였습니다. ");
        }
      });
  };

  return (
    <div>
      <Form onSubmit={submitBoard}>
        <FloatingLabel
          controlId="floatingTextarea"
          label="제목"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            onChange={changValue}
            name="title"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="내용">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "350px" }}
            onChange={changValue}
            name="content"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          글쓰기
        </Button>
      </Form>
    </div>
  );
};

export default OwnerQna;
