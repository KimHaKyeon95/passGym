import axios from "axios";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Spinner,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
function Gymdetail() {
  const { ownerNo } = useParams();
  const [loading, setLoading] = useState(true);
  const [Gym, setGym] = useState({});
  const [SelectedPass, setSelectedPass] = useState([]);
  const getGym = () => {
    const url = "http://localhost:9999/passgym/gym/" + ownerNo;
    axios
      .get(url, { withCredentials: true })
      .then(function (response) {
        setGym(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.response.status);
      });
  };

  const onPassChange = (event) => {
    setSelectedPass(() => event.target.value);
  };

  //session에 passNo 저장
  const onPaymentClick = () => {
    sessionStorage.setItem("ownerNo", Gym.ownerNo);
    sessionStorage.setItem("passNo", SelectedPass);
    for (var idx in Gym.passes) {
      if (Gym.passes[idx].passNo == SelectedPass) {
        sessionStorage.setItem("passPrice", Gym.passes[idx].passPrice);
        sessionStorage.setItem("passMonth", Gym.passes[idx].passMonth);
      }
    }
  };

  useEffect(() => {
    getGym();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <Row className="justify-content-md-center justify-content-xs-center">
            <Col lg={{ span: 4 }} md={{ span: 6, offset: 0 }}>
              <Image
                fluid
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                  maxHeight: "400px",
                  paddingRight: "20px",
                }}
                src={`data:image/jpeg;base64,${Gym.gymImg}`}
              ></Image>
            </Col>
            <Col xs md="3" lg="5">
              <Row xs={3}>
                <Col xs={8}>
                  <h4>{Gym.name}</h4>
                </Col>
                <Col>★{Math.round(Gym.avgStar)}</Col>
              </Row>
              <hr />
              <Row style={{ padding: "10px 0" }}>
                <Col>
                  {Gym.addr}
                  {Gym.addrDetail}
                </Col>
              </Row>
              <Row>
                <Col>전화번호 : {Gym.phoneNo}</Col>
              </Row>
              <hr />
              <Row style={{ margin: "10px 0" }}>
                <Col>헬스장 이용권</Col>
              </Row>
              <Row style={{ margin: "10px 0" }}>
                <Col>
                  <Form.Select onChange={onPassChange}>
                    <option>옵션 선택</option>
                    {Gym.passes.map((pass) => (
                      <option key={pass.passNo} value={pass.passNo}>
                        {pass.passName + ": " + pass.passPrice + "원"}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row style={{ margin: "10px 0" }}>
                <Link to={"/payment/" + ownerNo}>
                  <Col>
                    <Button onClick={onPaymentClick}>결제하기</Button>
                  </Col>
                </Link>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <hr />
              Introduce
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>{Gym.introduce}</Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <hr />
              Notice
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>{Gym.notice}</Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <hr />
              Operating Time
            </Col>
            <Col md={{ span: 10, offset: 1 }}>{Gym.operatingTime}</Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <hr />
              Operating Program
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>{Gym.operatingProgram}</Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <hr />
              Extra Service
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>{Gym.extraService}</Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <hr />
              etc
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>{Gym.etc}</Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Gymdetail;
