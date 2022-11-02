import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button } from "react-bootstrap";
import * as actions from "../../Auth/_redux/authActions";
import LoginError from "../../Components/LoginError";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../app/store";

const QuestionsUpload = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [show, setShow] = useState(false);

  const showPrompt = () => setShow(true);
  const handleClose = () => setShow(false);
  var selectedFile;


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

  const uploadDocument = () => {
    alert("Need to implement...");
  };

  const handelChange = () => {
    console.log("on file select");
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
          <input
            type="file"
            id="myFile"
            name="filename"
            className="chooseFileInput"
            onChange={() => handelChange()}
          />
          <Button
            type="button"
            className="btn errorButton"
            onClick={() => uploadDocument()}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuestionsUpload;
