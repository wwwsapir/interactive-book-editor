import React, { useState, Fragment } from "react";
import "./BookUploadForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import mammoth from "mammoth";
// import axios from "axios";

const BookUploadForm = (props) => {
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docFile, setDocFile] = useState(null);

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
    props.setBookContent(html);
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

  return (
    <Fragment>
      <div className="menu-bg">
        <div className="menu-window">
          <div className="menu">
            <h4 className="menu-header">Welcome to Interactive Book Editer!</h4>
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
              onClick={handleSubmit}
              className="btn btn-success form-control mt-3"
              disabled={isLoading || !docFile}
            >
              {isLoading ? "Please wait..." : "Load Book"}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(BookUploadForm);
