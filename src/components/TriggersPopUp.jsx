import React from "react";
import "./TriggersPopUp.scss";

const TriggersPopUp = (props) => {
  //   console.log(props);
  return (
    <div className="triggers-popup">
      <div className="menu flex-column">
        <div dangerouslySetInnerHTML={{ __html: '"' + props.html + '"' }}></div>
        <div className="menu-header mb-4 mt-4">Assigned Triggers:</div>
        {props.triggers.map((trigger, i) => (
          <div key={i} className="row">
            <div className="col-sm-3">{trigger.name + ":"}</div>
            <div className="col-sm-3">{trigger.type + ":"}</div>
            <div className="col-sm-3">{trigger.valueName + ":"}</div>
            <div className="col-sm-3">
              <button className="btn btn-danger">Remove This Trigger</button>
            </div>
          </div>
        ))}
        <div className="row">
          <button onClick={props.closePopUp} className="btn btn-light col">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TriggersPopUp);
