import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
const LoginError = (props: {
  message: any;
  show: boolean;
  handleClose: any;
  confirm: any;
  cancel: any;
  page: string;
}) => {
  const isLoginPage = props.page === "login" ? true : false;

  return (
    <>
      {props.show && (
        <div className="backDrop">
          <div className="modalBody modalBodyError">
            <div>
              <h1 className="modalHeadderFont">{props.message}</h1>
            </div>
            <div className="errorModalButtonDiv">
              {isLoginPage ? (
                <Button type="button" className="btn errorButton" onClick={props.handleClose}>OK</Button>
              ) : (
                <>
                 <Button type="button" className="btn errorButton" onClick={props.confirm}>Sure</Button>
                 <Button type="button" className="btn errorButton" onClick={props.cancel}>Cancel</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginError;
