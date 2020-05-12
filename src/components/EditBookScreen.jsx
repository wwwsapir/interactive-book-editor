import React, { useState, useEffect, Fragment } from "react";
import Line from "./Line";
import EditBookSideBar from "./EditBookSideBar";
import { DISPLAY, FILTER, SPLIT_PATTERN } from "../constants";
import "./EditBookScreen.scss";
import TriggersPopUp from "./TriggersPopUp";
import EditLinePopUp from "./EditLinePopUp";
import CloneDeep from "lodash/cloneDeep";

const EditBookScreen = (props) => {
  const { bookData } = props;

  const [display, setDisplay] = useState(DISPLAY.wholeBook);
  const [filter, setFilter] = useState(FILTER.none);
  const [splitPattern, setSplitPattern] = useState(SPLIT_PATTERN.sentences);
  const [menuLineId, setMenuLineId] = useState(null);
  const [menuSentenceId, setMenuSentenceId] = useState(null);
  const [menuLineHtml, setMenuLineHtml] = useState(null);
  const [menuTriggers, setMenuTriggers] = useState([]);
  const [isLineHeader, setIsLineHeader] = useState(false);
  const [showTriggersPopUp, setShowTriggersPopUp] = useState(false);
  const [showEditLinePopUp, setShowEditLinePopUp] = useState(false);

  const setSelectedLineProperties = (line) => {
    setMenuLineId(line.lineId);
    setMenuSentenceId(line.sentenceId);
    setMenuLineHtml(line.html);
    setIsLineHeader(line.header);
    setMenuTriggers(line.triggers);
  };

  const handleLineClick = (line) => {
    setSelectedLineProperties(line);
    toggleShowTriggersPopUp();
  };

  const handleLineEditClick = (line) => {
    setSelectedLineProperties(line);
    toggleShowEditLinePopUp();
  };

  const createLine = (line, i) => {
    return (
      <Line
        line={line}
        key={i}
        onLineClick={handleLineClick}
        onEditLineClick={handleLineEditClick}
      />
    );
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
    return props.bookData.map((line, l) => {
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
                triggers: sentence.triggers,
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

  const getLineTriggers = (line) => {
    let triggers = [];
    for (let i = 0; i < line.content.length; i++) {
      const currSentence = line.content[i];
      triggers = triggers.concat(currSentence.triggers);
    }
    return triggers;
  };

  const getIsLineHeader = (line) => {
    for (let i = 0; i < line.content.length; i++) {
      const currSentence = line.content[i];
      if (currSentence.header) {
        return true;
      }
    }
    return false;
  };

  const renderLines = () => {
    return bookData.map((line) => {
      let htmlLine = getLineHtml(line);
      return createLine(
        {
          html: htmlLine,
          header: getIsLineHeader(line),
          lineId: line.lineId,
          sentenceId: null,
          triggers: getLineTriggers(line),
        },
        line.lineId
      );
    });
  };

  const toggleHeaderStatus = () => {
    const currentHeaderStatus = isLineHeader;
    setIsLineHeader(!currentHeaderStatus);
    const line = bookData[menuLineId];
    if (menuSentenceId !== null) {
      line.content[menuSentenceId].header = !currentHeaderStatus;
    } else {
      if (currentHeaderStatus) {
        // If canceling header - cancel in all sentences of the line
        for (let i = 0; i < line.content.length; i++) {
          line.content[i].header = false;
        }
      } else {
        // If marking header - mark only the first sentence of the line
        line.content[0].header = true;
      }
    }
  };

  const toggleShowTriggersPopUp = () => {
    setShowEditLinePopUp(false);
    setShowTriggersPopUp(!showTriggersPopUp);
  };

  const toggleShowEditLinePopUp = () => {
    setShowTriggersPopUp(false);
    setShowEditLinePopUp(!showEditLinePopUp);
  };

  const changeTriggersListInState = (changeTriggerListFunc, isRemove) => {
    let bookDataDeepCopy = CloneDeep(bookData);
    const lineCopy = bookDataDeepCopy[menuLineId];
    const triggersListCopy =
      lineCopy.content[menuSentenceId !== null ? menuSentenceId : 0].triggers;
    if (isRemove && menuSentenceId === null) {
      lineCopy.content.forEach((currSentence) =>
        changeTriggerListFunc(currSentence.triggers)
      );
    } else {
      changeTriggerListFunc(triggersListCopy);
    }

    props.setBookData(bookDataDeepCopy);
    if (menuSentenceId !== null) setMenuTriggers(triggersListCopy);
    else {
      let triggers = [];
      for (let i = 0; i < lineCopy.content.length; i++) {
        const currSentence = lineCopy.content[i];
        triggers = triggers.concat(currSentence.triggers);
      }
      setMenuTriggers(triggers);
    }
  };

  const handleAddTrigger = (trigger) => {
    changeTriggersListInState((triggersListCopy) => {
      triggersListCopy.push(trigger);
    });
  };

  const handleRemoveTrigger = (trigger) => {
    changeTriggersListInState((triggersListCopy) => {
      let index = -1;
      triggersListCopy.forEach((currTrigger, i) => {
        if (trigger.name === currTrigger.name) index = i;
      });
      if (index >= 0) {
        triggersListCopy.splice(index, 1);
      }
    }, true);
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
            {bookData ? (
              renderDisplayedContent()
            ) : props.isLoading ? (
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
                closePopUp={toggleShowTriggersPopUp}
              />
            ) : null}
            {showEditLinePopUp ? (
              <EditLinePopUp
                html={menuLineHtml}
                triggers={menuTriggers}
                isLineHeader={isLineHeader}
                onToggleHeaderStatus={toggleHeaderStatus}
                closePopUp={toggleShowEditLinePopUp}
                onAddTrigger={handleAddTrigger}
                onRemoveTrigger={handleRemoveTrigger}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(EditBookScreen);
