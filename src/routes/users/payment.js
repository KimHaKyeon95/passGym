import { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Button,
  Image,
  Form,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function Payment() {
  const userNo = sessionStorage.getItem("userNo"); //임시번호
  const { ownerNo } = useParams();
  const [loading, setLoading] = useState(true);
  const [Gym, setGym] = useState({});
  const [selectedPassNo, setSelectedPassNo] = useState();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const getGym = () => {
    const url = "http://localhost:9999/passgym/gym/" + ownerNo;
    axios
      .get(url)
      .then((response) => {
        setGym(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.status);
      });
  };

  const onPassChange = (event) => {
    setSelectedPassNo(() => event.target.value);
    sessionStorage.setItem("passNo", selectedPassNo);
    for (var idx in Gym.passes) {
      if (Gym.passes[idx].passNo === selectedPassNo) {
        sessionStorage.setItem("passPrice", Gym.passes[idx].passPrice);
        sessionStorage.setItem("passMonth", Gym.passes[idx].passMonth);
      }
    }
  };

  const onDateChange = (event) => {
    console.log(event.target.value);
    setStartDate(event.target.value);
  };

  const onSubmit = (event) => {
    const url = "http://localhost:9999/passgym/payment/";
    const data = {
      paymentNo: "" + userNo + ownerNo + selectedPassNo,
      paymentPrice: sessionStorage.getItem("passPrice"),
      paymentType: 1,
      bankName: "농협은행",
      gymPass: {
        ownerNo: ownerNo,
        passNo: selectedPassNo,
        userNo: userNo,
        startDate: startDate,
        endDate: endDate,
        pauseCount: 2,
        pauseDate: 30,
        status: 0,
      },
    };

    if (startDate !== "") {
      axios
        .post(url, data, { withCredentials: true })
        .then((response) => {
          if (response.data.status === 1) {
            navigate("/mypage");
            alert(response.data.msg);
          } else {
            alert(response.data.msg);
          }
        })
        .catch((error) => {
          alert(error.response.status);
        });
    }

    event.preventDefault();
  };

  useEffect(() => {
    for (var idx in Gym.passes) {
      if (Gym.passes[idx].passNo === selectedPassNo) {
        sessionStorage.setItem("passPrice", Gym.passes[idx].passPrice);
        sessionStorage.setItem("passMonth", Gym.passes[idx].passMonth);
      }
    }
    let tempDate = new Date(startDate);
    tempDate.setMonth(
      tempDate.getMonth() + Number(sessionStorage.getItem("passMonth"))
    );
    setEndDate(tempDate.toISOString().substring(0, 10));
  }, [startDate, selectedPassNo]);

  useEffect(() => {
    getGym();
    setSelectedPassNo(sessionStorage.getItem("passNo"));
    setStartDate(new Date().toISOString().substring(0, 10));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container style={{ border: "1px solid" }}>
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
                <Col>전화번호 : {Gym.phoneNo}</Col>
              </Row>
              <hr />
              <Row style={{ margin: "10px 0" }}>
                <Col>헬스장 이용권</Col>
              </Row>
              <Row style={{ margin: "10px 0" }}>
                <Col>
                  <Form.Select value={selectedPassNo} onChange={onPassChange}>
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
                  시작일자
                  <br />
                  <input
                    type="date"
                    value={startDate}
                    onChange={onDateChange}
                  />
                </Col>
                <Col>
                  끝나는일자
                  <br />
                  <input type="date" value={endDate} readOnly />
                </Col>
              </Row>
              <Row style={{ margin: "10px 0" }}>
                <Col>
                  <Button onClick={onSubmit}>결제하기</Button>
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
