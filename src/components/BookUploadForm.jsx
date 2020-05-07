import React, { useState, Fragment } from "react";
import "./BookUploadForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import mammoth from "mammoth";
import addNewBook from "../services/addNewUserBook";
import { Redirect } from "react-router-dom";

const BookUploadForm = (props) => {
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docFile, setDocFile] = useState(null);
  const [bookName, setBookName] = useState("");
  const [toEdit, setToEdit] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    addNewBook();
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
    setToEdit(true);
    props.setBookContent(html);
  };

  const handleChangeFile = (e) => {
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

  if (toEdit) {
    return <Redirect from="/upload" to="edit" />;
  }

  return (
    <Fragment>
      <div className="menu-bg">
        <div className="menu-window">
          <div className="menu">
            <h4 className="menu-header">Welcome to Interactive Book Editor!</h4>
            <input
              className="col form-control mt-4 mb-3"
              type="text"
              placeholder="New Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <div className="custom-file mb-2">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={handleChangeFile}
              />
              <label className="custom-file-label">
                {docFile ? docFile.name : "Choose a docx file"}
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
              disabled={isLoading || !docFile || !bookName}
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
