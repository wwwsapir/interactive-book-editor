import React from "react";
import "./Line.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Line = (props) => {
  const lineClass = `line line-text ${props.line.header ? "header" : ""}`;
  const addClass = `line add-img ${props.line.header ? "header" : ""}`;

  return (
    <div className="row">
      <img
        className={addClass}
        src={`${process.env.PUBLIC_URL}/images/add.png`}
        alt="Add Trigger"
      />
      <div
        className={lineClass}
        onClick={() =>
          props.onLineClick(props.line.lineId, props.line.sentenceId)
        }
      >
        <label dangerouslySetInnerHTML={{ __html: props.line.html }}></label>
      </div>
    </div>
  );
};

export default React.memo(Line);
