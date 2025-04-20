import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import UserPage from "./component/Userpage";
import Driver from "./Driver.jsx";
import DriverOrder from "./DriverOrder.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatBox from "./component/ChatBox";

const Navigation = () => {
  const location = useLocation();

  // Hide nav on specific pages
  const hideNavOn = ["/driver-order", "/some-other-page"];
  if (hideNavOn.includes(location.pathname)) return null;

  return (
    <nav>
      <Link to="/">User Page</Link> | <Link to="/driver">Driver</Link>
    </nav>
  );
};

const AppRoutes = () => (
  <>
    <Navigation />
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/driver" element={<Driver />} />
      <Route path="/driver-order" element={<DriverOrder />} />
    </Routes>
  </>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the User Dashboard</h1>

        {/* Navigation Links */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/chat">ChatBox</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/chat" element={<ChatBox />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
