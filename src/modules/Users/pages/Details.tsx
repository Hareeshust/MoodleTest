import React, { useEffect } from "react";
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


function Users() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllUsers());
  }, []);

  const { users } = useSelector(
    (state: RootState) => ({
      users: state.user.users,
    }),
    shallowEqual
  );
  console.log('users', users);
  
  return (
    <>
      <div className="search-header">
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
          Hi User
        </Container>
      </Container>
    </>
  );
}

export default Users;
