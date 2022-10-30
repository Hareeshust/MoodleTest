import React, { useState, useEffect } from "react";
import {
  Button,
  Modal
} from "react-bootstrap";
const LoginError = (props: {
    message: any;
    show: boolean;
    handleClose: any;
    confirm: any;
    cancel: any;
    page:string;
  })=> {
    const isLoginPage = (props.page === "login")? true: false

  return (
    <>
    {props.show && (
        <div className="error-modal dashboard-modal">
         <Modal.Dialog>
        <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{props.message}</p>
        </Modal.Body>

        <Modal.Footer>
           {isLoginPage ?
            <Button variant="primary" onClick={props.handleClose} >OK</Button>
           :
           <>
            <Button variant="secondary"  onClick={props.cancel} >Cancel</Button>
           <Button variant="primary"  onClick={props.confirm} >Sure</Button>
           </>
           }
         
        </Modal.Footer>
      </Modal.Dialog>
      </div>
    )}
     
    </>
  );
};

export default LoginError;
