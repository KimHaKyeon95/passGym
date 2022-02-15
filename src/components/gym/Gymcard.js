import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Gymcard({ ownerNo, name, addr, avgStar, distance }) {
  return (
    <Col>
      <Link
        to={`/gym/${ownerNo}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Card>
          <Card.Img
            variant="top"
            width="286px"
            height="180px"
            style={{ objectFit: "cover", overflow: "hidden" }}
            src={require("../../images/" + ownerNo + ".jpg")}
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>ownerNo : {ownerNo}</span>
              <br />
              <span>addr : {addr}</span>
              <br />
              <span>avgStar : {avgStar}</span>
              <br />
              <span>distance : {distance}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default Gymcard;
