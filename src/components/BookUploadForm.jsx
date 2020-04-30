import React, { useState, useEffect } from "react";
import "./BookUploadForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import mammoth from "mammoth";
import { Redirect } from "react-router-dom";
// import axios from "axios";

const BookUploadForm = (props) => {
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docFile, setDocFile] = useState(null);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    console.log("BookUploadForm Mounted");
    return () => {
      console.log("Unmounting BookUploadForm");
    };
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Save file in server (if I'll need it in the future):
    // const fd = new FormData();
    // fd.append("application/vnd.openxmlformats-officedocument.wordprocessingml.document", this.docFile, this.docFile.name);
    // const res = await axios.post(url, fd, {
    //   onUploadProgress: (progressEvent) => {
    //     console.log(
    //       "Upload progress:",
    //       Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%"
    //     );
    //   },
    // });
    // console.log(res);

    // Convert and get the docx as html
    const arrayBuffer = await docFile.arrayBuffer();
    // const result = await mammoth.extractRawText({ arrayBuffer });
    // const text = result.value;
    // console.log(text);
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;
    setFinishedLoading(true);
    props.onLoadBook(html);
  };

  const handleChange = (e) => {
    const fileName = e.target.files[0].name;
    const docPattern = /.*.docx/;
    if (docPattern.test(fileName)) {
      setDocFile(e.target.files[0]);
      setErrMessage("");
    } else {
      setDocFile(null);
      setErrMessage("Please only select a file ending with .docx");
    }
  };

  if (finishedLoading) {
    return <Redirect to="/edit" />;
  }

  return (
    <div className="menu-bg">
      <div className="menu-window">
        <div className="menu">
          <h4 className="menu-header">Welcome to Interactive Book Editer!</h4>
          <form onSubmit={handleSubmit}>
            <label className="mr-1">Choose a docx file: </label>
            <div className="custom-file mb-2">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={handleChange}
              />
              <label className="custom-file-label">
                {docFile ? docFile.name : "Choose file"}
              </label>
              <li>
                <h6>
                  <span
                    className="badge badge-danger mt-2"
                    hidden={!errMessage}
                  >
                    {errMessage}
                  </span>
                </h6>
              </li>
            </div>
            <button
              type="submit"
              className="btn btn-success form-control mt-3"
              disabled={isLoading || !docFile}
            >
              {isLoading ? "Please wait..." : "Load Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookUploadForm;
