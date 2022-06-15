import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPage, updatePage, sortPages } from "../features/pageSlice";
import {
  Modal,
  ModalTitle,
  ModalBody,
  Row,
  Col,
  Button,
  ModalFooter,
  Toast,
  ToastContainer
} from "react-bootstrap";
import "../styles.css";
import close from "../images/close.svg";

export default function CreateNewPage(props) {
  const currentTitle = useRef(null);
  const currentContent = useRef(null);
  const [saveToast, setsaveToast] = useState(false);
  const [submitToast, setsubmitToast] = useState(false);
  const dispatch = useDispatch();
  const date = new Date();
  const noteId = props.pageId;
  const draftId = props.draftId;

  const addNewPage = (
    noteId,
    noteTitle,
    noteContent,
    noteDate,
    isArchive,
    isFavorite,
    isSubmitted
  ) => {
    dispatch(
      addPage({
        pageId: noteId,
        pageTitle: noteTitle,
        pageContent: noteContent,
        pageDate: noteDate,
        isArchive: isArchive,
        isFavorite: isFavorite,
        isSubmitted: isSubmitted
      })
    );
  };
  const updateCurrentPage = (
    draftId,
    noteTitle,
    noteContent,
    noteDate,
    isArchive,
    isFavorite,
    isSubmitted
  ) => {
    dispatch(
      updatePage({
        pageId: draftId,
        pageTitle: noteTitle,
        pageContent: noteContent,
        pageDate: noteDate,
        isArchive: isArchive,
        isFavorite: isFavorite,
        isSubmitted: isSubmitted
      })
    );
  };
  const sortPagesList = () => {
    dispatch(sortPages());
  };
  const noteDate = date.toLocaleString("en-GB", "dd-mm-yyyy").substring(0, 10);
  const handleSubmit = () => {
    if (props.isDraft) {
      updateCurrentPage(
        draftId,
        currentTitle.current.value,
        currentContent.current.value,
        noteDate,
        false,
        false,
        true
      );
    } else {
      addNewPage(
        noteId,
        currentTitle.current.value,
        currentContent.current.value,
        noteDate,
        false,
        false,
        true
      );
      sortPagesList();
    }
    showSubmitToast();
  };
  const handleSave = () => {
    addNewPage(
      noteId,
      currentTitle.current.value,
      currentContent.current.value,
      noteDate,
      false,
      false,
      false
    );
    sortPagesList();
    showSaveToast();
  };
  const handleUpdate = () => {
    updateCurrentPage(
      draftId,
      currentTitle.current.value,
      currentContent.current.value,
      noteDate,
      false,
      false,
      false
    );
    showSaveToast();
  };
  const hideNewPage = () => {
    props.onHide(false);
  };
  const showSaveToast = () => {
    setsaveToast(true);
    props.onHide(false);
  };
  const hideSaveToast = () => {
    setsaveToast(false);
  };
  const showSubmitToast = () => {
    setsubmitToast(true);
    props.onHide(false);
  };
  const hideSubmitToast = () => {
    setsubmitToast(false);
  };
  return (
    <div>
      {saveToast ? (
        <ToastContainer className="saveToast" position="middle-center">
          <Toast
            className="bg-secondary"
            show={saveToast}
            delay={2000}
            onClose={hideSaveToast}
            autohide
          >
            <Toast.Body className="bg-secondary saveToastText">
              Saved
            </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ""
      )}
      {submitToast ? (
        <ToastContainer className="saveToast" position="middle-center">
          <Toast
            className="bg-secondary"
            show={submitToast}
            delay={4000}
            onClose={hideSubmitToast}
            autohide
          >
            <Toast.Body className="bg-secondary saveToastText">
              Submitted
            </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ""
      )}
      <Modal backdrop="static" show={props.show} onHide={hideNewPage}>
        <ModalTitle>
          <Row>
            <Col md={10}>
              <input
                ref={currentTitle}
                defaultValue={props.isDraft ? props.draftTitle : ""}
                id="noteTitle"
                className="enterTitle"
                type="text"
                placeholder="Enter your title"
                //onInput={(e) => handleNoteTitle(e.target.value)}
                //onChange={(e) => handleNoteTitle(e.target.value)}
              />
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
          <textarea
            ref={currentContent}
            defaultValue={props.isDraft ? props.draftContent : ""}
            id="noteContent"
            className="enterNotes"
            placeholder="Enter your note"
            //onInput={(e) => handleNoteContent(e.target.value)}
            //onChange={(e) => handleNoteContent(e.target.value)}
          ></textarea>
        </ModalBody>
        <p className="note">Note: Once submitted, page cannot be edited.</p>
        <ModalFooter className="modalFooter">
          {props.isDraft ? (
            <Button className="saveNotes" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button className="saveNotes" onClick={handleSave}>
              Save
            </Button>
          )}
          <Button className="submitNotes" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
