import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./routes/common/Home";
import Login from "./routes/common/Login";
import Usersignup from "./routes/users/Usersignup";
import Gymdetail from "./routes/common/Gymdetail";
import Ownersignup from "./routes/owner/Ownersignup";
import SearchIdPwd from "./routes/common/SearchIdPwd";
import "./css/common/index.css";
import Payment from "./routes/users/payment";
import GymRegist from "./routes/owner/GymRegist";


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
      </section>
      <Footer />
    </Router>
  );
}

export default App;
