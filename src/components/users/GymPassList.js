import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import GymPass from "./GymPass";
function GymPassList() {
  const [GymPasses, setGymPasses] = useState({});
  const [loading, setLoading] = useState(true);

  const getGymPasses = () => {
    const url = "http://localhost:9999/passgym/user/gympasses";
    axios
      .get(url)
      .then(function (response) {
        console.log(response.data);
        setGymPasses(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.response.status);
      });
  };

  useEffect(() => {
    getGymPasses();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container
          style={{ marginBottom: "50px", border: "1px solid", padding: "40px" }}
        >
          {GymPasses.map((gympass) => (
            <Link
              to={`/gym/${gympass.ownerNo}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Row
                xs={2}
                md={3}
                lg={4}
                className="g-4"
                style={{ marginBottom: "40px" }}
              >
                <Col>
                  <GymPass
                    key={gympass.paymentNo}
                    paymentNo={gympass.paymentNo}
                    ownerNo={gympass.ownerNo}
                    name={gympass.gymname}
                    passName={gympass.passName}
                    avgStar={gympass.avgStar}
                    startDate={gympass.startDate}
                    endDate={gympass.endDate}
                    remain={gympass.remain}
                    status={gympass.status}
                  />
                </Col>
              </Row>
            </Link>
          ))}
        </Container>
      )}
    </>
  );
}

export default GymPassList;
