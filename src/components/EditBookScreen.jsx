import React, { useState, useEffect, Fragment } from "react";
import Line from "./Line";

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

  useEffect(() => {
    if (props.bookContent) {
      let bookContentLines = props.bookContent
        ? props.bookContent
            .split(/<\/?p>/)
            .filter((lineHtml) => lineHtml !== "")
        : "";
      bookContentLines = bookContentLines.map((lineHtml) => {
        return { html: lineHtml, header: isLineHeader(lineHtml) };
      });
      setLines(bookContentLines);
    }
  }, [props.bookContentLines]);

  return (
    <Fragment>
      <div className="container-fluid">
        {lines ? (
          lines.map((line, i) => <Line line={line} key={i} index={i} />)
        ) : (
          <div>
            No book content to edit. Please use the upload page to upload a book
            file.
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(EditBookScreen);
