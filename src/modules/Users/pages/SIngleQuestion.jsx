import React, { useEffect, useState } from "react";
import { questionsBundle } from "../../../data/questions";
import Checkbox from "../../Components/InputTypes/Checkbox";
import RadioButton from "../../Components/InputTypes/RadioButton";

const SingleQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const questionsArray = questionsBundle[0]?.questions;
  setInterval(() => {});
  const questionsBundleHandler = () => {
    switch (currentQuestion.type) {
      case "singleChoice":
        
        return <RadioButton currentQuestion={currentQuestion}/>;
      case "multipleChoice":
        return <Checkbox  currentQuestion={currentQuestion} />;
      default:
        <Checkbox  currentQuestion={currentQuestion} />;
    }
  };
  useEffect(() => {
    setCurrentQuestion(questionsArray[currentIndex]);
  }, [currentIndex, questionsArray]);
  return (
    <React.Fragment>
      <div className="col-xs-12">
        <div className="question">
          <p className="title">
            QUESTION {currentIndex + 1}/{questionsArray?.length}
          </p>
          <p className="question-content">{currentQuestion?.questionText}</p>
        </div>
      </div>
      <div className="col-xs-12 mt">
        <form>
          {(questionsBundleHandler())}
        </form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(SingleQuestion);
