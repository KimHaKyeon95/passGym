import { Container } from "react-bootstrap";
import "../../css/common/footer.css";
import logo from "../../images/footer-up.png";

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__leaf" src={logo} alt="footer-log" />
      <div className="footer__info">
        <div className="footer__logo">
          <h3>패 스 짐</h3>
        </div>
        <div className="footer__info-detail">
          <div className="business-number">
            <span className="info__category">사업자등록번호 </span>{" "}
            000-00-000000
          </div>
          <div className="footer__address">
            <span className="info__category">주소 </span> 수원시 00구 00로 00
            000호
          </div>
          <div className="footer__contact">
            <span className="info__category">contact </span> 000-000-0000 /
            asdfqwer@naver.com
          </div>
        </div>
      </div>
      <div className="copyright">Copyright ⓒ passGym. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
