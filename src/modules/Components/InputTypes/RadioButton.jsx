import React, { useContext, useState } from "react";
import { QuestionContext } from "../../Questions/QuestionContext";
import NextButton from "./Button";

const RadioButton = () => {
  const [selectedValue,setSelectedValue]=useState(null)
  const {currentQuestion}=useContext(QuestionContext)
  function onChangeHandler(event) {
    setSelectedValue(event.target.value);  
  }
  return (
    <React.Fragment>
    <div className="form-check row dash-items answer_main_div">
      {currentQuestion?.options?.map((option,optionIndex)=> <div className="col-xs-12 col-md-3 answer_radio" key={option.answerText}>
        <input
          type="radio"
          className="form-check-input"
          id={`radio${optionIndex+1}`}
          name={currentQuestion?.questionText}
          value={option.answerText}
          checked={option.answerText===selectedValue}
          onChange={onChangeHandler}
        />
        <label className="col-12 radio-inline" htmlFor={`radio${optionIndex+1}`}>
          {option.answerText}
        </label>
      </div>)}
    </div>
    <NextButton selectedValue={selectedValue}/>
    </React.Fragment>
  );
};

export default React.memo(RadioButton);
