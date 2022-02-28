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
  const ownerNo = "1111111111";
  const [OwnerQna, setOwnerQna] = useState([]);
  const [loading, setloading] = useState(false);

  const getUserQna = () => {
    const url = "http://localhost:9998/passgym/ownerqna/" + ownerNo;
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setOwnerQna(response.data.ownerQnaList);
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
            {OwnerQna.map((OwnerQna) => (
              <Accordion.Item eventKey={OwnerQna.qnaNo} key={OwnerQna.qnaNo}>
                <Row>
                  <Accordion.Header>
                    <Col>{OwnerQna.title}</Col>
                    <Col>{OwnerQna.qnaDate.substring(0, 10)}</Col>
                    <Col>
                      {OwnerQna.replyStatus == 0 ? "답변대기중" : "답변완료"}
                    </Col>
                  </Accordion.Header>
                </Row>
                <Accordion.Body>
                  {OwnerQna.reply == null ? "답변대기중" : OwnerQna.reply}
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
              <Link to="/ownerqna">
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
