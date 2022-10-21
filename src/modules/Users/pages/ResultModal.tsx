import React, { MouseEventHandler } from "react";
import scoreCardPass from "../../../assets/Score-crad.png";
import scoreCardFail from "../../../assets/Score-card-fail.png";
import downloadCertificate from "../../../assets/Download-certificate.png";
import returnToHome from "../../../assets/Return-home.png";

const ResultModal = (props: {
  isPassed: boolean;
  score: number;
  closeModal: MouseEventHandler;
}) => {
  const passScore = props.score;
  const passed = props.isPassed;
  const scoreCard = passed ? scoreCardPass : scoreCardFail;
  const button = passed ? downloadCertificate : returnToHome;
  const displayText = passed ? "YOU HAVE PASSED SCORING" : "You have not cleared the test";
  const textContentClass = passed ? "modalTextContainerSuccess" : "modalTextContainerFailuer";

  return (
    <>
      <div className="backDrop">
        <div className="modalBody">
          <img src={scoreCard} alt="Score Card" className="img-fluid" />
          <div className={textContentClass}>
            <p className="modalHeadderFont">{displayText}</p>
            <p className="modalScoreFont">{Number(passScore)}%</p>
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
