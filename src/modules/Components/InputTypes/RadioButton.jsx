import React, { useContext, useState } from "react";
import { QuestionContext } from "../../Questions/QuestionContext";
import NextButton from "./Button";
import answerSelectedAudio from "../../../assets/audios/CorrectAnswer.mp3";

const RadioButton = () => {
  const optionLabel = ['A','B','C','D'];
  const [selectedValue, setSelectedValue] = useState(null);
  const { currentQuestion } = useContext(QuestionContext);
  function onChangeHandler(event) {
    setSelectedValue(event.target.value);
  }

  const selectAnswer = () => {
    new Audio(answerSelectedAudio).play();
  };

  return (
    <React.Fragment key={currentQuestion?.questionText}>
      <div className="form-check row dash-items answer_main_div">
        {currentQuestion?.options?.map((option, optionIndex) => {
            const classNameForLabel = "answersLabel"+ optionLabel[optionIndex];
            return(
          <div
            className="col-xs-12 col-md-3 answer_radio"
            key={option.answerText}
          >
            <input
              type="radio"
              className="form-check-input"
              id={`radio${optionIndex + 1}`}
              name={currentQuestion?.questionText}
              value={option.answerText}
              checked={option.answerText === selectedValue}
              onChange={onChangeHandler}
            />
            <label
              className="col-12 radio-inline forlabelAlligment"
              htmlFor={`radio${optionIndex + 1}`}
              onClick={() => {
                selectAnswer();
              }}
            >
            <p className={classNameForLabel}>{optionLabel[optionIndex]}</p>
              {option.answerText}

            </label>
          </div>
        )}
        )};
      </div>
      <NextButton selectedValue={selectedValue} />
    </React.Fragment>
  );
};

export default React.memo(RadioButton);
