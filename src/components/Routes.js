import React, { useEffect, Fragment, useState } from "react";
import { useLocation, Route, Redirect } from "react-router-dom";
import BookUploadForm from "./BookUploadForm";
import EditBookScreen from "./EditBookScreen";
import ReadBook from "./ReadBook";

const Routes = (props) => {
  const location = useLocation();
  const {
    setPathName,
    setBookContent,
    bookContent,
    bookData,
    setBookData,
  } = props;

  useEffect(() => {
    setPathName(location.pathname);
  }, [location, setPathName]);

  return (
    <Fragment>
      <Route exact path="/edit">
        <EditBookScreen bookContent={bookContent} setBookData={setBookData} />
      </Route>
      <Route exact path="/upload">
        <BookUploadForm setBookContent={setBookContent} />
      </Route>
      <Route exact path="/preview">
        <ReadBook bookData={bookData} />
      </Route>
      <Redirect exact from="/" to={bookContent ? "/edit" : "/upload"} />
    </Fragment>
  );
};

export default React.memo(Routes);
