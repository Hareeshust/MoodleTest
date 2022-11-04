import React, { useContext, useState } from "react";
import { QuestionContext } from "../../Questions/QuestionContext";
import NextButton from "./Button";
import answerSelectedAudio from "../../../assets/audios/CorrectAnswer.mp3";

const Checkbox = () => {
  const optionLabel = ['A','B','C','D'];
  const [selectedValue, setSelectedValue] = useState([]);
  const { currentQuestion } = useContext(QuestionContext);

  function onChangeHandler(event) {
    if (selectedValue.includes(event.target.value)) {
      const array = [...selectedValue];
      const selectedIndex = array.indexOf(event.target.value);
      array.splice(selectedIndex, 1);
      setSelectedValue(array);
    } else {
      setSelectedValue((prevState) => {
        return [...prevState, event.target.value];
      });
    }
  }
  
  const selectAnswer = () => {
    new Audio(answerSelectedAudio).play();
  };
  return (
    <React.Fragment>
      <div className="form-check row dash-items answer_main_div">
        {currentQuestion?.options?.map((option, optionIndex) => (
          <div
            className="col-xs-12 col-md-3 answer_radio"
            key={option.answerText}
          >
            <input
              type="checkbox"
              className="form-check-input"
              id={`radio${optionIndex + 1}`}
              name={currentQuestion?.questionText}
              value={option.answerText}
              checked={selectedValue.includes(option.answerText)}
              onChange={onChangeHandler}
            />
            <label
              className="col-12 radio-inline"
              htmlFor={`radio${optionIndex + 1}`}
              onClick={() => {
                selectAnswer();
              }}
            >
              {optionLabel[optionIndex]}: {option.answerText}
            </label>
          </div>
        ))}
      </div>
      <NextButton selectedValue={selectedValue} />
    </React.Fragment>
  );
};

export default Checkbox;
