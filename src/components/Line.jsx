import React from "react";
import "./Line.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Line = (props) => {
  const lineClass = `line line-text ${props.line.header ? "header" : ""}`;
  const addClass = `line edit-img ${props.line.header ? "header" : ""}`;

  return (
    <div className="row">
      <img
        className={addClass}
        title="Edit Properties"
        src={`${process.env.PUBLIC_URL}/images/edit.png`}
        alt="Edit Line Properties"
        onClick={() => props.onEditLineClick(props.line)}
      />
      <div
        className={lineClass}
        title="View Info"
        onClick={() => props.onLineClick(props.line)}
      >
        <label dangerouslySetInnerHTML={{ __html: props.line.html }}></label>
      </div>
    </div>
  );
};

export default React.memo(Line);
