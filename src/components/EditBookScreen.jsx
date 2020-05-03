import React, { useState, useEffect, Fragment } from "react";
import Line from "./Line";
import NavigationBar from "./NavigationBar";

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
    let bookContentLines = props.bookContent
      ? props.bookContent.split(/<\/?p>/).filter((lineHtml) => lineHtml !== "")
      : "";
    bookContentLines = bookContentLines.map((lineHtml) => {
      return { html: lineHtml, header: isLineHeader(lineHtml) };
    });
    setLines(bookContentLines);
    console.log(bookContentLines);
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        {lines
          ? lines.map((line, i) => <Line line={line} key={i} index={i} />)
          : null}
      </div>
    </Fragment>
  );
};

export default React.memo(EditBookScreen);
