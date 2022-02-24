import Logo from "../../images/dumbbell.png";
import { Link } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";

function Header() {
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
              <Button variant="outline-light" size="sm">
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
