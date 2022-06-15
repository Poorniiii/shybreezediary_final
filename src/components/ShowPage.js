import React from "react";
import { Modal, ModalTitle, ModalBody, Row, Col } from "react-bootstrap";
import "../styles.css";
import close from "../images/close.svg";

const ShowPage = (props) => {
  const hideNewPage = () => {
    props.onHide(false);
  };

  return (
    <div>
      <Modal backdrop="static" show={props.show} onHide={hideNewPage}>
        <ModalTitle>
          <Row>
            <Col md={10}>
              <p id="noteTitle" className="showTitle">
                {props.showTitle}
              </p>
            </Col>
            <Col md={2}>
              <button className="closeButton" onClick={hideNewPage}>
                <img src={close} alt="Close" />
              </button>
            </Col>
          </Row>
        </ModalTitle>
        <hr />
        <ModalBody>
          <p id="noteContent" className="showContent">
            {props.showContent}
          </p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShowPage;
