import React, { useState } from "react";

const EditBookScreen = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.bookContent }}></div>;
};

export default React.memo(EditBookScreen);
