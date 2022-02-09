import Logo from "../../images/logo.png";
import styles from "../../css/common/Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className={styles.login__menu}>
        <div className={styles.login__container}>
          <Link to={"/login"} className={styles.loginBtn}>
            로그인
          </Link>
          {/* 로그인 판단 */}
          이름 님 반갑습니다.
          <Link to={"/"} className={styles.loginBtn}>
            로그아웃
          </Link>
          <Link to={"/mypage"} className={styles.mypageBtn}>
            마이페이지
          </Link>
        </div>
      </div>
      <nav className={styles.nav}>
        <div className={styles.nav__container}>
          <h1 className={styles.nav__main} class="nav__main">
            <Link to={"/"} className={styles.nav__main_link}>
              <span>패스짐</span>
              <img className={styles.navbar__logo} src={Logo} alt="logo" />
            </Link>
          </h1>
          <div class="nav-bar__links">
            <Link to={"/"} className={styles.navbar__link}>
              홈
            </Link>
            <a class="link" href="./index.jsp">
              홈
            </a>
            <a class="link" href="./">
              지도
            </a>
            <a class="link" href="./">
              고객센터
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
