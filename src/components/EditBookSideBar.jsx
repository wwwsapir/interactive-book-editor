import React, { useState } from "react";
import "./EditBookSideBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const EditBookSideBar = (props) => {
  return (
    <div className="wrapper d-flex side-bar">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Edit Book</h3>
        </div>

        <ul className="list-unstyled components">
          <p>Option</p>
          <li className="active side-bar-item">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Display
            </a>
            <ul className="list-unstyled" id="homeSubmenu">
              <li>
                <a href="#" className="side-bar-item-sub">
                  Book
                </a>
              </li>
              <li>
                <a href="#" className="side-bar-item-sub">
                  Current Episode
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="side-bar-item">
              Mark Chapter Headers
            </a>
          </li>
          <li>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle side-bar-item"
            >
              Filter
            </a>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="side-bar-item-sub">
                  {" "}
                  All
                </a>
              </li>
              <li>
                <a href="#" className="side-bar-item-sub">
                  Chapter Headers
                </a>
              </li>
              <li>
                <a href="#" className="side-bar-item-sub">
                  Trigger Lines Only
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="side-bar-item">
              Save Checkpoint
            </a>
          </li>
          <li>
            <a href="#" className="side-bar-item">
              Choose Another Book
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(EditBookSideBar);
