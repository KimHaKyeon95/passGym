import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Image,
  Form,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Payment() {
  const { ownerNo } = useParams();
  const [loading, setLoading] = useState(true);
  const [Gym, setGym] = useState({});
  const [selectedPass, setSelectedPass] = useState();

  const getGym = () => {
    const json = {
      data: {
        gym: {
          ownerNo: 1,
          name: "비타민 헬스장",
          phoneNo: "032-151-4845",
          addr: "수원시 팔달구",
          addrDetail: "지동 포레스트 311호",
          avgStar: 3.0,
          distance: 0.5,
          introduce: "우리 헬스장은 뛰어난 트레이너들이 있습니다.",
          notice: "기구는 한번에 하나씩",
          operatingTime: "평일 06:00 ~ 20:00 / 공휴일 09:00 ~ 18:00",
          operatingProgram: "크로스핏",
          extraService: "운동복 세탁",
          etc: "",
          passes: [
            { passNo: 1, passName: "1개월권", passPrice: 30000 },
            { passNo: 2, passName: "3개월권", passPrice: 50000 },
            { passNo: 3, passName: "6개월권", passPrice: 100000 },
          ],
        },
      },
    };
    setGym(json.data.gym);
    setLoading(false);
  };

  useEffect(() => {
    getGym();
    setSelectedPass(sessionStorage.getItem("passNo"));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container style={{ border: " 1px solid" }}>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h3>payment</h3>
            </Col>
          </Row>
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
                src={require(`../../images/${ownerNo}.jpg`)}
              ></Image>
            </Col>
            <Col xs md="3" lg="5">
              <Row xs={3}>
                <Col xs={8}>
                  <h4>{Gym.name}</h4>
                </Col>
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
                  <Form.Select value={selectedPass}>
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
                <Col>
                  <Link to="/mypage">
                    <Button>결제하기</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Payment;
