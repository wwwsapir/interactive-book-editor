import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import BookUploadForm from "./BookUploadForm";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/upload" />
      <Route path="/upload">
        <BookUploadForm />
      </Route>
    </Switch>
  );
};

export default App;
