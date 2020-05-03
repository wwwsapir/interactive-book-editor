import React, { useEffect, Fragment } from "react";
import { useLocation, Route, Redirect } from "react-router-dom";
import BookUploadForm from "./BookUploadForm";
import EditBookScreen from "./EditBookScreen";

const Routes = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.setPathName(location.pathname);
  }, [location]);

  return (
    <Fragment>
      <Route exact path="/edit">
        <EditBookScreen bookContent={props.bookContent} />
      </Route>
      <Route exact path="/upload">
        <BookUploadForm setBookContent={props.setBookContent} />
      </Route>
      <Redirect exact from="/" to={props.bookContent ? "/edit" : "/upload"} />
    </Fragment>
  );
};

export default React.memo(Routes);
