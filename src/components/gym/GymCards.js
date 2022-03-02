import { Container, Row, Spinner, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Gymcard from "./Gymcard";
import axios from "axios";
function Gymcards(props) {
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState({ data: [] });

  const getGyms = () => {
    let findGymUrl = "http://localhost:9999/passgym/gym/sort-gym-" + props.type;
    axios.get(findGymUrl, {
      params : {
        lat : props.lat,
        lon : props.lon
      }
    }).then((response) => {
      setGyms({data: response.data});
    }).catch((error) => {
      alert(error.status);
    })

    setLoading(false);
  };

  useEffect(() => {
    getGyms();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container style={{ marginBottom: "50px" }}>
            <Row>
              <Col style={{ margin: "10px", fontSize: "24px" }}>
                {props.type == "star" ? "별점순" : "가까운 거리순"}
              </Col>
            </Row>
            <Row xs={2} md={3} lg={4} className="g-4">
              {gyms.data.map((gym, i) => (
                <Gymcard
                  key={i}
                  num={i + 1}
                  gymImg={gym.gymImg}
                  ownerNo={gym.ownerNo}
                  name={gym.name}
                  addr={gym.addr}
                  avgStar={gym.avgStar}
                  distance={gym.distance}
                />
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default Gymcards;
