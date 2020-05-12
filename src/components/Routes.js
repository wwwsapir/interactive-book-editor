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
    toUpload,
    bookData,
    setBookData,
    isLoading,
  } = props;

  useEffect(() => {
    setPathName(location.pathname);
  }, [location, setPathName]);

  return (
    <Fragment>
      <Route exact path="/edit">
        <EditBookScreen
          setBookData={setBookData}
          bookData={bookData}
          isLoading={isLoading}
        />
      </Route>
      <Route exact path="/upload">
        <BookUploadForm setBookContent={setBookContent} />
      </Route>
      <Route exact path="/preview">
        <ReadBook bookData={bookData} />
      </Route>
      <Redirect exact from="/" to={toUpload ? "/upload" : "/edit"} />
    </Fragment>
  );
};

export default React.memo(Routes);
