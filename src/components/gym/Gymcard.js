import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Gymcard({  num, ownerNo, name, addr, avgStar, distance }) {

  let addrArray = addr.split("(");
  let stringDistance = String(distance);
  let usingDistance = stringDistance.substring(0, 4);
  return (
    <div className="cards">
      <Link
        to={`/gym/${ownerNo}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Card className="cards">
          <Card.Body style={{ paddingTop: "2px" }}>
            <Card.Text style={{ marginBottom: "0" }}>no.{num} </Card.Text>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>★{avgStar}</span>
              <br />
              <span>{addrArray[0]}</span>
              <br />
              <span>거리 : {usingDistance} km</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
      
    
  );
}

export default Gymcard;
