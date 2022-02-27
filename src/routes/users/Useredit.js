import {
  Col,
  Container,
  Row,
  Spinner,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Useredit() {
  const [loading, setLoading] = useState(true);
  const [User, setUser] = useState({});

  const getUser = () => {
    const url = "http://localhost:9999/passgym/user/";
    axios
      .get(url)
      .then(function (response) {
        setUser(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.response.status);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container style={{ border: "1px solid" }}>
          <Row style={{ padding: "10px 0" }}>
            <Col>
              <h3 style={{ textAlign: "center" }}>사용자정보 수정</h3>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Image
                fluid
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  overflow: "hidden",
                  borderRadius: "50%",
                  padding: "10px 0",
                }}
                src={require(`../../images/${User.userNo}.jpg`)}
              ></Image>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ padding: "10px 0 40px 0" }}
          >
            <Col md="5">
              <Form.Group controlId="formFileMultiple">
                <Form.Control type="file" multiple />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="5">
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column md="3" sm="2">
                    아이디
                  </Form.Label>
                  <Col md="9" sm="10">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue="email@example.com"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column md="3" sm="2">
                    이름
                  </Form.Label>
                  <Col md="9" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Text"
                      value="이현규"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column md="3" sm="2">
                    비밀번호
                  </Form.Label>
                  <Col md="9" sm="10">
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column md="3" sm="2">
                    전화번호
                  </Form.Label>
                  <Col md="9" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Text"
                      value="01062329789"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column md="3" sm="2">
                    우편번호
                  </Form.Label>
                  <Col md="5" sm="7">
                    <Form.Control
                      type="text"
                      placeholder="Text"
                      value="12345"
                    />
                  </Col>
                  <Col>
                    <Button>주소찾기</Button>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column md="3" sm="2">
                    주소
                  </Form.Label>
                  <Col md="9" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Text"
                      value="수원시 팔달구"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column md="3" sm="2">
                    상세주소
                  </Form.Label>
                  <Col md="9" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Text"
                      value="포레스트 311호"
                    />
                  </Col>
                </Form.Group>
                <Row style={{ margin: "40px 0 20px 0" }}>
                  <Col style={{ textAlign: "center" }}>
                    <Button>저장하기</Button>
                  </Col>
                </Row>
                <Row style={{ margin: "40px 0 20px 0" }}>
                  <Col style={{ textAlign: "center" }}>
                    <Button>탈퇴하기</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Useredit;
