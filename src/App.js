import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./routes/common/Home";
import Login from "./routes/common/Login";
import Usersignup from "./routes/users/Usersignup";
import Gymdetail from "./routes/common/Gymdetail";
import Ownersignup from "./routes/owner/Ownersignup";
import SearchIdPwd from "./routes/common/SearchIdPwd";
import "./css/common/index.css";
import Payment from "./routes/users/Payment";
import Mypage from "./routes/users/Mypage";
import Useredit from "./routes/users/Useredit";
import UserQna from "./routes/users/UserQna";
import GymRegist from "./routes/owner/GymRegist";
import OwnerHome from "./routes/owner/OwnerHome";
import PassInfo from "./routes/owner/PassInfo";
import OwnerModify from "./routes/owner/OwnerModify";
import OwnerQnaList from "./routes/owner/OwnerQnaList";
import OwnerQna from "./routes/owner/OwnerQna";


function App() {
  return (
    <Router>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/gym/:ownerNo" element={<Gymdetail />} />
        </Routes>
        <Routes>
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <Routes>
          <Route path="/useredit" element={<Useredit />} />
        </Routes>
        <Routes>
          <Route path="/userqna" element={<UserQna />} />
        </Routes>
        <Routes>
          <Route path="/ownersignup" element={<Ownersignup />} />
        </Routes>
        <Routes>
          <Route path="/usersignup" element={<Usersignup />} />
        </Routes>
        <Routes>
          <Route path="/searchidpwd" element={<SearchIdPwd />} />
        </Routes>
        <Routes>
          <Route path="/ownersignup/gymregist" element={<GymRegist />} />
        </Routes>
        <Routes>
          <Route path="/payment/:ownerNo" element={<Payment />} />
        </Routes>
        <Routes>
          <Route path="/owner/home" element={<OwnerHome />} />
        </Routes>
        <Routes>
          <Route path="/owner/passInfo" element={<PassInfo />} />
        </Routes>
        <Routes>
          <Route path="/owner/modify" element={<OwnerModify />} />
        </Routes>
        <Routes>
          <Route path="/ownerqnalist" element={<OwnerQnaList />} />
        </Routes>
        <Routes>
          <Route path="/ownerqna" element={<OwnerQna />} />
        </Routes>
        {/* <Routes>
          <Route path="/owner/board" element={<OwnerBoard />} />
        </Routes> */}
      </section>
      <Footer />
    </Router>
  );
}

export default App;
