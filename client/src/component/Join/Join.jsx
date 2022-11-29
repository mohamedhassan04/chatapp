import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
  user = document.getElementById("join-input").value;
  document.getElementById("join-input").value = "";
};
const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="join-page">
      <div className="join-container">
        <img src={logo} alt="logo" />
        <h1>Welcome To Talk</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          id="join-input"
        />
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={sendUser} className="join-btn">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
