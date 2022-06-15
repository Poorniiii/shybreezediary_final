import React from "react";
import "../styles.css";
import "./Signup";
import { Link, useNavigate } from "react-router-dom";

export default function LoginComponent() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `home`;
    navigate(path);
  };
  return (
    <div className="center">
      <h1> Shy Breeze Diary </h1>
      <h2>Login</h2>
      <div className="email">
        <input
          className="enterEmail"
          type="text"
          placeholder="Enter your registered email id"
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
        Don't have an account?
        <button className="button">
          <Link className="backArrow" to="/signup">
            Sign up
          </Link>
        </button>
      </div>
    </div>
  );
}
