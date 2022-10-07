import React, { useState, useEffect } from "react";
import * as actions from "../_redux/authActions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {signInWithGoogle} from '../../../firebaseconfig'
import { useHistory } from "react-router-dom";
import { RootState } from "../../../app/store";

import {
  Alert
} from "react-bootstrap";
const initialValues = {
  username: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required('Username is Required'),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required('Password is Required'
    ),
});

function Login(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginFailure, setLoginFailure] = useState(false)
  const { user, isLoggedIn } = useSelector(
    (state: RootState) => ({
      user: state.auth.user,
      isLoggedIn: state.auth.isLoggedIn
    }),
    shallowEqual
  );

  useEffect(() => {
   // dispatch(actions.getAllUsers());
  }, []);
  useEffect(() => {
    if(isLoggedIn){
      history.push("/home");
    }
  }, [isLoggedIn])
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setTimeout(() => {
        actions.login(values.username, values.password,dispatch)()
          .then((resp:any) => {
            if(resp.data === "success"){
              history.push("/home");
            }
            else{
              setLoginFailure(true);
            }
           
          })
          .catch(() => {
            setSubmitting(false);
          });
      }, 500);
    },
  }); 
  console.log('isLoggedIn', isLoggedIn);
  
  return (
    // <div className="auth-inner">
    //     <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" >
    //       Sign in with Google
    //     </button>

    //     {/* <button type="button" className="login-with-google-btn" disabled>
    //       Sign in with Google
    //     </button> */}
    //     <form
    //     onSubmit={formik.handleSubmit}
    //     >
    //       {loginFailure && <Alert variant="danger">
    //         Invalid login details
    //       </Alert>}

    //             <h3>Sign In</h3>

    //             <div className="form-group">
    //                 <label>User Name</label>
    //                 <input type="text" className="form-control" placeholder="Enter Username"
    //                 {...formik.getFieldProps("username")}
    //                 />
    //                   {formik.touched.username && formik.errors.username ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.username}</div>
    //         </div>
    //       ) : null}
    //             </div>

    //             <div className="form-group">
    //                 <label>Password</label>
    //                 <input type="password" className="form-control" placeholder="Enter Password"   {...formik.getFieldProps("password")}/>
    //                 {formik.touched.password && formik.errors.password ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.password}</div>
    //         </div>
    //       ) : null}
    //             </div>

    //             <div className="form-group">
    //                 <div className="custom-control custom-checkbox">
    //                     <input type="checkbox" className="custom-control-input" id="customCheck1" />
    //                     <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    //                 </div>
    //             </div>

    //             <button type="submit" className="btn btn-primary btn-block">LOGIN</button>
    //             <p className="forgot-password text-right">
    //                 Forgot <a href="#">password?</a>
    //             </p>
    //         </form>
    //         </div>
    <div className="wrapper-login bg-image">
    <div className="container">
        <div className="row">
            <div className="col-xs-1 col-xs-offset-11 volume">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" checked/>
                    <label className="form-check-label" htmlFor="check1"></label>
                  </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-6 col-xs-offset-3 mt">
                <form>
                    <div className="form-check row">
                        <div className="col-xs-12 col-md-6">
                            <input type="radio" className="form-check-input" id="radio1" name="optradio" value="option1" checked/>
                            <label className="radio-inline" htmlFor="radio1">EMPLOYEE</label>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <input type="radio" className="form-check-input" id="radio2" name="optradio" value="option2"/>
                            <label className="radio-inline" htmlFor="radio2">ADMIN</label>
                        </div>
                      </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">EMAIL</label>
                        <input type="email" id="form2Example1" className="form-control" />
                      
                    </div>
                  
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">PASSWORD</label>
                        <input type="password" id="form2Example2" className="form-control" />
                    </div>
                  
                    <div className="row mb-4">
                      <div className="col passreset">
                        {/* <a href="#">FORGOT PASSWORD</a> */}
                        <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" ></button>
                      </div>
                    </div>
                  
                    <button type="button" className="mb-4 signin"></button>
                  
                  </form>
            </div>
        </div>

      </div>
</div>
);
}

export default Login;
