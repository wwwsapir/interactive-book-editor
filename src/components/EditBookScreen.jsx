import React, { useState, useEffect, Fragment } from "react";
import Line from "./Line";
import EditBookSideBar from "./EditBookSideBar";
import { DISPLAY, FILTER, HTML_TEXT_DECORATION_TAGS } from "../constants";
import "./EditBookScreen.scss";

const EditBookScreen = (props) => {
  const [lines, setLines] = useState(null);
  const [display, setDisplay] = useState(DISPLAY.wholeBook);
  const [filter, setFilter] = useState(FILTER.none);

  const isLineHeader = (lineHtml) => {
    return (
      />chapter/i.test(lineHtml) ||
      /^chapter/i.test(lineHtml) ||
      />episode/i.test(lineHtml) ||
      /^episode/i.test(lineHtml)
    );
  };

  const bookContent = props.bookContent;

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
    console.log(line);
    return line;
  };

  useEffect(() => {
    if (bookContent) {
      const bookContentWithSentences = bookContent.replace(". ", ".<p>");
      let bookContentLines = bookContentWithSentences
        .split(/<\/?p>/)
        .filter((lineHtml) => lineHtml !== "");
      bookContentLines = bookContentLines.map((lineHtml) => {
        return {
          html: lineHtml,
          header: isLineHeader(lineHtml),
        };
      });
      bookContentLines.map((line) => handleSplitDecorations(line));
      setLines(bookContentLines);
    }
  }, [bookContent]);

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
            />
          </div>
          <div className="side-bar-mock-filler floating-col"></div>
          <div className="main-edit-area floating-col">
            {lines ? (
              lines.map((line, i) => <Line line={line} key={i} index={i} />)
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
