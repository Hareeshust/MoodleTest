import React, {useEffect, MouseEventHandler } from "react";
import scoreCardPass from "../../../assets/Score-crad.png";
import scoreCardFail from "../../../assets/Score-card-fail.png";
import downloadCertificate from "../../../assets/Download-certificate.png";
import returnToHome from "../../../assets/Return-home.png";
import { format } from 'date-fns'
import * as actions from "../_redux/usersActions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../app/store";

const ResultModal = (props: {
  isPassed: boolean;
  score: any;
  closeModal: MouseEventHandler;
}) => {
  const dispatch = useDispatch();
var days=7;
var date = new Date();
var last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
var day =last.getDate();
var month=last.getMonth()+1;
var year=last.getFullYear();
const retestGmt = new Date(year, day, month);
const retestDate = format(new Date(year, day-1, month), 'MM/dd/yyyy')

  const passScore = parseInt(props.score);
  const passed = props.isPassed;
  const scoreCard = passed ? scoreCardPass : scoreCardFail;
  const button = passed ? downloadCertificate : returnToHome;
  const displayText = passed ? "YOU HAVE PASSED SCORING" : "YOU HAVE NOT CLEARED THE TEST";
  const retakeMessage =  `PLEASE ATTEND THE TEST AFTER ONE WEEK ${retestDate}`;
  const textContentClass = passed ? "modalTextContainerSuccess" : "modalTextContainerFailuerModal";

  const { userToken, userLogonTime, testCleared } = useSelector(
    (state: RootState) => ({
      userToken: state.auth.userToken,
      userLogonTime: state.auth.userLogonTime,
      testCleared: state.auth.testCleared
    }),
    shallowEqual
  );

  useEffect(() => {
    if(userToken && !passed){
      dispatch(actions.updateTestStatus(userToken, retestDate, passed))
    }
    else if(userToken && passed) {
      dispatch(actions.updateTestStatus(userToken,  format(new Date(), 'MM/dd/yyyy') , passed))
    }
  }, [passed, userToken, retestDate])
 
  return (
    <>
      <div className="backDrop">
        <div className="modalBody">
          <img src={scoreCard} alt="Score Card" className="img-fluid" />
          <div className={textContentClass}>
            <p className="modalHeadderFont">{displayText}</p>
            {!passed && (<p className="retakeText">{retakeMessage}</p>)}
            <p className="modalScoreFont">{passScore}%</p>
            <img
              src={button}
              alt="Score Card"
              className="img-fluid resultAction"
              onClick={props.closeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultModal;
