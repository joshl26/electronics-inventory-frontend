/* eslint-disable no-unused-vars */
// src/components/features/notes/NoteList.jsx

import React from "react";
import Note from "./Note";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NoteList.scss";

const NoteList = ({ notes, filteredIds }) => {
  const { ids, entities } = notes;

  const tableContent =
    ids?.length &&
    filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

  return (
    <section>
      <div className="section-top-spacer"></div>
      <Row>
        <Col md={10}>
          <h1>Notes List</h1>
        </Col>
        <Col
          style={{
            display: "flex",
            textAlign: "right",
            alignItems: "center",
            justifyContent: "end",
          }}
          md={2}
        >
          <Link className="btn-text" to="/dash/notes/new">
            <Button className="btn-style">Add New Note</Button>
          </Link>
        </Col>
      </Row>
      <div className="vh3-spacer"></div>
      <div className="parts-container">
        <div className="parts-search-bar">
          <Row>
            <div className="vh2-spacer"></div>
            <Col style={{ textAlign: "center" }}>
              <Row style={{ textAlign: "left" }}>
                <p style={{ lineHeight: "0" }}>Search</p>
              </Row>
              <input
                name="searchNotes"
                className="parts-search-input"
                placeholder="Search notes..."
              />
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Row style={{ textAlign: "left" }}>
                <p style={{ lineHeight: "0" }}>Note Status</p>
              </Row>
              <Row>
                <Dropdown className="button-style">
                  <Dropdown.Toggle
                    className="parts-status-dropdown"
                    variant="success"
                    id="dropdown-basic"
                  >
                    All
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="parts-status-dropdown-menu">
                    <Dropdown.Item>Open</Dropdown.Item>
                    <Dropdown.Item>Completed</Dropdown.Item>
                    <Dropdown.Item>All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Row style={{ textAlign: "left" }}>
                <p style={{ lineHeight: "0" }}>Sort</p>
              </Row>
              <Row>
                <Dropdown>
                  <Dropdown.Toggle
                    className="parts-status-dropdown"
                    variant="success"
                    id="dropdown-basic"
                  >
                    All
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="parts-status-dropdown-menu">
                    <Dropdown.Item href="#/action-1">
                      Date Created
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Created By</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Description</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <Row style={{ textAlign: "left" }}>
                <p style={{ lineHeight: "0" }}>Type</p>
              </Row>
              <Row>
                <Dropdown>
                  <Dropdown.Toggle
                    className="parts-status-dropdown"
                    variant="success"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu className="parts-status-dropdown-menu">
                    <Dropdown.Item href="#/action-1">Resistor</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Capacitor</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
            </Col>
          </Row>
        </div>
        <table className="table table-notes">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th note-status">
                Note Status
              </th>
              <th scope="col" className="table__th note-created">
                Date Created
              </th>
              <th scope="col" className="table__th note-updated">
                Date Updated
              </th>
              <th scope="col" className="table__th note-title">
                Title
              </th>
              <th scope="col" className="table__th note-user">
                User
              </th>
              <th scope="col" className="table__th note-description">
                View Note
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    </section>
  );
};

export default NoteList;
