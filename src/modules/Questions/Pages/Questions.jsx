import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import * as actions from "../../Auth/_redux/authActions";
import { useHistory } from "react-router-dom";
import SingleQuestion from "./SIngleQuestion";
import { QuestionContext } from "../QuestionContext";
import { RootState } from "../../../app/store";

const Questions = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { totalQuestions,remainingTimeDisplay } = useContext(QuestionContext);

  useEffect(() => {
    console.log(location?.pathname);
    console.log(location?.search);
    console.log(location?.state?.workstream);
  }, [location, totalQuestions]);

  const { isLoggedIn } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [history,isLoggedIn]);

  const logOut = () => {
    dispatch(actions.logout());
  };



  return (
    <div class="wrapper-question bg-image">
      <div class="row nav-bar">
      <div class="col-xs-2"></div>
        <div class="col-xs-8 navQuestionCountDiv">
          <div class="totalt">{(totalQuestions*1)} MIN</div>
          <div class="totalq">{totalQuestions}</div>
        </div>
        <div class="col-xs-1 volume">
          <div class="form-check" align="center">
            <input
              class="form-check-input"
              type="checkbox"
              id="check1"
              name="option1"
              value="something"
              defaultChecked
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
          <div class="timer">{remainingTimeDisplay}</div>
          <SingleQuestion />
        </div>
      </div>
    </div>
  );
};

export default Questions;
