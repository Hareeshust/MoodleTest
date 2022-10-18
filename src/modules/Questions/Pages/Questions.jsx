import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import * as actions from "../../Auth/_redux/authActions";
import { useHistory } from "react-router-dom";
import SingleQuestion from "./SIngleQuestion";

const Questions = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location?.pathname);
    console.log(location?.search);
    console.log(location?.state?.workstream);
  }, [location]);

  const { users, isLoggedIn } = useSelector(
    (state) => ({
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
          <div class="timer">28:00</div>
          <SingleQuestion />
        </div>
      </div>
    </div>
  );
};

export default Questions;
