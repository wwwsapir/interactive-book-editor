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
import TriggersPopUp from "./TriggersPopUp";

const EditBookScreen = (props) => {
  const bookContent = props.bookContent;

  const [logicalLines, setLogicalLines] = useState(null);
  const [display, setDisplay] = useState(DISPLAY.wholeBook);
  const [filter, setFilter] = useState(FILTER.none);
  const [splitPattern, setSplitPattern] = useState(SPLIT_PATTERN.sentences);
  const [isLoading, setIsLoading] = useState(bookContent ? true : false);
  const [menuLineId, setMenuLineId] = useState(null);
  const [menuSentenceId, setMenuSentenceId] = useState(null);
  const [menuLineHtml, setMenuLineHtml] = useState(null);
  const [showTriggersPopUp, setShowTriggersPopUp] = useState(false);
  const [menuTriggers, setMenuTriggers] = useState([]);

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

  const getPartsAccordingToHtmlTags = (lineList) => {
    let currentlyOpenTags = [];
    let returnList = [];
    for (let i = 0; i < lineList.length; i++) {
      let sentence = lineList[i].split(/<\/?/).join("%%<");
      sentence = sentence.split(">").join(">%%");
      const sentenceSplitList = sentence.split("%%");
      const returnSentenceList = [];
      for (let j = 0; j < sentenceSplitList.length; j++) {
        const match = sentenceSplitList[j].match(getHtmlTagsRegex());
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
        } else if (sentenceSplitList[j] !== "") {
          returnSentenceList.push({
            text: sentenceSplitList[j],
            tags: [...currentlyOpenTags],
          });
        }
      }
      returnList[i] = {
        parts: [...returnSentenceList],
        header: isSentenceHeader(returnSentenceList),
        sentenceId: i,
        triggers: [],
      };
    }
    return returnList;
  };

  const prepareAndSetLogicalLines = () => {
    let lineLists = bookContent.split("</p><p>");
    lineLists = lineLists.map((lineList) =>
      lineList
        .split(". ")
        .join(".<p>")
        .split(/<\/?p>/)
        .filter((lineHtml) => lineHtml !== "")
    );
    const lineListsSplitToParts = lineLists.map((lineList, i) => {
      return { content: getPartsAccordingToHtmlTags(lineList), lineId: i };
    });
    setLogicalLines(lineListsSplitToParts);
    props.setBookData(lineListsSplitToParts);
  };

  useEffect(() => {
    if (bookContent) {
      setIsLoading(true);
      prepareAndSetLogicalLines();
      setIsLoading(false);
    }
  }, [bookContent]);

  const findLineHtml = (lineId, sentenceId) => {
    const line = logicalLines[lineId];
    if (sentenceId != null) {
      const sentence = line.content[sentenceId];
      return getSentenceHtml(sentence);
    } else {
      return getLineHtml(line);
    }
  };

  const findLineTriggers = (lineId, sentenceId) => {
    const line = logicalLines[lineId];
    if (sentenceId != null) {
      const sentence = line.content[sentenceId];
      return sentence.triggers;
    } else {
      let triggers = [];
      for (let i = 0; i < line.content.length; i++) {
        triggers = triggers.concat(line.content[i].triggers);
      }
      return triggers;
    }
  };

  const handleLineClick = (lineId, sentenceId) => {
    setMenuLineId(lineId);
    setMenuSentenceId(sentenceId);
    setMenuLineHtml(findLineHtml(lineId, sentenceId));
    setMenuTriggers(findLineTriggers(lineId, sentenceId));
    setShowTriggersPopUp(true);
  };

  const createLine = (line, i) => {
    return <Line line={line} key={i} onLineClick={handleLineClick} />;
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

  const getSentenceHtml = (sentence) => {
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
    return htmlSentence;
  };

  const renderSentences = () => {
    return logicalLines.map((line, l) => {
      return (
        <div key={line.lineId} className="line-wrapper">
          {line.content.map((sentence) => {
            let htmlSentence = getSentenceHtml(sentence);
            return createLine(
              {
                html: htmlSentence,
                header: sentence.header,
                lineId: line.lineId,
                sentenceId: sentence.sentenceId,
              },
              sentence.sentenceId
            );
          })}
        </div>
      );
    });
  };

  const getLineHtml = (line) => {
    let htmlLine = "";
    line.content.forEach((sentence) => {
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
    return htmlLine;
  };

  const renderLines = () => {
    return logicalLines.map((line) => {
      let htmlLine = getLineHtml(line);
      return createLine(
        {
          html: htmlLine,
          header: line.content[0].header,
          lineId: line.lineId,
          sentenceId: null,
        },
        line.lineId
      );
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
            {showTriggersPopUp ? (
              <TriggersPopUp
                html={menuLineHtml}
                triggers={menuTriggers}
                closePopUp={() => setShowTriggersPopUp(false)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(EditBookScreen);
