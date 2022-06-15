import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import "../styles.css";
import CreateNewPage from "./NewPage";
import { updatePage, deletePage, sortPages } from "../features/pageSlice";
import { useDispatch } from "react-redux";
import ShowPage from "./ShowPage";
import addArchive from "../images/addarchive.svg";
import addFav from "../images/addfav.svg";
import addnewPage from "../images/newpage.svg";
import removeFav from "../images/removefav.svg";
import editPage from "../images/edit.svg";
import sort from "../images/sort.svg";
import deleteThisPage from "../images/delete.svg";

export default function ListOfNotes() {
  const pagesList = useSelector((state) => state.pages.pageData);
  const [newPage, setNewPage] = useState(false);
  const [isShowPage, setShowPage] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftId, setDraftId] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showContent, setShowContent] = useState("");
  const [showId, setShowId] = useState(0);
  const dispatch = useDispatch();
  const newDate = new Date();
  const today = newDate.toLocaleString("en-GB", "dd-mm-yyyy").substring(0, 10);
  const openNewPage = () => {
    sortPagesList();
    setNewPage(true);
    setIsDraft(false);
    setDraftTitle("");
    setDraftContent("");
  };
  const openDraft = (id, title, content) => {
    setNewPage(true);
    setIsDraft(true);
    setDraftTitle(title);
    setDraftContent(content);
    setDraftId(id);
  };
  const updateNote = (
    draftId,
    noteTitle,
    noteContent,
    isArchive,
    isFavorite,
    isSubmitted
  ) => {
    dispatch(
      updatePage({
        pageId: draftId,
        pageTitle: noteTitle,
        pageContent: noteContent,
        isArchive: isArchive,
        isFavorite: isFavorite,
        isSubmitted: isSubmitted
      })
    );
  };
  const deleteNote = (noteId) => {
    dispatch(
      deletePage({
        pageId: noteId
      })
    );
  };
  const sortPagesList = () => {
    dispatch(sortPages());
  };
  const showPage = (id, title, content) => {
    setShowPage(true);
    setShowTitle(title);
    setShowContent(content);
    setShowId(id);
  };
  return (
    <>
      <div className="listOfNotes">
        <Row>
          <Col md={4} xs={7} lg={4} sm={3}>
            <h2>List of Notes</h2>
          </Col>
          {/* <Col md={4} xs={2} lg={4} sm={2}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip placement="top">
                  Sort pages based on created date
                </Tooltip>
              }
            >
              <button className="button" onClick={sortPagesList}>
                <img src={sort} alt="Add page" />
              </button>
            </OverlayTrigger>
          </Col> */}
          <Col md={4} xs={2} lg={4} sm={2}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip placement="top">Add New Page</Tooltip>}
            >
              <button className="button" onClick={openNewPage}>
                <img src={addnewPage} alt="Add page" />
              </button>
            </OverlayTrigger>
          </Col>
        </Row>
        <hr />
        <CreateNewPage
          show={newPage}
          onHide={() => setNewPage(false)}
          draftTitle={draftTitle}
          draftContent={draftContent}
          draftId={draftId}
          isDraft={isDraft}
          pageId={
            pagesList.length !== 0
              ? pagesList[pagesList.length - 1].pageId + 1
              : 1
          }
        />
        <ShowPage
          show={isShowPage}
          onHide={() => setShowPage(false)}
          showTitle={showTitle}
          showContent={showContent}
          showId={showId}
        />
        {pagesList ? (
          pagesList.map((data) => {
            return (
              <div key={data.pageId}>
                {!data.isArchive ? (
                  <div>
                    <Row>
                      <Col md={6} xs={6}>
                        <h2>
                          <button
                            className="showPageTitle"
                            onClick={() =>
                              showPage(
                                data.pageId,
                                data.pageTitle,
                                data.pageContent
                              )
                            }
                          >
                            <b className="mobileFontTitle">
                              {data.pageTitle.substring(0, 10)}...
                            </b>
                          </button>
                        </h2>
                      </Col>
                      <Col md={2} xs={5}>
                        <i className="mobileFontDate">{data.pageDate}</i>
                      </Col>
                      <Col md={1} xs={2}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip placement="top">Archive Page</Tooltip>
                          }
                        >
                          <button
                            className="button"
                            onClick={() =>
                              updateNote(
                                data.pageId,
                                data.pageTitle,
                                data.pageContent,
                                true,
                                data.isFavorite,
                                data.isSubmitted
                              )
                            }
                          >
                            <img src={addArchive} alt="Archive page" />
                          </button>
                        </OverlayTrigger>
                      </Col>
                      <Col md={1} xs={2}>
                        {data.isFavorite ? (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip placement="top">
                                Remove from Favorites
                              </Tooltip>
                            }
                          >
                            <button
                              className="button"
                              onClick={() =>
                                updateNote(
                                  data.pageId,
                                  data.pageTitle,
                                  data.pageContent,
                                  data.isArchive,
                                  false,
                                  data.isSubmitted
                                )
                              }
                            >
                              <img src={removeFav} alt="Remove favorite" />
                            </button>
                          </OverlayTrigger>
                        ) : (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip placement="top">
                                Add to Favorites
                              </Tooltip>
                            }
                          >
                            <button
                              className="button"
                              onClick={() =>
                                updateNote(
                                  data.pageId,
                                  data.pageTitle,
                                  data.pageContent,
                                  data.isArchive,
                                  true,
                                  data.isSubmitted
                                )
                              }
                            >
                              <img src={addFav} alt="Add favorite" />
                            </button>
                          </OverlayTrigger>
                        )}
                      </Col>
                      <Col md={1} xs={2}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip placement="top">Delete Page</Tooltip>
                          }
                        >
                          <button
                            className="button"
                            onClick={() => deleteNote(data.pageId)}
                          >
                            <img src={deleteThisPage} alt="Delete page" />
                          </button>
                        </OverlayTrigger>
                      </Col>
                      <Col md={1} xs={1}>
                        {!data.isSubmitted && today === data.pageDate ? (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip placement="top">Edit Page</Tooltip>
                            }
                          >
                            <button
                              className="button"
                              onClick={(e) =>
                                openDraft(
                                  data.pageId,
                                  data.pageTitle,
                                  data.pageContent
                                )
                              }
                            >
                              <img src={editPage} alt="Edit page" />
                            </button>
                          </OverlayTrigger>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <p className="mobileFontContent">
                      {data.pageContent.substring(0, 50)}...
                    </p>
                    <hr />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })
        ) : (
          <p>No page(s) created. Click on +Page to create new page.</p>
        )}
      </div>
    </>
  );
}
