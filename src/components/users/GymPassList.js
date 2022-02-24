import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import GymPass from "./GymPass";
function GymPassList() {
  const [GymPasses, setGymPasses] = useState({});
  const [loading, setLoading] = useState(true);

  const getGymPasses = () => {
    const json = {
      data: {
        gympasses: [
          {
            paymentNo: 1,
            pass: {
              gym: {
                ownerNo: 1,
                name: "배달의 짐",
                totalStar: 10.0,
                totalMember: 5,
              },
              passNo: 1,
              passName: "1개월권",
            },
            user: {
              id: "dlgusrb1913@naver.com",
              name: "이현규",
              addr: "수원시 팔달구 지동 276",
              addrDetail: "포레스트 311호",
              zipcode: "15647",
            },
            startDate: new Date("2022-02-22"),
            endDate: new Date("2022-03-21"),
            status: 1,
            star: { star: 0 },
          },
          {
            paymentNo: 1,
            pass: {
              gym: {
                ownerNo: 1,
                name: "배달의 짐",
                totalStar: 10.0,
                totalMember: 5,
              },
              passNo: 2,
              passName: "3개월권",
            },
            user: {
              id: "dlgusrb1913@naver.com",
              name: "이현규",
              addr: "수원시 팔달구 지동 276",
              addrDetail: "포레스트 311호",
              zipcode: "15647",
            },
            startDate: new Date("2022-02-22"),
            endDate: new Date("2022-05-21"),
            status: 1,
            star: { star: 1 },
          },
          {
            paymentNo: 1,
            pass: {
              gym: {
                ownerNo: 1,
                name: "배달의 짐",
                totalStar: 10.0,
                totalMember: 5,
              },
              passNo: 3,
              passName: "6개월권",
            },
            user: {
              id: "dlgusrb1913@naver.com",
              name: "이현규",
              addr: "수원시 팔달구 지동 276",
              addrDetail: "포레스트 311호",
              zipcode: "15647",
            },
            startDate: new Date("2022-02-22"),
            endDate: new Date("2022-07-21"),
            status: 1,
            star: { star: 2 },
          },
        ],
      },
    };
    setGymPasses(json.data.gympasses);
  };

  useEffect(() => {
    getGymPasses();
    setLoading(false);
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
                  ownerNo={gympass.pass.gym.ownerNo}
                  name={gympass.pass.gym.name}
                  passName={gympass.pass.passName}
                  avgStar={
                    gympass.pass.gym.totalStar / gympass.pass.gym.totalMember
                  }
                  startDate={gympass.startDate}
                  endDate={gympass.endDate}
                  remain={gympass.endDate - new Date()}
                  status={gympass.status}
                />
              </Col>
            </Row>
          ))}
        </Container>
      )}
    </>
  );
}

export default GymPassList;
