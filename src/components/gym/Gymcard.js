import { Col, Card } from "react-bootstrap";

function Gymcard({ ownerNo, name, addr, avgStar, distance }) {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            <span>ownerNo : {ownerNo}</span>
            <br />
            <span>name : {name}</span>
            <br />
            <span>addr : {addr}</span>
            <br />
            <span>avgStar : {avgStar}</span>
            <br />
            <span>distance : {distance}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Gymcard;
