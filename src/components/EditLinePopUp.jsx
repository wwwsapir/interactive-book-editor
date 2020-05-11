import React, { useState, Fragment } from "react";
import "./EditLinePopUp.scss";
import { TRIGGER_TYPE } from "../constants";
import { SketchPicker } from "react-color";

const STAGES = {
  initial: "initial",
  chooseTriggerType: "chooseTriggerType",
  chooseColor: "chooseColor",
  uploadFile: "uploadFile",
};

const EditLinePopUp = (props) => {
  const [stage, setStage] = useState(STAGES.initial);
  const [triggerName, setTriggerName] = useState("");
  const [triggerType, setTriggerType] = useState(TRIGGER_TYPE.bgColor);
  const [triggerProperty, setTriggerProperty] = useState(null);

  const chooseAndSetValueStage = () => {
    setStage(
      triggerType === TRIGGER_TYPE.bgColor ||
        triggerType === TRIGGER_TYPE.fontColor
        ? STAGES.chooseColor
        : STAGES.uploadFile
    );
  };

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
            <button
              className="btn btn-success col"
              onClick={() => setStage(STAGES.chooseTriggerType)}
            >
              Add A New Trigger
            </button>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderStageTriggerType = () => {
    return (
      <Fragment>
        <input
          className="col form-control mt-4 mb-3"
          type="text"
          placeholder="Trigger Name"
          value={triggerName}
          onChange={(e) => setTriggerName(e.target.value)}
        />
        <label htmlFor="triggerType col">Choose Trigger Type:</label>
        <select
          id="triggerType col"
          value={triggerType}
          onChange={(e) => setTriggerType(e.target.value)}
        >
          <option value={TRIGGER_TYPE.bgColor}>Background Color</option>
          <option value={TRIGGER_TYPE.fontColor}>Font Color</option>
          <option value={TRIGGER_TYPE.bgImage}>Background Image</option>
          <option value={TRIGGER_TYPE.sound}>Sound or Music</option>
          <option value={TRIGGER_TYPE.animation}>Animation</option>
        </select>
        <div className="row mt-3">
          <div className="col-6">
            <button
              className="btn btn-success col"
              onClick={() => setStage(STAGES.initial)}
            >
              Back
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-success col"
              onClick={chooseAndSetValueStage}
            >
              Next
            </button>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderStage = () => {
    switch (stage) {
      case STAGES.initial:
        return renderStageInitial();
      case STAGES.chooseTriggerType:
        return renderStageTriggerType();
      case STAGES.chooseColor:
      case STAGES.uploadFile:
      default:
        console.error("Not implemented stage!", stage);
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
