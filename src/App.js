import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/common/Home";
import Login from "./routes/common/Login";
import Usersignup from "./routes/users/Usersignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/usersignup" element={<Usersignup />} />
      </Routes>
    </Router>
  );
}

export default App;
