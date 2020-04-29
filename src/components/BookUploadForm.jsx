import React, { useState, useEffect } from "react";
import "./BookUploadForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

const BookUploadForm = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filePath, setFilePath] = useState("");

  const watchAllFields = watch();

  const getFileName = (path) => {
    return path.replace(/^.*[\\\/]/, "");
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log("Submit form called. fileName:", data.fileName);
  };

  const handleChange = (e) => {
    const filePath = e.target.value;
    const docPattern = /.*.docx?/;
    if (docPattern.test(filePath)) {
      setFilePath(e.target.value);
      setErrMessage("");
    } else {
      setFilePath("");
      setErrMessage(
        "Please only select a file ending with either .doc or .docx"
      );
    }
  };

  return (
    <div className="menu-bg">
      <div className="menu-window">
        <div className="menu">
          <h4 className="menu-header">Welcome to Interactive Book Editer!</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mr-1">Choose a .doc or .docx file: </label>
            <div className="custom-file mb-2">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                name="fileName"
                ref={register({})}
                onChange={handleChange}
              />
              <label className="custom-file-label">
                {watchAllFields.fileName && filePath
                  ? watchAllFields.fileName.length > 0
                    ? watchAllFields.fileName[0].name
                    : "Choose file"
                  : "Choose file"}
              </label>
              {errMessage ? (
                <li>
                  <h6>
                    <span className="badge badge-danger mt-2">
                      {errMessage}
                    </span>
                  </h6>
                </li>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-success form-control mt-3"
              disabled={isLoading || !filePath}
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
