import React from "react";
import UserPage from "./UserPage"; // Import the UserPage component
import "./App.css"; // Optional: if you have a global stylesheet

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to the User Dashboard</h1>
      <UserPage /> {/* Render the UserPage component here */}
    </div>
  );
};

export default App;