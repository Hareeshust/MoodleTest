import React, { useState, useEffect } from "react";
import * as actions from "../_redux/authActions";
import LoginError from "../../Components/LoginError";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithGoogle } from "../../../firebaseconfig";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../app/store";
// @ts-ignore: Unreachable code error
import buttonClickAudio from "../../../assets/audios/ButtonClick.mp3";
// @ts-ignore: Unreachable code error
import cardClick from "../../../assets/audios/cardClick.mp3";
import {
  Button,
  Modal
} from "react-bootstrap";




const initialValues = {
  username: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Username is Required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is Required"),
});

function Login(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("")
  const { user, isLoggedIn, loginFailure, testCleared, retakeDate, testStarted } = useSelector(
    (state: RootState) => ({
      user: state.auth.user,
      isLoggedIn: state.auth.isLoggedIn,
      loginFailure: state.auth.loginFailure,
      userToken: state.auth.userToken,
      userLogonTime: state.auth.userLogonTime,
      testCleared: state.auth.testCleared,
      retakeDate: state.auth.retakeDate,
      testStarted: state.auth.testStarted
    }),
    shallowEqual
  );
  console.log('testCleared', testCleared, isLoggedIn);
  useEffect(() => {
   dispatch(actions.initialiseCalls())
  }, [])
  useEffect(() => {
    if (isLoggedIn) {
      if (!testCleared && !testStarted) {
        history.push("/home");
      } else if (testCleared) {
        setMessage("You Have Already Cleared The Quiz");
        setShow(true);
      } else if (!testCleared && testStarted) {
        setMessage(`You Can Retake The Quiz on ${retakeDate}`);
        setShow(true);
      }
    }
    
  }, [isLoggedIn]);
  useEffect(()=>{
    if(loginFailure){
      setMessage("Please Use TSYS Mail To Login");
      setShow(true);
    }
    else {
      setShow(false)
    }
  },[loginFailure])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setTimeout(() => {
        actions
          .login(values.username, values.password, dispatch)()
          .then((resp: any) => {
            if (resp.data === "success") {
              history.push("/home");
            } else {
              //setLoginFailure(true);
            }
          })
          .catch(() => {
            setSubmitting(false);
          });
      }, 500);
    },
  });

  const googleSignin = () => {
    new Audio(buttonClickAudio).play();
    setShow(false);
    actions
      .googleSignIn(dispatch)()
      .then((resp: any) => {
        if (resp.data === "success" && !testCleared && isLoggedIn) {
          history.push("/dashboard");
        } else {
          //setLoginFailure(true);
          setShow(true);
        }
      })
      .catch(() => {});
  };

  const signIn = () => {
    new Audio(buttonClickAudio).play();
  };

  const cardSelection = (type) => {
    new Audio(cardClick).play();
    if(type === "ADMIN"){
      history.push("/QuestionsUpload");
    }
  };

  const  handleClose = () => setShow(false); 

  return (
    <div> 
      <LoginError message={message} page="login" show={show} handleClose= {handleClose} confirm={()=>{}} cancel={()=>{}}/>   
    <div className="wrapper-login bg-image">
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11 volume">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="check1"
                name="option1"
                value="something"
                checked
              />
              <label className="form-check-label" htmlFor="check1"></label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3 mt">
            <form>
              <div className="form-check row">
                <div className="col-xs-12 col-md-6">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio1"
                    name="optradio"
                    value="option1"
                    checked
                  />
                  <label
                    className="radio-inline employee-active"
                    htmlFor="radio1"
                    onClick={() => cardSelection('EMPLOYEE')}
                  >
                    EMPLOYEE
                  </label>
                </div>
                <div className="col-xs-12 col-md-6">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio2"
                    name="optradio"
                    value="option2"
                  />
                  <label
                    className="radio-inline"
                    htmlFor="radio2"
                    onClick={() => cardSelection('ADMIN')}
                  >
                    ADMIN
                  </label>
                </div>
              </div>
              <div className="form-outline">
                <div className="google-text">
                  <button
                    type="button"
                    onClick={googleSignin}
                    className="google-change"
                  >
                  </button>
                </div>
              </div>
              <div className="form-outline login-select">
                <label
                  className="form-label login-option"
                  htmlFor="form2Example1"
                >
                  or
                </label>
              </div>
              {/* <div className="form-outline">
               <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" ></button>

               </div> */}
              <div className="form-outline mb-4" style={{paddingTop:"5px"}}>
                <label className="form-label" htmlFor="form2Example1">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="form2Example1"
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="form2Example2"
                  className="form-control"
                />
              </div>

              <div className="row mb-4">
                <div className="col passreset">
                  <a href="#">FORGOT PASSWORD</a>
                </div>
              </div>

              <button
                type="button"
                className="mb-4 signin"
                onClick={() => signIn()}
              ></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
