import React from "react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import ListOfNotes from "./ListOfNotes";
import "../styles.css";
import { Link } from "react-router-dom";
import home from "../images/home.svg";
import removeArchive from "../images/removearchive.svg";
import removeFav from "../images/removefav.svg";

export default function Home() {
  return (
    <>
      <div className="menuBar">
        <Link className="homecenter" to="/home">
          <h1> Shy Breeze Diary </h1>
        </Link>
        <hr />
        <Row className="menu">
          <Col>
            <Link className="menu" to="/home">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip placement="top">Home</Tooltip>}
              >
                <img className="mobileMenuImg" src={home} alt="Home" />
              </OverlayTrigger>
              <h4 className="desktopMenuText">Home</h4>
            </Link>
          </Col>
          <Col>
            <Link className="menu" to="/favorites">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip placement="top">Favorites</Tooltip>}
              >
                <img className="mobileMenuImg" src={removeFav} alt="Home" />
              </OverlayTrigger>
              <h4 className="desktopMenuText">Favorites</h4>
            </Link>
          </Col>
          <Col>
            <Link className="menu" to="/archives">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip placement="top">Archives</Tooltip>}
              >
                <img className="mobileMenuImg" src={removeArchive} alt="Home" />
              </OverlayTrigger>
              <h4 className="desktopMenuText">Archives</h4>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="pagesList">
        <ListOfNotes />
      </div>
    </>
  );
}
