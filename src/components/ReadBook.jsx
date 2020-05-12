import React, { Fragment, useState } from "react";
import "./ReadBook.scss";
import { TRIGGER_TYPE, TO_COLOR_CSS_STRING } from "../constants";

const ReadBook = (props) => {
  const [bgColor, setBgColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [bgImage, setBgImage] = useState(null);
  const [fontColor, setFontColor] = useState({ r: 0, g: 0, b: 0, a: 1 });

  const invokeTriggers = (triggersList) => {
    triggersList.forEach((trigger) => {
      switch (trigger.type) {
        case TRIGGER_TYPE.bgColor:
          setBgColor(trigger.property);
          break;
        case TRIGGER_TYPE.bgImage:
          setBgImage(trigger.property);
          break;
        case TRIGGER_TYPE.fontColor:
          setFontColor(trigger.property);
        case TRIGGER_TYPE.sound:
        case TRIGGER_TYPE.animation:
        default:
          console.warn("Not implemented trigger type:", trigger.type);
      }
    });
  };

  const renderSentences = () => {
    return props.bookData.map((line, l) => {
      return (
        <p key={l}>
          {line.content.map((sentence, i) => {
            let htmlSentence = "";
            sentence.parts.forEach((part) => {
              part.tags.forEach((tag) => {
                htmlSentence += `<${tag}>`;
              });
              htmlSentence += part.text + " ";
              part.tags
                .slice(0)
                .reverse()
                .forEach((tag) => {
                  htmlSentence += `</${tag}>`;
                });
            });
            const textClassName =
              (sentence.header ? "header" : "line") + "-read mr-1";
            return (
              <label key={i} className="d-inline">
                {sentence.triggers.length > 0 ? (
                  <button
                    className="trigger-button mx-1"
                    onClick={() => invokeTriggers(sentence.triggers)}
                  ></button>
                ) : null}
                <label
                  dangerouslySetInnerHTML={{ __html: htmlSentence }}
                  className={textClassName}
                ></label>
              </label>
            );
          })}
        </p>
      );
    });
  };

  const renderLinesFromData = () => {
    return renderSentences();
  };

  const getCurrentStyle = () => {
    return {
      background: `url(${bgImage})`,
      backgroundColor: TO_COLOR_CSS_STRING(bgColor),
      color: TO_COLOR_CSS_STRING(fontColor),
    };
  };

  return (
    <div className="container-fluid" style={getCurrentStyle()}>
      {props.bookData ? renderLinesFromData() : null}
    </div>
  );
};

export default React.memo(ReadBook);
