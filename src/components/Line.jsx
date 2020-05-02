import React, { useState } from "react";
import "./Line.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Line = (props) => {
  const lineClass = `line col-11 ${props.line.header ? "header" : ""}`;
  const addClass = `line col-1 add-img ${props.line.header ? "header" : ""}`;
  return (
    <div className="row">
      <img
        className={addClass}
        src={`${process.env.PUBLIC_URL}/images/add.png`}
      />
      <div className={lineClass}>
        <label dangerouslySetInnerHTML={{ __html: props.line.html }}></label>
      </div>
    </div>
  );
};

export default React.memo(Line);
