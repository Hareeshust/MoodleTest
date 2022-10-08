import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";

const workstream = {
  title: 'TSYS Workstream',
  choices:
  [
    { text: 'NOTIFICATION', value: 'notification' },
    { text: 'CARD', value: 'card' },
    { text: 'SERVICING', value: 'servicing' },
    { text: 'AUTHORIZATION', value: 'authorization' },
    { text: 'RISK', value: 'risk' },
    { text: 'FRAUD', value: 'fraud' }
  ]
}
const WorkStreamOption = ({ options, selected, onChange }) => {
  return (
    <div className="">
      {options.map((choice, index) => (

         <div className="col-xs-12 col-md-4">
           <input type="radio"
            name="optradio"
            className="form-check-input"
            value={choice.value}
            key={index}
            checked={selected === choice.value}
            id={`radio${index+1}`}
            onChange={onChange} />
         <label className="radio-inline" for={`radio${index+1}`}>{choice.text}</label>
     </div>
      ))}
    </div>
  );
};
const Dashboard = ()=> {
  const history = useHistory();
  const [selectedStream, setSelectedStream] = useState();
  const handleClick = ()=> {
    history.push({
      pathname: '/questions',
      state: { workstream: selectedStream }
  });
  }

  const handleOnChange= (e) => {
    setSelectedStream(e.target.value);
  }

  return (
    <div className="wrapper-dashboard bg-image">
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
                <WorkStreamOption
                  options={workstream.choices}
                  onChange={(e) => handleOnChange(e)}
                  selected={selectedStream} />
              </div>
              <button onClick={() =>handleClick()}>Next</button>

              </form>
              </div>
          </div>
  
        </div>
  </div>
  );
}

export default Dashboard;
