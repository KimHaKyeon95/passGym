import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/common/Home";
import Login from "./routes/common/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
