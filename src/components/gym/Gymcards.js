import { Container, Row, Spinner, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Gymcard from "../../components/gym/Gymcard";
function Gymcards({ type }) {
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState({});
  const getGyms = () => {
    const json = {
      data: {
        gyms: [
          {
            ownerNo: "1111111111",
            name: "비타민 헬스장",
            addr: "수원시 팔달구",
            avgStar: 3.0,
            distance: 0.5,
          },
          {
            ownerNo: 2,
            name: "한솔 피트니스",
            addr: "목포시 연산동",
            avgStar: 5.0,
            distance: 5.0,
          },
          {
            ownerNo: 3,
            name: "명동 체육관",
            addr: "서울시 명동",
            avgStar: 2.0,
            distance: 3.0,
          },
          {
            ownerNo: 4,
            name: "지동 체육관",
            addr: "서울시 지동",
            avgStar: 4.0,
            distance: 1.0,
          },
          {
            ownerNo: 5,
            name: "쇠질",
            addr: "부천시 원미구",
            avgStar: 1.0,
            distance: 4.0,
          },
          {
            ownerNo: 6,
            name: "프로틴",
            addr: "광주시 북구",
            avgStar: 3.0,
            distance: 10.0,
          },
        ],
      },
    };
    setGyms(json.data.gyms);
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
        <Container style={{ marginBottom: "50px" }}>
          <Row>
            <Col style={{ margin: "10px", fontSize: "24px" }}>{type}</Col>
          </Row>
          <Row xs={2} md={3} lg={4} className="g-4">
            {gyms.map((gym) => (
              <Gymcard
                key={gym.ownerNo}
                ownerNo={gym.ownerNo}
                name={gym.name}
                addr={gym.addr}
                avgStar={gym.avgStar}
                distance={gym.distance}
              />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Gymcards;
