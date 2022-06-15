import "./styles.css";
import React from "react";
import LoginComponent from "./components/Login";
import Home from "./components/Home";
import SignupComponent from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Archives from "./components/Archives";
import Favorites from "./components/Favorites";

export default function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}
