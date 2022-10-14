import React, { useState } from "react";

const RadioButton = ({currentQuestion}) => {
  const [selectedValue,setSelectedValue]=useState(null)
  
  function onChangeHandler(event) {
    setSelectedValue(event.target.value);  
  }
  return (
    <div className="form-check row dash-items">
      {currentQuestion?.options?.map((option,optionIndex)=> <div className="col-xs-12 col-md-3" key={option.answerText}>
        <input
          type="radio"
          className="form-check-input"
          id={`radio${optionIndex+1}`}
          name={currentQuestion?.questionText}
          value={option.answerText}
          checked={option.answerText===selectedValue}
          onChange={onChangeHandler}
        />
        <label className="radio-inline" htmlFor={`radio${optionIndex+1}`}>
          {option.answerText}
        </label>
      </div>)}
    </div>
  );
};

export default React.memo(RadioButton);
