import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Saved from "./Saved";
import Login from "./Login";

const Home = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default Home;
