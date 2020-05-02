import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import BookUploadForm from "./BookUploadForm";
import EditBookScreen from "./EditBookScreen";
import { HashRouter, Route, Redirect } from "react-router-dom";

const App = () => {
  const [bookContent, setBookContent] = useState(null);

  const getBookContentFromServer = () => {
    console.warn("Not implemented getBookContentFromServer. Returning null.");
    return null;
  };

  useEffect(() => {
    const bookContent = getBookContentFromServer();
    setBookContent(bookContent);
  }, []);

  return (
    <HashRouter>
      <Route exact path="/edit">
        <EditBookScreen bookContent={bookContent} />
      </Route>
      <Route exact path="/upload">
        <BookUploadForm setBookContent={setBookContent} />
      </Route>
      <Redirect exact from="/" to={bookContent ? "/edit" : "/upload"} />
    </HashRouter>
  );
};

export default React.memo(App);
