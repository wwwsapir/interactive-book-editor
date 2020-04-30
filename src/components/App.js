import React, { useState, useEffect, Fragment } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import BookUploadForm from "./BookUploadForm";
import EditBookScreen from "./EditBookScreen";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  const [bookContent, setBookContent] = useState(null);

  const handleLoadBook = (html) => {
    setBookContent(html);
  };

  useEffect(() => {
    console.log("App Mounted");
    return () => {
      console.log("Unmounting App");
    };
  }, []);

  console.log(bookContent !== null);

  return (
    <Fragment>
      <Switch>
        <Route path="/upload">
          <BookUploadForm onLoadBook={handleLoadBook} />
        </Route>
        <Route path="/edit">
          <EditBookScreen bookContent={bookContent} />
        </Route>
        <Redirect exact from="/" to={bookContent ? "/edit" : "/upload"} />
      </Switch>
    </Fragment>
  );
};

export default React.memo(App);
