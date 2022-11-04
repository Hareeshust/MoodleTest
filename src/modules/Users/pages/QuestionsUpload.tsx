import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button } from "react-bootstrap";
import * as actions from "../../Auth/_redux/authActions";
import * as userActions from "../_redux/usersActions";

import LoginError from "../../Components/LoginError";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../app/store";
import * as XLSX from "xlsx";

const QuestionsUpload = () => {
  const workstream = {
    title: "TSYS Workstream",
    choices: [
      { text: "NOTIFICATION", value: "notification" },
      { text: "CARD", value: "card" },
      { text: "SERVICING", value: "servicing" },
      { text: "AUTHORIZATION", value: "authorization" },
      { text: "RISK", value: "risk" },
      { text: "FRAUD", value: "fraud" },
    ],
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [workStreamSelected, setWorkStreamSelected] = useState("");

  const showPrompt = () => setShow(true);
  const handleClose = () => setShow(false);


  const { isLoggedIn } = useSelector(
    (state: RootState) => ({
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn]);

  const logOut = () => {
    setShow(false);
    dispatch(actions.logout());
  };

  const handelFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setExcelFile(e.target.result);
      };
    } else {
      setExcelFile(null);
    }
  };

  const handelUpload = () => {
    if (excelFile !== null) {
      const workBook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workBook.SheetNames[0];
      const worksheet = workBook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      dispatch(userActions.uploadQuestions(workStreamSelected,data));
    } else {
      setExcelData(null);
    }
  };

  const handleChange = (event) => {
    setWorkStreamSelected(event.target.value);
  };

  return (
    <div className="wrapper-dashboard bg-image">
      <div className="row nav-bar">
        <div className="col-xs-12 col-md-3"></div>
        <div className="col-xs-12 col-md-6">
          <label className="workstream-title" htmlFor="workstream">
            UPLOAD QUESTIONS
          </label>
        </div>
        <div className="col-xs-4 col-md-1 volume">
          <div className="form-check mute-icon">
            <input
              className="form-check-input"
              type="checkbox"
              id="check1"
              name="option1"
              value="something"
              checked
            />
          </div>
        </div>
        <div className="col-xs-4 col-md-1 profile"></div>
        <div className="col-xs-4 col-md-1 exit">
          <button onClick={showPrompt}></button>
        </div>
      </div>
      <LoginError
        message="Are you sure want to logout?"
        show={show}
        cancel={handleClose}
        confirm={logOut}
        page={""}
        handleClose={undefined}
      />
      <div className="uploadFileMainDiv">
        <form className="docUploadForm">
          <div className="workStreemDiv">
            <label htmlFor="workStreemSelect" className="workStreemLabel">
              Work Streem
            </label>
            <select
              id="workStreemSelect"
              className="selectWorkStreem"
              onChange={handleChange}
            >
              <option value="" selected>
                SELECT
              </option>
              {workstream.choices.map((data, index) => (
                <option value={data.value}>{data.text}</option>
              ))}
            </select>
          </div>
          <input
            type="file"
            id="myFile"
            name="filename"
            className="chooseFileInput"
            accept=".xls,.xlsx"
            onChange={handelFile}
          />
          <Button
            type="button"
            className="btn errorButton"
            onClick={() => handelUpload()}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuestionsUpload;
