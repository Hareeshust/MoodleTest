import React, {  createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Questions } from '../Users';
export const QuestionContext = createContext();

export default function QuestionContextContainer() {
  const questionsArray = useSelector(
    (state) => state?.questions?.questionData?.questions
  );
    const [testScore, setTestScore] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const calculateScore = (selectedValue) => {
      if (currentQuestion.type === "singleChoice") {
        if (!selectedValue) return;
        const answerSelected = currentQuestion?.options?.find(
          (singleOption) => singleOption?.answerText === selectedValue
        );
        if (answerSelected?.isCorrect) {
          setTestScore((prevScore) =>{
            const score=prevScore+1
            const percentage=((score/questionsArray?.length) * 100).toFixed(2)
            setPercentage(percentage)
            return score});
        }
      }
      if (currentQuestion.type === "multipleChoice") {
        if(!selectedValue?.length) return
        const correntOptions = currentQuestion?.options?.filter(
          (singleOption) => singleOption?.isCorrect
        );
        const correctAnswers=correntOptions.map(value=>value.answerText)
        const compareArrays = (a, b) =>
        a.length === b.length &&
        a.every((element) => b.includes(element));
        if(compareArrays(correctAnswers,selectedValue)){
          setTestScore((prevScore) =>{
            const score=prevScore+1
            const percentage=((score/questionsArray?.length) * 100).toFixed(2)
            setPercentage(percentage)
            return score});
        }
      }
    };
    const handleClickNext = (selectedValue) => {
      calculateScore(selectedValue);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    };
    const value={testScore,
        setTestScore,
        percentage,
        setPercentage,
        currentQuestion,
        setCurrentQuestion,
        currentIndex,
        setCurrentIndex,
        calculateScore,
        handleClickNext
      }
    return (
      <QuestionContext.Provider value={value}>
        <Questions />
      </QuestionContext.Provider>
    )
  }