import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../Auth/_redux/authActions";
import { RootState } from "../../../app/store";

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
  const dispatch = useDispatch();
  const [selectedStream, setSelectedStream] = useState();
  const { users, isLoggedIn } = useSelector(
    (state: RootState) => ({
      users: state.user.users,
      isLoggedIn: state.auth.isLoggedIn
    }),
    shallowEqual
  );
  useEffect(() => {
    if(!isLoggedIn){
      history.push("/login");
    }
    else {
      history.push("/Dashboard");
    }
  }, [isLoggedIn])
  const handleClick = ()=> {
    if(selectedStream && selectedStream!== (undefined || null)){
        history.push({
      pathname: '/questions',
      state: { workstream: selectedStream }
   })
    };
  }
  const logOut =()=>{
    dispatch(actions.logout());
  }

  const handleOnChange= (e) => {
    setSelectedStream(e.target.value);
  }

  return (
    <div className="wrapper-dashboard bg-image">
    <div className="row nav-bar">
      <div className="col-xs-1 col-xs-offset-9 volume">
          <div className="form-check mute-icon">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" checked/>
              <label className="form-check-label" htmlFor="check1"></label>
          </div>
          
      </div>
      <div className="col-xs-1 profile">
        <button></button>
      </div>
      <div class="col-xs-1 exit">
          <button onClick={logOut}></button>
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
