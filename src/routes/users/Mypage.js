import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import GymPassList from "../../components/users/GymPassList";
import Profile from "../../components/users/Profile";
import UserQnaList from "../../components/users/UserQnaList";
import ZzimList from "../../components/users/ZzimList";

function Mypage() {
  //임시
  const [User, setUser] = useState({});
  //const [GymPasses, setGymPasses] = useState({});
  //const [Zzims, setZzims] = useState({});
  const [UserQnas, setUserQnas] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    const url = "http://localhost:9999/passgym/user/";
    axios
      .get(url)
      .then(function (response) {
        setUser(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.response.status);
      });
  };

  // const getGymPasses = () => {
  //   const json = {
  //     data: {
  //       gympasses: [
  //         {
  //           paymentNo: 1,
  //           pass: {
  //             gym: {
  //               ownerNo: 1,
  //               name: "배달의 짐",
  //               totalStar: 10.0,
  //               totalMember: 5,
  //             },
  //             passNo: 1,
  //             passName: "1개월권",
  //           },
  //           user: {
  //             id: "dlgusrb1913@naver.com",
  //             name: "이현규",
  //             addr: "수원시 팔달구 지동 276",
  //             addrDetail: "포레스트 311호",
  //             zipcode: "15647",
  //           },
  //           startDate: new Date("2022-02-22"),
  //           endDate: new Date("2022-03-21"),
  //           star: { star: 0 },
  //         },
  //         {
  //           paymentNo: 1,
  //           pass: {
  //             gym: {
  //               ownerNo: 1,
  //               name: "배달의 짐",
  //               totalStar: 10.0,
  //               totalMember: 5,
  //             },
  //             passNo: 2,
  //             passName: "3개월권",
  //           },
  //           user: {
  //             id: "dlgusrb1913@naver.com",
  //             name: "이현규",
  //             addr: "수원시 팔달구 지동 276",
  //             addrDetail: "포레스트 311호",
  //             zipcode: "15647",
  //           },
  //           startDate: new Date("2022-02-22"),
  //           endDate: new Date("2022-05-21"),
  //           star: { star: 1 },
  //         },
  //         {
  //           paymentNo: 1,
  //           pass: {
  //             gym: {
  //               ownerNo: 1,
  //               name: "배달의 짐",
  //               totalStar: 10.0,
  //               totalMember: 5,
  //             },
  //             passNo: 3,
  //             passName: "6개월권",
  //           },
  //           user: {
  //             id: "dlgusrb1913@naver.com",
  //             name: "이현규",
  //             addr: "수원시 팔달구 지동 276",
  //             addrDetail: "포레스트 311호",
  //             zipcode: "15647",
  //           },
  //           startDate: new Date("2022-02-22"),
  //           endDate: new Date("2022-07-21"),
  //           star: { star: 2 },
  //         },
  //       ],
  //     },
  //   };
  //   setGymPasses(json.data.gympasses);
  // };

  // const getZzims = () => {
  //   const json = {
  //     data: {
  //       user: {
  //         userNo: 1,
  //         id: "dlgusrb1913@naver.com",
  //         name: "이현규",
  //         addr: "수원시 팔달구 지동 276",
  //         addrDetail: "포레스트 311호",
  //         zipcode: "15647",
  //       },
  //     },
  //   };
  //   setZzims(json.data.user);
  // };

  const getUserQnas = () => {
    const json = {
      data: {
        user: {
          userNo: 1,
          id: "dlgusrb1913@naver.com",
          name: "이현규",
          addr: "수원시 팔달구 지동 276",
          addrDetail: "포레스트 311호",
          zipcode: "15647",
        },
      },
    };
    setUserQnas(json.data.user);
  };

  useEffect(() => {
    getUser();
    //getGymPasses();
    //getZzims();
    getUserQnas();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Profile
          key={User.userNo}
          userNo={User.userNo}
          id={User.id}
          name={User.name}
          zipcode={User.zipcode}
          addr={User.addr}
          addrDetail={User.addrDetail}
        />
      )}
      <Tabs
        defaultActiveKey="gympass"
        id="uncontrolled-tab-example"
        className="mb-3"
        style={{ margin: "10vh 0" }}
      >
        <Tab eventKey="gympass" title="이용권 목록">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <GymPassList />
          )}
        </Tab>
        <Tab eventKey="question" title="1:1문의 목록">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <UserQnaList />
          )}
        </Tab>
      </Tabs>
    </>
  );
}

export default Mypage;
