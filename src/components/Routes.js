import React, { useEffect, Fragment } from "react";
import { useLocation, Route, Redirect } from "react-router-dom";
import BookUploadForm from "./BookUploadForm";
import EditBookScreen from "./EditBookScreen";

const Routes = (props) => {
  const location = useLocation();
  const { setPathName, setBookContent, bookContent } = props;

  useEffect(() => {
    setPathName(location.pathname);
  }, [location, setPathName]);

  return (
    <Fragment>
      <Route exact path="/edit">
        <EditBookScreen bookContent={bookContent} />
      </Route>
      <Route exact path="/upload">
        <BookUploadForm setBookContent={setBookContent} />
      </Route>
      <Redirect exact from="/" to={bookContent ? "/edit" : "/upload"} />
    </Fragment>
  );
};

export default React.memo(Routes);