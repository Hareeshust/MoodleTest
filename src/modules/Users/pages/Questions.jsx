import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import * as actions from "../../Auth/_redux/authActions";
import { useHistory } from "react-router-dom";
import ResultModal from "./ResultModal";
import nextButton from "../../../assets/Next-button.png";

const Questions = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [passed, setPassed] = useState(true);
  const [testScore, setTestScore] = useState(50);

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.search);
    console.log(location.state.workstream);
  }, [location]);

  const { users, isLoggedIn } = useSelector(
    (state: RootState) => ({
      users: state.user.users,
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
    dispatch(actions.logout());
  };

  const handleClickNext = () => {
    setShowModal(true);
    setPassed(false);
    setTestScore(88);
  };

  const hideModalHandler = () => {
    setShowModal(false);
    setTestScore(0);
  };

  return (
    <div class="wrapper-question bg-image">
      <div class="row nav-bar">
        <div class="col-xs-1 col-xs-offset-4">
          <div class="totalt">40MINS</div>
        </div>
        <div class="col-xs-1">
          <div class="totalq">40</div>
        </div>
        <div class="col-xs-4"></div>
        <div class="col-xs-1 volume">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="check1"
              name="option1"
              value="something"
              checked
            />
            <label class="form-check-label" for="check1"></label>
          </div>
        </div>
        <div class="col-xs-1 exit">
          <button onClick={logOut}></button>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="timer">28:00</div>
            <div class="question">
              <p class="title">QUESTION 3/10</p>
              <p class="question-content">
                WHEN DIGITAL INNOVATION TRANSFORMATION IN GNP?
              </p>
            </div>
          </div>
          <div class="col-xs-12 mt topAlign">
            <form>
              <div class="form-check row dash-items">
                <div class="col-xs-12 col-md-3">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio1"
                    name="optradio"
                    value="option1"
                    checked
                  />
                  <label class="radio-inline" for="radio1">
                    NOTIFICATION
                  </label>
                </div>
                <div class="col-xs-12 col-md-3">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio2"
                    name="optradio"
                    value="option2"
                  />
                  <label class="radio-inline" for="radio2">
                    CARD
                  </label>
                </div>
                <div class="col-xs-12 col-md-3">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio3"
                    name="optradio"
                    value="option3"
                  />
                  <label class="radio-inline" for="radio3">
                    SERVICING
                  </label>
                </div>
                <div class="col-xs-12 col-md-3">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="radio4"
                    name="optradio"
                    value="option3"
                  />
                  <label class="radio-inline" for="radio4">
                    AUTHORIZATION
                  </label>
                </div>
              </div>
              <img
                src={nextButton}
                alt="Next button"
                class="nextButton"
                onClick={() => {
                  handleClickNext();
                }}
              />
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <ResultModal
          isPassed={passed}
          score={testScore}
          closeModal={hideModalHandler}
        />
      )}
    </div>
  );
};

export default Questions;
