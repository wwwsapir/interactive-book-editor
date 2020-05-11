import React, { Fragment } from "react";
import "./TriggersPopUp.scss";
import { TO_COLOR_CSS_STRING, TRIGGER_TYPE } from "../constants";

const TriggersPopUp = (props) => {
  const renderTriggerProperty = (trigger) => {
    if (
      trigger.type === TRIGGER_TYPE.bgColor ||
      trigger.type === TRIGGER_TYPE.fontColor
    ) {
      return (
        <div>
          <div
            className="color-preview"
            style={{ backgroundColor: TO_COLOR_CSS_STRING(trigger.property) }}
          ></div>
        </div>
      );
    }
  };

  return (
    <div className="triggers-popup">
      <div className="menu flex-column">
        <div dangerouslySetInnerHTML={{ __html: '"' + props.html + '"' }}></div>
        <div className="menu-header mb-3 mt-4">Assigned Triggers:</div>
        {props.triggers.length > 0 ? (
          <Fragment>
            <div className="row mb-2">
              <div className="col-4 font-weight-bold">{"Name:"}</div>
              <div className="col-4 font-weight-bold">{"Type:"}</div>
              <div className="col-4 font-weight-bold">{"Property:"}</div>
            </div>
            {props.triggers.map((trigger, i) => (
              <div key={i} className="row mb-1">
                <div className="col-4">{trigger.name}</div>
                <div className="col-4">{trigger.type}</div>
                <div className="col-4">{renderTriggerProperty(trigger)}</div>
              </div>
            ))}
          </Fragment>
        ) : (
          <div className="row mb-4">
            <div className="col ml-3">
              There are currently no assigned triggers.
            </div>
          </div>
        )}
        <div className="row">
          <button
            onClick={props.closePopUp}
            className="btn btn-light col-4 offset-4 mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TriggersPopUp);
