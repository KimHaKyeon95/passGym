import { Button, Col, Container, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function GymPass({
  paymentNo,
  ownerNo,
  name,
  passName,
  avgStar,
  startDate,
  endDate,
  remain,
  status,
}) {
  return (
    <>
      <Row
        lg={6}
        md={8}
        style={{
          width: "1000px",
          maxWidth: "65vw",
          border: "1px solid",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Col
          lg={{ span: 2 }}
          md={{ span: 2 }}
          style={{ width: "230px", maxWidth: "40%" }}
        >
          <Image
            fluid
            style={{
              objectFit: "cover",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            src={require("../../images/" + ownerNo + ".jpg")}
          ></Image>
        </Col>
        <Col lg={{ span: 6 }} md={{ span: 6 }}>
          <Row>
            <Col>번호 : {paymentNo}</Col>
          </Row>
          <Row>
            <Col>상태 : {status}</Col>
          </Row>
          <Row>
            <Col>이름 : {name}</Col>
          </Row>
          <Row>
            <Col>회원권 이름 : {passName}</Col>
          </Row>
          <Row>
            <Col>평균별점 : </Col>
            <Col style={{ display: "inline-block", color: "yellow" }}>★</Col>
            <Col>{avgStar}</Col>
          </Row>
          <Row>
            <Col>
              {startDate} ~{endDate}
            </Col>
          </Row>
          <Row>
            <Col>{remain}</Col>
          </Row>
        </Col>
        <Col
          md={{ span: 2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ marginBottom: "10px" }}>
            <Button>일시정지</Button>
          </Link>
          <Link to="/">
            <Button>연장</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default GymPass;
