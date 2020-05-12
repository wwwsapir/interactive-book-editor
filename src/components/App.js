import React, { useState, useEffect, Fragment } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Routes from "./Routes";
import { HTML_TEXT_DECORATION_TAGS } from "../constants";

const App = () => {
  const [pathName, setPathName] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(bookData ? true : false);

  const getBookDataFromServer = () => {
    console.warn("Not implemented getBookContentFromServer. Returning null.");
    return null;
  };

  useEffect(() => {
    const bookData = getBookDataFromServer();
    setBookData(bookData);
  }, []);

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

  const prepareAndSetBookData = (bookContent) => {
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
    setBookData(lineListsSplitToParts);
  };

  const setBookContent = (bookContent) => {
    setIsLoading(true);
    prepareAndSetBookData(bookContent);
    setIsLoading(false);
  };

  return (
    <Fragment>
      <HashRouter>
        <NavigationBar pathName={pathName} />
        <div className="header-space"></div>
        <Route path="/">
          <Routes
            setPathName={setPathName}
            toUpload={!bookData && !isLoading}
            setBookContent={setBookContent}
            bookData={bookData}
            setBookData={setBookData}
            isLoading={isLoading}
          />
        </Route>
      </HashRouter>
    </Fragment>
  );
};

export default React.memo(App);
