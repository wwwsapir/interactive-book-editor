import React, { useState, Fragment } from "react";
import "./EditLinePopUp.scss";
import { TRIGGER_TYPE } from "../constants";
import { SketchPicker } from "react-color";

const STAGES = {
  initial: 0,
  chooseTriggerTypes: 1,
  chooseBackgrountColor: 2,
  uploadFile: 3,
};

const EditLinePopUp = (props) => {
  const [stage, setStage] = useState(STAGES.initial);
  const [triggerType, setTriggerType] = useState();

  const renderStageInitial = () => {
    return (
      <Fragment>
        <div className="col">
          <label htmlFor="isHeader">
            <input
              className="mr-1 mt-3"
              type="checkbox"
              id="isHeader"
              checked={props.isLineHeader}
              onChange={props.onToggleHeaderStatus}
            />
            Chapter Header
          </label>
        </div>
        <div className="menu-header mb-3 mt-4">Edit Triggers:</div>
        {props.triggers.length > 0 ? (
          <div className="row">
            {props.triggers.map((trigger, i) => (
              <div key={i}>
                <div className="col-sm-3">{"name:" + trigger.name}</div>
                <div className="col-sm-3">
                  {"trigger type:" + trigger.triggerType}
                </div>
                <div className="col-sm-3">{"value:" + trigger.valueName}</div>
                <div className="col-sm-3">
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
          <div className="col-6">
            <button className="btn btn-success col">Add A New Trigger</button>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderStage = () => {
    switch (stage) {
      case STAGES.initial:
        return renderStageInitial();
      case STAGES.chooseTriggerTypes:
      case STAGES.chooseBackgrountColor:
      case STAGES.uploadFile:
      default:
        console.error("Not implemented stage!");
        return null;
    }
  };

  return (
    <div className="edit-line-popup">
      <div className="menu flex-column">
        <div dangerouslySetInnerHTML={{ __html: '"' + props.html + '"' }}></div>
        {renderStage()}
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
