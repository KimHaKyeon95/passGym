import Logo from "../../images/dumbbell.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

function Header() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onLogoutHandler() {
    console.log("로그아웃 버튼 클릭");
    sessionStorage.removeItem("id", "");
    navigate("/");
    // axios
    //   .get("/logout")
    //   .then((response) => {
    //     console.log(response.data);
    //     sessionStorage.removeItem("id", "");
    //   })
    //   .catch((error) => {
    //     console.log(error.response.status);
    //   });
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark"  style={{ height:'80px' }} className="mb-4">
        <Container>
          <Link to={"/"} className="navbar-brand">
            패스짐&nbsp;&nbsp;
            <img width="30px" src={Logo} alt="logo" />
          </Link>
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              홈
            </Link>
            <Link to="/" className="nav-link">
              지도
            </Link>
            <Link to="/" className="nav-link">
              문의하기
            </Link>
            <Link to={"/mypage"} className="nav-link">
              마이페이지
            </Link>
            <Link to={"/"} className="nav-link">
              <Button
                variant="outline-light"
                size="sm"
                onClick={onLogoutHandler}
              >
                로그아웃
              </Button>
            </Link>
            <Link to={"/login"} className="nav-link">
              <Button variant="outline-light" size="sm">
                로그인
              </Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
