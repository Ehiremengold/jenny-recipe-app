import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Saved from "./Saved";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const Home = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
};

export default Home;
