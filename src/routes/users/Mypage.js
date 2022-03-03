import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router";
import GymPassList from "../../components/users/GymPassList";
import Profile from "../../components/users/Profile";
import UserQnaList from "../../components/users/UserQnaList";

function Mypage() {
  const [User, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getUser = () => {
    const url = "http://localhost:9999/passgym/user/";
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 0) {
          alert(response.data.msg);
          navigate("/");
        } else {
          setUser(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error.response.status);
      });
  };

  useEffect(() => {
    getUser();
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
          userImg={User.userImg}
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
