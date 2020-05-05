import React from "react";
import "./EditBookSideBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { DISPLAY, FILTER, SPLIT_PATTERN } from "../constants";

const EditBookSideBar = (props) => {
  return (
    <div className="wrapper side-bar p-0 pt-4 m-0">
      <nav id="sidebar" className="fixed-pos row p-0 m-0">
        <ul className="list-unstyled col">
          <div>
            <h3>
              <b>Edit Book</b>
            </h3>
          </div>
          <li>
            <div className="side-bar-item col">
              <label className="side-bar-item-text">Mark Chapter Headers</label>
            </div>
          </li>
          <li>
            <div className="side-bar-item col">
              <label className="dropdown-toggle side-bar-item-text">
                Display
              </label>
            </div>
            <ul className="list-unstyled" id="homeSubmenu">
              <li>
                <div
                  onClick={() => props.setDisplay(DISPLAY.wholeBook)}
                  className={`side-bar-item-sub col${
                    props.display === DISPLAY.wholeBook ? " selected" : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">Whole Book</label>
                </div>
              </li>
              <li>
                <div
                  onClick={() => props.setDisplay(DISPLAY.currentChapter)}
                  className={`side-bar-item-sub col${
                    props.display === DISPLAY.currentChapter ? " selected" : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">
                    Current Chapter
                  </label>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="side-bar-item col">
              <label className="dropdown-toggle side-bar-item-text">
                Split by
              </label>
            </div>
            <ul className="list-unstyled" id="homeSubmenu">
              <li>
                <div
                  onClick={() => props.setSplitPattern(SPLIT_PATTERN.sentences)}
                  className={`side-bar-item-sub col${
                    props.splitPattern === SPLIT_PATTERN.sentences
                      ? " selected"
                      : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">Sentences</label>
                </div>
              </li>
              <li>
                <div
                  onClick={() => props.setSplitPattern(SPLIT_PATTERN.lines)}
                  className={`side-bar-item-sub col${
                    props.splitPattern === SPLIT_PATTERN.lines
                      ? " selected"
                      : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">Lines</label>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="side-bar-item col">
              <label className="dropdown-toggle side-bar-item-text">
                Filter
              </label>
            </div>
            <ul className="list-unstyled">
              <li>
                <div
                  onClick={() => props.setFilter(FILTER.none)}
                  className={`side-bar-item-sub col${
                    props.filter === FILTER.none ? " selected" : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">None</label>
                </div>
              </li>
              <li>
                <div
                  onClick={() => props.setFilter(FILTER.viewHeaders)}
                  className={`side-bar-item-sub col${
                    props.filter === FILTER.viewHeaders ? " selected" : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">View Headers</label>
                </div>
              </li>
              <li>
                <div
                  onClick={() => props.setFilter(FILTER.viewTriggerLines)}
                  className={`side-bar-item-sub col${
                    props.filter === FILTER.viewTriggerLines ? " selected" : ""
                  }`}
                >
                  <label className="side-bar-item-sub-text">
                    View Trigger Lines
                  </label>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="side-bar-item col">
              <label className="side-bar-item-text">Save Checkpoint</label>
            </div>
          </li>
          <li>
            <div className="side-bar-item last col">
              <label className="side-bar-item-text">Choose Another Book</label>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(EditBookSideBar);
