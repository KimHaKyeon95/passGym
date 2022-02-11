import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Gymcard from "../../components/gym/Gymcard";
function Home() {
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState({});
  const getGyms = () => {
    const json = {
      data: {
        gyms: [
          {
            ownerNo: 1,
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
      <Header />
      <section>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Container>
            <Row xs={2} md={3} className="g-4">
              {gyms.map((gym) => (
                <Gymcard
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
      </section>
      <Footer />
    </>
  );
}

export default Home;
