import React, { useState, useEffect, Fragment } from "react";
import Line from "./Line";
import EditBookSideBar from "./EditBookSideBar";

const EditBookScreen = (props) => {
  const [lines, setLines] = useState(null);

  const isLineHeader = (lineHtml) => {
    return (
      />chapter/i.test(lineHtml) ||
      /^chapter/i.test(lineHtml) ||
      />episode/i.test(lineHtml) ||
      /^episode/i.test(lineHtml)
    );
  };

  const bookContent = props.bookContent;

  useEffect(() => {
    if (bookContent) {
      let bookContentLines = bookContent
        ? bookContent.split(/<\/?p>/).filter((lineHtml) => lineHtml !== "")
        : "";
      bookContentLines = bookContentLines.map((lineHtml) => {
        return { html: lineHtml, header: isLineHeader(lineHtml) };
      });
      setLines(bookContentLines);
    }
  }, [bookContent]);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1">
            <EditBookSideBar />
          </div>
          <div className="col-11">
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
