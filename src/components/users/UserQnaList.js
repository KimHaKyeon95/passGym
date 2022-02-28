import axios from "axios";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function UserQnaList() {
  const userNo = 1;
  const [UserQna, setUserQna] = useState([]);
  const [loading, setloading] = useState(false);

  const getUserQna = () => {
    const url = "http://localhost:9998/passgym/userqna/" + userNo;
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setUserQna(response.data.userQnaList);
        setloading(false);
      })
      .catch(function (error) {
        alert(error.response.status);
      });
  };

  useEffect(() => {
    getUserQna();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <Accordion
            style={{
              marginBottom: "40px",
              width: "1000px",
              maxWidth: "90vw",
            }}
          >
            {UserQna.map((UserQna) => (
              <Accordion.Item eventKey={UserQna.qnaNo} key={UserQna.qnaNo}>
                <Row>
                  <Accordion.Header>
                    <Col>{UserQna.title}</Col>
                    <Col>{UserQna.qnaDate.substring(0, 10)}</Col>
                    <Col>
                      {UserQna.replyStatus == 0 ? "답변대기중" : "답변완료"}
                    </Col>
                  </Accordion.Header>
                </Row>
                <Accordion.Body>
                  {UserQna.reply == null ? "답변대기중" : UserQna.reply}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <Row>
            <Col
              style={{
                textAlign: "center",
              }}
            >
              <Link to="/userqna">
                <Button>문의하기</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default UserQnaList;
