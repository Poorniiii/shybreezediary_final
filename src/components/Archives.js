import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import "../styles.css";
import { Link } from "react-router-dom";
import { updatePage, sortPages } from "../features/pageSlice";
import { useDispatch } from "react-redux";
import ShowPage from "./ShowPage";
import removeArchive from "../images/removearchive.svg";
import backArrow from "../images/backarrow.svg";
import sort from "../images/sort.svg";

export default function Archives() {
  const pagesList = useSelector((state) => state.pages.pageData);
  const [isShowPage, setShowPage] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showContent, setShowContent] = useState("");
  const [showId, setShowId] = useState(0);
  const dispatch = useDispatch();
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
      <div className="archives">
        <div className="listOfNotes">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip placement="right">Back to Home</Tooltip>}
          >
            <button className="button">
              <Link className="backArrow" to="/home">
                <img src={backArrow} alt="Back to Home" />
              </Link>
            </button>
          </OverlayTrigger>
          <Row>
            <Col md={6}>
              <h1 className="arcorfav"> Archives </h1>
            </Col>
            <Col md={1}>
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
            </Col>
          </Row>
          <hr />
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
                  {data.isArchive ? (
                    <div>
                      <Row>
                        <Col>
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
                              <b>{data.pageTitle}</b>
                            </button>
                          </h2>
                        </Col>
                        <Col>
                          <i>{data.pageDate}</i>
                        </Col>
                        <Col>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip placement="top">Unarchive Page</Tooltip>
                            }
                          >
                            <button
                              className="button"
                              onClick={() =>
                                updateNote(
                                  data.pageId,
                                  data.pageTitle,
                                  data.pageContent,
                                  false,
                                  data.isFavorite,
                                  data.isSubmitted
                                )
                              }
                            >
                              <img src={removeArchive} alt="Remove page" />
                            </button>
                          </OverlayTrigger>
                        </Col>
                      </Row>
                      <h6>{data.pageContent.substring(0, 50)}...</h6>
                      <hr />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <p>
              No page(s) archived. Click on Add to Archive to archive a page.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
