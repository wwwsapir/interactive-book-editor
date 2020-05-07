import React, { useState, useEffect, Fragment } from "react";
import Line from "./Line";
import EditBookSideBar from "./EditBookSideBar";
import {
  DISPLAY,
  FILTER,
  SPLIT_PATTERN,
  HTML_TEXT_DECORATION_TAGS,
} from "../constants";
import "./EditBookScreen.scss";

const EditBookScreen = (props) => {
  const bookContent = props.bookContent;

  const [logicalLines, setLogicalLines] = useState(null);
  const [display, setDisplay] = useState(DISPLAY.wholeBook);
  const [filter, setFilter] = useState(FILTER.none);
  const [splitPattern, setSplitPattern] = useState(SPLIT_PATTERN.sentences);
  const [isLoading, setIsLoading] = useState(bookContent ? true : false);

  const isSentenceHeader = (sentencePartsList) => {
    if (!sentencePartsList[0]) {
      return false;
    }
    const firstPart = sentencePartsList[0].text;
    return /chapter/i.test(firstPart) || /episode/i.test(firstPart);
  };

  const getHtmlTagsRegex = () => {
    const matchStr = `<(${HTML_TEXT_DECORATION_TAGS.map(
      (tag) => `|(${tag})`
    )})>`
      .split(",")
      .join("")
      .replace("|", "");
    return new RegExp(matchStr);
  };

  const getPartsAccordingToHtmlTags = (paragraphList) => {
    let currentlyOpenTags = [];
    let returnList = [];
    for (let i = 0; i < paragraphList.length; i++) {
      let newParagraphList = paragraphList[i].split(/<\/?/).join("%%<");
      newParagraphList = newParagraphList.split(">").join(">%%");
      const paragraphListSplit = newParagraphList.split("%%");
      const returnSentenceList = [];
      for (let j = 0; j < paragraphListSplit.length; j++) {
        const match = paragraphListSplit[j].match(getHtmlTagsRegex());
        if (match) {
          if (match[1]) {
            const tagName = match[1];
            const index = currentlyOpenTags.indexOf(tagName);
            if (index > -1) {
              currentlyOpenTags.splice(index, 1);
            } else {
              currentlyOpenTags.push(tagName);
            }
          }
        } else if (paragraphListSplit[j] !== "") {
          returnSentenceList.push({
            text: paragraphListSplit[j],
            tags: [...currentlyOpenTags],
          });
        }
      }
      returnList[i] = {
        parts: [...returnSentenceList],
        header: isSentenceHeader(returnSentenceList),
        triggers: [],
      };
    }
    return returnList;
  };

  const prepareAndSetLogicalLines = () => {
    const lines = bookContent.split("</p><p>");
    let sentences = lines.map((line) =>
      line
        .split(". ")
        .join(".<p>")
        .split(/<\/?p>/)
        .filter((lineHtml) => lineHtml !== "")
    );
    sentences = sentences.map((paragraph) =>
      getPartsAccordingToHtmlTags(paragraph)
    );
    setLogicalLines(sentences);
  };

  useEffect(() => {
    if (bookContent) {
      setIsLoading(true);
      prepareAndSetLogicalLines();
      setIsLoading(false);
    }
  }, [bookContent]);

  const createLine = (line, i) => {
    return <Line line={line} key={i} index={i} />;
  };

  const renderDisplayedContent = () => {
    if (splitPattern === SPLIT_PATTERN.sentences) {
      return renderSentences();
    } else if (splitPattern === SPLIT_PATTERN.lines) {
      return renderLines();
    } else {
      return (
        <div>
          The "split by" value is not supported for this type of book file.
          Please change it to either lines or sentences.
        </div>
      );
    }
  };

  const renderSentences = () => {
    return logicalLines.map((line, l) => {
      return (
        <div key={l} className="line-wrapper">
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
            return createLine(
              { html: htmlSentence, header: sentence.header },
              i
            );
          })}
        </div>
      );
    });
  };

  const renderLines = () => {
    return logicalLines.map((line, i) => {
      let htmlLine = "";
      line.forEach((sentence) => {
        sentence.parts.forEach((part) => {
          part.tags.forEach((tag) => {
            htmlLine += `<${tag}>`;
          });
          htmlLine += part.text + " ";
          part.tags
            .slice(0)
            .reverse()
            .forEach((tag) => {
              htmlLine += `</${tag}>`;
            });
        });
      });
      return createLine({ html: htmlLine, header: line[0].header }, i);
    });
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="side-bar-bg floating-col">
            <EditBookSideBar
              display={display}
              filter={filter}
              setDisplay={setDisplay}
              setFilter={setFilter}
              splitPattern={splitPattern}
              setSplitPattern={setSplitPattern}
            />
          </div>
          <div className="side-bar-mock-filler floating-col"></div>
          <div className="main-edit-area floating-col">
            {logicalLines ? (
              renderDisplayedContent()
            ) : isLoading ? (
              <div>Loading book content...</div>
            ) : (
              <div>
                No book content to edit. Please use the upload page to upload a
                book file.
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(EditBookScreen);
