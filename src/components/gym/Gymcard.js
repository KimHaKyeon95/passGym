import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Gymcard({ num, ownerNo, name, addr, avgStar, distance }) {
  let addrArray = addr.split("(");
  let stringDistance = String(distance);
  let usingDistance = stringDistance.substring(0, 4);
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
            <Card.Text style={{ marginBottom: "0" }}>no.{num} </Card.Text>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>★{avgStar}</span>
              <br />
              <div style={{height: "30px"}}>{addrArray[0]}</div>
              <br />
              <span>거리 : {usingDistance} km</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default Gymcard;
