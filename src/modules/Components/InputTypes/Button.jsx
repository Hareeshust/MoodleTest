import React, { useContext } from "react";
import { useSelector } from "react-redux";
import nextButton from "../../../assets/Next-button.png";
import { QuestionContext } from "../../Questions/QuestionContext";

const NextButton = ({ selectedValue }) => {
  const questionsArray = useSelector(
    (state) => state?.questions?.questionData?.questions
  );
  const {
    currentIndex,
    handleClickNext,
    handleSubmit
  } = useContext(QuestionContext);


  return (
    <React.Fragment>
      {Array.isArray(questionsArray) &&
      questionsArray.length - 1 === currentIndex ? (
        <img
          src={nextButton}
          alt="Submit"
          class="nextButton"
          onClick={()=>handleSubmit(selectedValue)}
        />
      ) : (
        <img
          src={nextButton}
          alt="Next button"
          class="nextButton"
          onClick={()=>handleClickNext(selectedValue)}
        />
      )}
    </React.Fragment>
  );
};

export default NextButton;
