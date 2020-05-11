import React, { useState, Fragment } from "react";
import "./EditLinePopUp.scss";
import { TRIGGER_TYPE, TO_COLOR_CSS_STRING } from "../constants";
import { SketchPicker } from "react-color";

const STAGES = {
  initial: "initial",
  chooseTriggerType: "chooseTriggerType",
  chooseColor: "chooseColor",
  uploadFile: "uploadFile",
};

const defaultColorWhite = {
  r: "255",
  g: "255",
  b: "255",
  a: "1",
};

const EditLinePopUp = (props) => {
  const [stage, setStage] = useState(STAGES.initial);
  const [triggerName, setTriggerName] = useState("");
  const [triggerType, setTriggerType] = useState(TRIGGER_TYPE.bgColor);
  const [file, setFile] = useState(null);
  const [color, setColor] = useState(defaultColorWhite);

  const initializeState = () => {
    setTriggerName("");
    setTriggerType(TRIGGER_TYPE.bgColor);
    setColor(defaultColorWhite);
    setFile(null);
    setStage(STAGES.initial);
  };

  const isPropertyColor = () => {
    return (
      triggerType === TRIGGER_TYPE.bgColor ||
      triggerType === TRIGGER_TYPE.fontColor
    );
  };

  const handleFinishAddingTrigger = () => {
    props.onAddTrigger({
      name: triggerName,
      type: triggerType,
      property: isPropertyColor() ? color : file,
    });
    initializeState();
  };

  const chooseAndSetValueStage = () => {
    setStage(isPropertyColor() ? STAGES.chooseColor : STAGES.uploadFile);
  };

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
          <Fragment>
            <div className="row mb-2">
              <div className="col-3 font-weight-bold">{"Name:"}</div>
              <div className="col-3 font-weight-bold">{"Type:"}</div>
              <div className="col-3 font-weight-bold">{"Property:"}</div>
            </div>
            {props.triggers.map((trigger, i) => (
              <div key={i} className="row mb-1">
                <div className="col-3">{trigger.name}</div>
                <div className="col-3">{trigger.type}</div>
                <div className="col-3">{renderTriggerProperty(trigger)}</div>
                <div className="col-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => props.onRemoveTrigger(trigger)}
                  >
                    Remove Trigger
                  </button>
                </div>
              </div>
            ))}
          </Fragment>
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
          <option value={TRIGGER_TYPE.bgColor}>{TRIGGER_TYPE.bgColor}</option>
          <option value={TRIGGER_TYPE.fontColor}>
            {TRIGGER_TYPE.fontColor}
          </option>
          <option value={TRIGGER_TYPE.bgImage}>{TRIGGER_TYPE.bgImage}</option>
          <option value={TRIGGER_TYPE.sound}>Sound or Music</option>
          <option value={TRIGGER_TYPE.animation}>
            {TRIGGER_TYPE.animation}
          </option>
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
              disabled={!triggerName}
            >
              Next
            </button>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderStageChooseColor = () => {
    return (
      <Fragment>
        <div className="nav-item col">
          <label className="mb-2 mt-3">Choose A Color:</label>
          <SketchPicker
            color={color}
            onChange={(color) => setColor(color.rgb)}
          />
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <button
              className="btn btn-success col"
              onClick={() => setStage(STAGES.chooseTriggerType)}
            >
              Back
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-success col"
              onClick={handleFinishAddingTrigger}
              disabled={!color}
            >
              Finish
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
        return renderStageChooseColor();
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
