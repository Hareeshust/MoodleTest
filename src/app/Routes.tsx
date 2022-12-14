/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { RootState } from "../app/store";
import { Login } from "../modules/Auth";
import * as actions from "../modules/Auth/_redux/authActions";
import QuestionContextContainer from "../modules/Questions/QuestionContext";
import { Dashboard, Register, Users, QuestionsUpload } from "../modules/Users";
import LoginError from "../modules/Components/LoginError"
export function Routes() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    (state: RootState) => ({
      isLoggedIn: state.auth.isLoggedIn
    }),
    shallowEqual
  );
  const logout =()=> {
    dispatch(actions.logout());
  }
  return (
    <Router>
        {/* <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route path="/user" component={Users} />
        </Switch> */}

<nav className="">
  <div className="">
    {/* <Link className="navbar-brand" to={"/"}>Moodle Quiz</Link> */}
    <div className="collapse navbar-collapse" id="">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {/* {isLoggedIn ? (
           <Link className="nav-link" to="" onClick={logout}>Logout</Link>
           ) :  <Link className="nav-link" to={"/login"}>Login</Link>
          } */}
         
        </li>
        <li className="nav-item">
          {/* <Link className="nav-link" to={"/register"}>Register</Link> */}
        </li>
      </ul>
    </div>
  </div>
</nav>

<div className="entire-bg">
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route path="/home" component={Users} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component ={Dashboard}/>
      <Route path="/questions" component ={QuestionContextContainer}/>
      <Route path="/loginerror" component={LoginError}/>
      <Route path="/QuestionsUpload" component={QuestionsUpload}/>
    </Switch>
</div>
    </Router>
  );
}

