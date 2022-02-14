import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/common/Home";
import Login from "./routes/common/Login";
import "./css/common/index.css";
import Ownersignup from "./routes/owner/Ownersignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ownersignup" element={<Ownersignup />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
