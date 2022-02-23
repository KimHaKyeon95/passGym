import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./routes/common/Home";
import Login from "./routes/common/Login";
import Usersignup from "./routes/users/Usersignup";
import Gymdetail from "./routes/common/Gymdetail";
import "./css/common/index.css";
import Ownersignup from "./routes/owner/Ownersignup";
import SearchIdPwd from "./routes/common/SearchIdPwd";

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
      </section>
      <Footer />
    </Router>
  );
}

export default App;
