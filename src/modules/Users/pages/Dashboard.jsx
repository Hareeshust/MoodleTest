import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../Auth/_redux/authActions";
import { RootState } from "../../../app/store";
import nextButton from "../../../assets/Next-button.png";
import { db } from "../../../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { setQuestion } from "../../Questions/_redux/questionsActions";
import optionSelectionAudio from "../../../assets/audios/optionSelect.mp3";
import buttonClickAudio from "../../../assets/audios/ButtonClick.mp3";
import loginSuccessAudio from "../../../assets/audios/Bg.mp3";
import LoginError from "../../Components/LoginError";
const successLoginAudio =  new Audio(loginSuccessAudio); 
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
const WorkStreamOption = ({ options, selected, onChange }) => {
  const cardSelection = () => {
    successLoginAudio.pause();
    new Audio(optionSelectionAudio).play();
  };

  return (
    <div className="">
      {options.map((choice, index) => (
        <div className="col-xs-12 col-md-4">
          <input
            type="radio"
            name="optradio"
            className="form-check-input"
            value={choice.value}
            key={index}
            checked={selected === choice.value}
            id={`radio${index + 1}`}
            onChange={onChange}
          />
          <label
            className="radio-inline"
            htmlFor={`radio${index + 1}`}
            onClick={() => cardSelection()}
          >
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};
const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedStream, setSelectedStream] = useState();
  const [show, setShow] = useState(false);

  const { users, isLoggedIn } = useSelector(
    (state) => ({
      users: state.user.users,
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );

  useEffect(() => {
    successLoginAudio.play()
  }, [])
  useEffect(() => {
    if (selectedStream) {
      dispatch(setQuestion(selectedStream));
    }
  }, [selectedStream]);
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      history.push("/Dashboard");
    }
  }, [history, isLoggedIn]);

  const handleClickNext = () => {
    new Audio(buttonClickAudio).play();
    if (selectedStream && selectedStream !== (undefined || null)) {
      history.push({
        pathname: "/questions",
        state: { workstream: selectedStream },
      });
    }
  };

  const logOut = () => {
    setShow(false);
    dispatch(actions.logout());
  };

  const handleOnChange = (e) => {
    setSelectedStream(e.target.value);
  };

  const showPrompt = () => setShow(true);
  const  handleClose = () => setShow(false); 
  return (
    <>
   
    <div className="wrapper-dashboard bg-image">
      <div className="row nav-bar">
        <div className="col-xs-12 col-md-3"></div>
        <div className="col-xs-12 col-md-6">
          <label className="workstream-title" htmlFor="workstream">
            SELECT YOUR PLATFORM
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
            {/* <label className="form-check-label" htmlFor="check1"></label> */}
          </div>
        </div>
        <div className="col-xs-4 col-md-1 profile">
          {/* <button></button> */}
        </div>
        <div className="col-xs-4 col-md-1 exit">
          <button onClick={showPrompt}></button>
        </div>
      </div>
      <LoginError message="Are you sure want to logout?" show={show} cancel={handleClose} confirm={logOut}/>   
      <div className="container">
        <div className="row">
          <div className="col-xs-12 mt">
            <form>
              <div className="form-check row dash-items">
                <WorkStreamOption
                  options={workstream.choices}
                  onChange={(e) => handleOnChange(e)}
                  selected={selectedStream}
                />
                <img
                  src={nextButton}
                  alt="Next button"
                  className={"nextButton"}
                  onClick={() => {
                    handleClickNext();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
