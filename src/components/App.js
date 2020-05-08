import React, { useState, useEffect, Fragment } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Routes from "./Routes";

const App = () => {
  const [bookContent, setBookContent] = useState(null);
  const [pathName, setPathName] = useState(null);
  const [bookData, setBookData] = useState(null);

  const getBookContentFromServer = () => {
    console.warn("Not implemented getBookContentFromServer. Returning null.");
    return null;
  };

  useEffect(() => {
    const bookContent = getBookContentFromServer();
    setBookContent(bookContent);
  }, []);

  return (
    <Fragment>
      <HashRouter>
        <NavigationBar pathName={pathName} />
        <div className="header-space"></div>
        <Route path="/">
          <Routes
            setPathName={setPathName}
            bookContent={bookContent}
            setBookContent={setBookContent}
            bookData={bookData}
            setBookData={setBookData}
          />
        </Route>
      </HashRouter>
    </Fragment>
  );
};

export default React.memo(App);
