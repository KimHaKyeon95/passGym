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
import { useParams } from "react-router-dom";
function Gymdetail() {
  const { ownerNo } = useParams();
  const [loading, setLoading] = useState(true);
  const [Gym, setGym] = useState({});

  const getGym = () => {
    const json = {
      data: {
        gyms: {
          ownerNo: 1,
          name: "비타민 헬스장",
          phoneNo: "032-151-4845",
          addr: "수원시 팔달구",
          addrDetail: "지동 포레스트 311호",
          avgStar: 3.0,
          distance: 0.5,
        },
      },
    };
    setGym(json.data.gyms);
    setLoading(false);
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
            <Col lg={{ span: 4, offset: 1 }} md={{ span: 6, offset: 0 }}>
              <Image
                fluid
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                  maxHeight: "400px",
                }}
                src={require("../../images/" + ownerNo + ".jpg")}
              ></Image>
            </Col>
            <Col xs md="3" lg="5">
              <Row xs={3}>
                <Col xs={8}>
                  <h4>{Gym.name}</h4>
                </Col>
                <Col md={1}>
                  <Button variant="outline-danger">🤍</Button>
                  <Button variant="outline-dark" className="visually-hidden">
                    ❤
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>★{Gym.avgStar}</Col>
              </Row>
              <hr />
              <Row style={{ padding: "10px 0" }}>
                <Col>
                  {Gym.addr}
                  {Gym.addrDetail}
                </Col>
              </Row>
              <Row>
                <Col>{Gym.phoneNo}</Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col>현재 위치와의 거리 : {Gym.distance} Km</Col>
              </Row>
              <hr />
              <Row style={{ margin: "10px 0" }}>
                <Col>헬스장 이용권</Col>
              </Row>
              <Row style={{ margin: "10px 0" }}>
                <Col>
                  <Form.Select>
                    <option>옵션 선택</option>
                    <option>passName + " " + passPrice + "원"</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row style={{ margin: "10px 0" }}>
                <Col>
                  <Button>결제하기</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col offset="10">Introduce</Col>
          </Row>
          <hr />
          <Row>
            <Col xs lg="8">
              Notice
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>Operating Time</Col>
          </Row>
          <hr />
          <Row>
            <Col>Operating Program</Col>
          </Row>
          <hr />
          <Row>
            <Col>Extra Service</Col>
          </Row>
          <hr />
          <Row>
            <Col>etc</Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Gymdetail;
