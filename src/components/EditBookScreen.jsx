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
  const [displayedLines, setDisplayedLines] = useState(null);
  const [display, setDisplay] = useState(DISPLAY.wholeBook);
  const [filter, setFilter] = useState(FILTER.none);
  const [splitPattern, setSplitPattern] = useState(SPLIT_PATTERN.sentences);
  const [isLoading, setIsLoading] = useState(bookContent ? true : false);

  const SEPARATOR_LINE_SYMBOLS =
    "#--&--$--+@#$&&*&^&*^$@@@@$--!!#$%^&^&$@#$@$&^^&**(*(@@@$#";

  const isLineHeader = (lineHtml) => {
    return (
      />chapter/i.test(lineHtml) ||
      /^chapter/i.test(lineHtml) ||
      />episode/i.test(lineHtml) ||
      /^episode/i.test(lineHtml)
    );
  };

  const addMissingHtmlTag = (html, tagStr) => {
    const beginningTag = `<${tagStr}>`;
    const endTag = `</${tagStr}>`;
    if (html.startsWith(beginningTag) && !html.endsWith(endTag)) {
      html = html + endTag;
    } else if (!html.startsWith(beginningTag) && html.endsWith(endTag)) {
      html = beginningTag + html;
    }
    return html;
  };

  const handleSplitDecorations = (line) => {
    for (let i = 0; i < HTML_TEXT_DECORATION_TAGS.length; i++) {
      line.html = addMissingHtmlTag(line.html, HTML_TEXT_DECORATION_TAGS[i]);
    }
    return line;
  };

  const updateContentAccordingToSplitPattern = () => {
    if (splitPattern === SPLIT_PATTERN.sentences) {
      let newContent = bookContent
        .split("</p><p>")
        .join(`<p>${SEPARATOR_LINE_SYMBOLS}</p>`);
      return newContent.split(". ").join(".<p>");
    } else if (splitPattern === SPLIT_PATTERN.paragraphs) {
      console.warn("Not implemented paragraph division");
      console.log(props.bookContent);
      return props.bookContent;
    } else {
      return props.bookContent;
    }
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
    sentences = sentences.map((paragraph) => {
      const par = paragraph.map((lineHtml) => {
        return {
          html: lineHtml,
          header: isLineHeader(lineHtml),
          triggers: [],
        };
      });
      return par.map((sentence) => handleSplitDecorations(sentence));
    });
    setLogicalLines(sentences);
  };

  const prepareAndSetDisplayLines = () => {
    const bookContentWithSentences = updateContentAccordingToSplitPattern(
      splitPattern
    );
    let bookContentLines = bookContentWithSentences
      .split(/<\/?p>/)
      .filter((lineHtml) => lineHtml !== "");
    bookContentLines = bookContentLines.map((lineHtml) => {
      return {
        html: lineHtml,
        header: isLineHeader(lineHtml),
        triggers: [],
      };
    });
    bookContentLines.map((line) => handleSplitDecorations(line));
    setDisplayedLines(bookContentLines);
  };

  useEffect(() => {
    if (bookContent) {
      setIsLoading(true);
      prepareAndSetLogicalLines();
      setIsLoading(false);
    }
  }, [bookContent]);

  useEffect(() => {
    if (bookContent) {
      setIsLoading(true);
      prepareAndSetDisplayLines();
      setIsLoading(false);
    }
  }, [bookContent, splitPattern]);

  const createLine = (line, i) => {
    if (line.html == SEPARATOR_LINE_SYMBOLS) {
      return <div className="line-separator" key={-i}></div>;
    } else {
      return <Line line={line} key={i} index={i} />;
    }
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
            {displayedLines ? (
              displayedLines.map((line, i) => createLine(line, i))
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
