import axios from "axios";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function GymPass({
  paymentNo,
  ownerNo,
  name,
  passName,
  star,
  avgStar,
  startDate,
  endDate,
  status,
  gymImg
}) {
  const navigate = useNavigate();

  const addStar = (event) => {
    console.log(event.target.id);
    const url = "http://localhost:9999/passgym/star/";
    const data = {
      paymentNo: paymentNo,
      star: event.target.id,
    };
    axios
      .post(url, data)
      .then(function (response) {
        if (response.data.status == 1) {
          navigate(0);
        } else {
          alert(response.data.msg);
        }
      })
      .catch(function (error) {
        alert(error.response.status);
        console.log(error);
      });
  };
  return (
    <>
      <Row
        lg={6}
        md={8}
        style={{
          width: "890px",
          maxWidth: "65vw",
          border: "1px solid",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Col
          lg={{ span: 2 }}
          md={{ span: 2 }}
          style={{
            width: "180px",
            maxWidth: "40%",
            height: "180px",
            padding: "0",
          }}
        >
          <Link
            to={`/gym/${ownerNo}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Image
              fluid
              style={{
                objectFit: "cover",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              src={`data:image/jpeg;base64,${gymImg}`}
            ></Image>
          </Link>
        </Col>
        <Col lg={{ span: 6 }} md={{ span: 6 }} style={{ height: "180px" }}>
          <Row style={{ padding: "5px 0 0 0" }}>
            <Col>no.{paymentNo}</Col>
            <Col>{status}</Col>
          </Row>
          <Row style={{ padding: "30px 0 5px 0" }}>
            <Col>
              {name}
              {star > 0 ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      color: "yellow",
                      padding: "0 10px 0 20px",
                    }}
                  >
                    ★
                  </span>
                  {avgStar}
                </>
              ) : (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0 10px 0 20px",
                      cursor: "pointer",
                    }}
                  >
                    <span id="1" onClick={addStar}>
                      ☆
                    </span>
                    <span id="2" onClick={addStar}>
                      ☆
                    </span>
                    <span id="3" onClick={addStar}>
                      ☆
                    </span>
                    <span id="4" onClick={addStar}>
                      ☆
                    </span>
                    <span id="5" onClick={addStar}>
                      ☆
                    </span>
                  </span>{" "}
                  별점을 입력하세요
                </>
              )}
            </Col>
          </Row>
          <Row style={{ padding: "0 0 10px 0" }}>
            <Col>{passName}</Col>
          </Row>
          <Row>
            <Col>
              {startDate} ~{endDate}
            </Col>
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
