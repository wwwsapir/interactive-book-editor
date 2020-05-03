import React, { useState, useEffect } from "react";
import "./NavigationBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NavigationBar = (props) => {
  const [pathName, setPathName] = useState(null);

  useEffect(() => {
    const currentPath = props.pathName;
    setPathName(currentPath);
  }, [props.pathName]);

  const handleCollapseNavBar = () => {
    console.error("handleCollapseNavBar not implemented");
  };

  const renderActiveNavLink = (text) => {
    return <div className="link-active">{text}</div>;
  };

  const renderInactiveNavLink = (text, to) => {
    return (
      <Link to={to}>
        <div className="link">{text}</div>
      </Link>
    );
  };

  const navLinks = [
    { text: "About", to: "/about" },
    { text: "Upload a New Book File", to: "/upload" },
    { text: "Edit Book Triggers", to: "/edit" },
    { text: "Contact Us", to: "/contact" },
  ];

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-header">
          {/* <button
            type="button"
            className="navbar-toggle"
            onClick={handleCollapseNavBar}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button> */}
          <a className="navbar-brand" href="#">
            <img
              src={`${process.env.PUBLIC_URL}/images/temp_logo.png`}
              className="logo-img"
            />
          </a>
        </div>
        {navLinks.map(({ text, to }, i) => (
          <li key={i}>
            {to === pathName
              ? renderActiveNavLink(text)
              : renderInactiveNavLink(text, to)}
          </li>
        ))}
        <ul className="nav navbar-nav"></ul>
        <ul className="nav navbar-nav navbar-right">
          <li>{renderInactiveNavLink("Login", "/login")}</li>
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(NavigationBar);
