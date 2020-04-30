import React, { useState } from "react";

const EditBookScreen = (props) => {
  console.log("Here!");
  return <div dangerouslySetInnerHTML={{ __html: props.bookContent }}></div>;
};

export default EditBookScreen;
