import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserPage from "./component/UserPage";
import ChatBox from "./component/ChatBox";

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
