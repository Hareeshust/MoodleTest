import React, { Fragment, useContext, useEffect, useState } from "react";
import { questionsBundle } from "../../../data/questions";
import Checkbox from "../../Components/InputTypes/Checkbox";
import RadioButton from "../../Components/InputTypes/RadioButton";
import nextButton from "../../../assets/Next-button.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { QuestionContext } from "../QuestionContext";

const SingleQuestion = () => {
  const [timer, setTimer] = useState(30);
  const questionsArray = useSelector(
    (state) => state?.questions?.questionData?.questions
  );
  const history = useHistory();
  const {
    setTestScore,
    setPercentage,
    currentQuestion,
    setCurrentQuestion,
    currentIndex,
    setCurrentIndex,
  } = useContext(QuestionContext);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const calculateScore = (selected) => {
    if (currentQuestion.type === "singleChoice") {
      const answerSelected = currentQuestion?.options?.find(
        (singleOption) => singleOption === selected
      );
      if (answerSelected.isCorrect) {
        setTestScore((prevScore) => prevScore + 1);
        setPercentage(
          (prevScore) => (prevScore + 1 / questionsArray?.length) / 100
        );
      }
    }
    if (currentQuestion.type === "multipleChoice") {
      console.log("multipleChoice");
    }
  };
  const questionsBundleHandler = () => {
    switch (currentQuestion?.type) {
      case "singleChoice":
        return (
          <Fragment key={currentQuestion?.questionText}>
            <RadioButton />
          </Fragment>
        );
      case "multipleChoice":
        return (
          <Fragment key={currentQuestion?.questionText}>
            <Checkbox />
          </Fragment>
        );
      default:
        return (
          <Fragment key={currentQuestion?.questionText}>
            <Checkbox />
          </Fragment>
        );
    }
  };
  useEffect(() => {
    if (questionsArray?.length) {
      setCurrentQuestion(questionsArray[currentIndex]);
    } else {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="col-xs-12 mt topAlign">
        <form>{questionsBundleHandler()}</form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(SingleQuestion);
