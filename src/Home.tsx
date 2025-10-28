
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Saved from "./Saved";

const Home = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </>
  );
};

export default Home;
