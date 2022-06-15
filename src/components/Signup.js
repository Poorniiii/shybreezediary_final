import React from "react";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignupComponent() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <div className="center">
      <h1> Shy Breeze Diary </h1>
      <h2>SignUp</h2>
      <div className="email">
        <input
          className="enterEmail"
          type="text"
          placeholder="Enter your email id"
        />
      </div>
      <div className="name">
        <input
          className="enterName"
          type="text"
          placeholder="Enter your name"
        />
      </div>
      <div className="password">
        <input
          className="enterPassword"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <div className="submit">
        <button className="button" onClick={routeChange}>
          Submit
        </button>
      </div>
      <div>
        Already a user?
        <button className="button">
          <Link to="/" className="backArrow">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
