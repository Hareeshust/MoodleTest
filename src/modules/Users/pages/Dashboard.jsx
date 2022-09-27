import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";


const Dashboard = ()=> {
  return (
    <div className="wrapper bg-image">
    <div className="row nav-bar">
      <div className="col-xs-1 col-xs-offset-10 volume">
          <div className="form-check">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" checked/>
              <label className="form-check-label" for="check1"></label>
          </div>
      </div>
      <div className="col-xs-1 profile">
        <button></button>
      </div>
  </div>
      <div className="container">
          <div className="row">
              <div className="col-xs-12 mt">
                  <form>
                      <div className="form-check row dash-items">
                          <div className="col-xs-12 col-md-4">
                              <input type="radio" className="form-check-input" id="radio1" name="optradio" value="option1" checked/>
                              <label className="radio-inline" for="radio1">NOTIFICATION</label>
                          </div>
                          <div className="col-xs-12 col-md-4">
                              <input type="radio" className="form-check-input" id="radio2" name="optradio" value="option2"/>
                              <label className="radio-inline" for="radio2">CARD</label>
                          </div>
                          <div className="col-xs-12 col-md-4">
                            <input type="radio" className="form-check-input" id="radio3" name="optradio" value="option3"/>
                            <label className="radio-inline" for="radio3">SERVICING</label>
                        </div>
                        <div className="col-xs-12 col-md-4">
                          <input type="radio" className="form-check-input" id="radio4" name="optradio" value="option3"/>
                          <label className="radio-inline" for="radio4">AUTHORIZATION</label>
                      </div>
                      <div className="col-xs-12 col-md-4">
                        <input type="radio" className="form-check-input" id="radio5" name="optradio" value="option3"/>
                        <label className="radio-inline" for="radio5">RISK</label>
                    </div>
                    <div className="col-xs-12 col-md-4">
                      <input type="radio" className="form-check-input" id="radio6" name="optradio" value="option3"/>
                      <label className="radio-inline" for="radio6">FRAUD</label>
                  </div>
                        </div>
                    </form>
              </div>
          </div>
  
        </div>
  </div>
  );
}

export default Dashboard;
