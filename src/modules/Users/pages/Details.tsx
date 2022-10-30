import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as actions from "../_redux/usersActions";
import styles from "../users.module.css";
import { RootState } from "../../../app/store";
import { useHistory } from "react-router-dom";
import {
  CardColumns,
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../firebaseconfig'


function Users() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(actions.getAllUsers());
  }, []);
  const { users, isLoggedIn, testCleared } = useSelector(
    (state: RootState) => ({
      users: state.user.users,
      isLoggedIn: state.auth.isLoggedIn,
      testCleared: state.auth.testCleared
    }),
    shallowEqual
  );
  useEffect(() => {
    if(!isLoggedIn){
      history.push("/login");
    }
    else if(isLoggedIn && !testCleared) {
      history.push("/Dashboard");
    }
  }, [isLoggedIn])
  const [user, setUser] = useState<any>({});
  // onAuthStateChanged(auth, (currentUser:any)=>{
  //   setUser(currentUser);
  // })
  return (
    <>
      {/* <div className="search-header">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8}>
             
            </Col>
            <Col md={4} className="user-create-container">
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="middle-section">
        <Container fluid className="book-list">
        {user && user.email}
          {users.map((user:any)=>{
           return (
             <>
               <h1>Name:{user?.name}</h1>
               <h1>Designation: {user?.designation}</h1>
             </>
           );
          })}
        </Container>
      </Container> */}
    </>
  );
}

export default Users;
