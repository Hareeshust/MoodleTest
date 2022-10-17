import React, { useEffect, useState } from "react";
import { questionsBundle } from "../../../data/questions";
import Checkbox from "../../Components/InputTypes/Checkbox";
import RadioButton from "../../Components/InputTypes/RadioButton";
import nextButton from "../../../assets/Next-button.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";


const SingleQuestion = ({handleSubmit}) => {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const questionsArray = useSelector(state=>state?.questions?.questionData?.questions)
  const history=useHistory()
  const handleClickNext=()=>{
    setCurrentIndex(prevIndex=>prevIndex+1)
  }
  const questionsBundleHandler = () => {
    switch (currentQuestion?.type) {
      case "singleChoice":
        
        return <RadioButton currentQuestion={currentQuestion}/>;
      case "multipleChoice":
        return <Checkbox  currentQuestion={currentQuestion} />;
      default:
        <Checkbox  currentQuestion={currentQuestion} />;
    }
  };
  useEffect(() => {
    if(questionsArray?.length){
      setCurrentQuestion(questionsArray[currentIndex]);
    }
    else{
      history.push("/")
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
        <form>
          {(questionsBundleHandler())}
        </form>
        {Array.isArray(questionsArray) && (questionsArray.length-1===currentIndex)?
        <img
        src={nextButton}
        alt="Submit"
        class="nextButton"
        onClick={
          handleSubmit
        }
      />
        :<img
                src={nextButton}
                alt="Next button"
                class="nextButton"
                onClick={
                  handleClickNext
                }
              />}
      </div>
    </React.Fragment>
  );
};

export default React.memo(SingleQuestion);