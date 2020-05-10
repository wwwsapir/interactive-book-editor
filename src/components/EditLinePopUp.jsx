import React, { Fragment } from "react";
import "./EditLinePopUp.scss";

const EditLinePopUp = (props) => {
  console.log(props);
  return (
    <div className="edit-line-popup">
      <div className="menu flex-column">
        <div dangerouslySetInnerHTML={{ __html: '"' + props.html + '"' }}></div>
        <div className="menu-header mb-3 mt-4">Edit Triggers:</div>
        {props.triggers.length > 0 ? (
          <div className="row">
            {props.triggers.map((trigger, i) => (
              <div key={i}>
                <div className="col-sm-2">{"name:" + trigger.name}</div>
                <div className="col-sm-2">
                  {"trigger type:" + trigger.triggerType}
                </div>
                <div className="col-sm-2">
                  {"event type:" + trigger.EventType}
                </div>
                <div className="col-sm-2">{"value:" + trigger.valueName}</div>
                <div className="col-sm-4">
                  <button className="btn btn-danger">
                    Remove This Trigger
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col ml-3">
              There are currently no assigned triggers.
            </div>
          </div>
        )}
        <div className="row mt-3">
          <div className="col-5 offset-1">
            <button className="btn btn-success col">Add A New Trigger</button>
          </div>
          <div className="col-5">
            <button className="btn btn-light col">Mark Line as Header</button>
          </div>
        </div>
        <div className="row mt-5">
          <button
            onClick={props.closePopUp}
            className="btn btn-danger col-4 offset-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditLinePopUp);
