import React, { useState, useEffect } from "react";
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
    <div className="container-fluid">
      {lines
        ? lines.map((line, i) => <Line line={line} key={i} index={i} />)
        : null}
    </div>
  );
};

export default React.memo(EditBookScreen);
