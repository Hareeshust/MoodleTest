import React, { useContext, useState } from "react";
import { QuestionContext } from "../../Questions/QuestionContext";
import NextButton from "./Button";

const Checkbox = () => {
  const [selectedValue,setSelectedValue]=useState([])
  const {currentQuestion}=useContext(QuestionContext)

  function onChangeHandler(event) {
    if(selectedValue.includes(event.target.value)){
      const array=[...selectedValue]
      const selectedIndex=array.indexOf(event.target.value)
      array.splice(selectedIndex,1)
      setSelectedValue(array)
    }
    else{
      setSelectedValue(prevState=>{
        return [...prevState,event.target.value]
      }
        );  
    }
  }
  return (
    <React.Fragment>
    <div className="form-check row dash-items">
    {currentQuestion?.options?.map((option,optionIndex)=> <div className="col-xs-12 col-md-3" key={option.answerText}>
      <input
        type="checkbox"
        className="form-check-input"
        id={`radio${optionIndex+1}`}
        name={currentQuestion?.questionText}
        value={option.answerText}
        checked={selectedValue.includes(option.answerText)}
        onChange={onChangeHandler}
      />
      <label className="col-11 radio-inline" htmlFor={`radio${optionIndex+1}`}>
        {option.answerText}
      </label>
    </div>)}
  </div>
  <NextButton selectedValue={selectedValue}/>
  </React.Fragment>
  );
};

export default Checkbox;
