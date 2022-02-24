import { Col, Container, Row, Spinner, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Profile({ userNo, id, name, zipcode, addr, addrDetail }) {
  return (
    <>
      <Container fluid="true">
        <Row>
          <Col>
            <h3 style={{ textAlign: "center" }}>Profile</h3>
          </Col>
        </Row>
        <Row
          lg={6}
          md={8}
          style={{
            width: "1000px",
            maxWidth: "90vw",
            border: "1px solid",
            padding: "40px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col
            lg={{ span: 2 }}
            md={{ span: 2 }}
            style={{ width: "150px", height: "150px" }}
          >
            <Image
              fluid
              style={{
                objectFit: "cover",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              src={require("../../images/" + userNo + ".jpg")}
            ></Image>
          </Col>
          <Col lg={{ span: 6 }} md={{ span: 6 }}>
            <Row>이름 : {name}</Row>
            <Row>이메일 : {id}</Row>
            <Row>
              주소 : {addr} ({zipcode})
            </Row>
            <Row>상세주소 : {addrDetail}</Row>
          </Col>
          <Col md={{ span: 2 }}>
            <Link to="/">
              <Button>수정하기</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
