import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Gymcard({ num, ownerNo, name, addr, avgStar, distance, gymImg }) {
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
            // src={require("../../images/" + ownerNo + ".jpg")}
            src={`data:image/jpeg;base64,${gymImg}`}
          />
          <Card.Body style={{ paddingTop: "2px" }}>
            <Card.Title className="h6" style={{ marginBottom: "0" }}>no.{num} </Card.Title>
            <Card.Title>{name}</Card.Title>
            <Card.Text style={{height: "90px"}}>
              <span>★{avgStar}</span>
              <br />
              <span>{addrArray[0]}</span>
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
