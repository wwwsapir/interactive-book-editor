import React, { useState } from "react";
import "./ReadBook.scss";

const ReadBook = (props) => {
  const renderSentences = () => {
    return props.bookData.map((line, l) => {
      return (
        <p key={l}>
          {line.map((sentence, i) => {
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
              <label
                dangerouslySetInnerHTML={{ __html: htmlSentence }}
                key={i}
                className={textClassName}
              ></label>
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
    return { backgroundColor: "white" };
  };

  return (
    <div className="container-fluid" style={getCurrentStyle()}>
      {props.bookData ? renderLinesFromData() : null}
    </div>
  );
};

export default React.memo(ReadBook);
