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
          <Card.Body style={{ paddingTop: "2px" }}>
            <Card.Text style={{ marginBottom: "0" }}>no.{ownerNo} </Card.Text>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>★{avgStar}</span>
              <br />
              <span>{addr}</span>
              <br />
              <span>거리 : {distance} km</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default Gymcard;
