import React, { createContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../Auth/_redux/authActions";
import { Questions } from "../Users";
import ResultModal from "../Users/pages/ResultModal";
import Certificate from "../Users/pages/Certificate";
import { useHistory } from "react-router";
import buttonClickAudio from "../../assets/audios/ButtonClick.mp3";
import successAudio from "../../assets/audios/Success.mp3";
import failuerAudio from "../../assets/audios/WrongAnswer.mp3";
export const QuestionContext = createContext();

export default function QuestionContextContainer() {
  const userName = localStorage.getItem("name") || "test";
  const dispatch = useDispatch();
  const history = useHistory();
  const questionsArray = useSelector(
    (state) => state?.questions?.questionData?.questions
  );
  const [testScore, setTestScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [passed, setPassed] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const [totalQuestions, setTotalQuestions] = useState();
  const [remainingTimeDisplay, setRemainingTimeDisplay] = useState("00:00");
  const calculateScore = (selectedValue) => {
    console.log(selectedValue);
    if (currentQuestion.type === "singleChoice") {
      if (!selectedValue) return;
      const answerSelected = currentQuestion?.options?.find(
        (singleOption) => singleOption?.answerText === selectedValue
      );
      if (answerSelected?.isCorrect) {
        setTestScore((prevScore) => {
          const score = prevScore + 1;
          const percentage = ((score / questionsArray?.length) * 100).toFixed(
            2
          );
          setPercentage(percentage);
          return score;
        });
      }
    }
    if (currentQuestion.type === "multipleChoice") {
      if (!selectedValue?.length) return;
      const correntOptions = currentQuestion?.options?.filter(
        (singleOption) => singleOption?.isCorrect
      );
      const correctAnswers = correntOptions.map((value) => value.answerText);
      const compareArrays = (a, b) =>
        a.length === b.length && a.every((element) => b.includes(element));
      if (compareArrays(correctAnswers, selectedValue)) {
        setTestScore((prevScore) => {
          const score = prevScore + 1;
          const percentage = ((score / questionsArray?.length) * 100).toFixed(
            2
          );
          setPercentage(percentage);

          return score;
        });
      }
    }
  };
  const handleClickNext = (selectedValue) => {
    new Audio(buttonClickAudio).play();
    calculateScore(selectedValue);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async (selectedValue) => {
    await calculateScore(selectedValue);
    if (percentage >= 60) {
      new Audio(successAudio).play();
      setPassed(true);
    } else {
      new Audio(failuerAudio).play();
      setPassed(false);
    }
    setShowModal(true);
  };

  const hideModalHandler = () => {
    if (passed) {
      setShowModal(false);
      setShowCertificate(true);
      return;
    }
    setShowModal(false);
    logOut();
  };

  const hideCertificateModal = () => {
    setShowCertificate(false);
    setTestScore(0);
    //history.push("/dashboard");
    dispatch(actions.logout())
    history.push("/login");
  };

  const logOut = () => {
    dispatch(actions.logout())
    history.push("/login");
  };


  
  const countDownStart = (remainingTime) => {
    if(remainingTime >= 0){
    if (remainingTime === 0) {
      handleSubmit();
    }
    let minutes = parseInt(remainingTime / 60) % 60;
    let seconds = remainingTime % 60;
    let result =
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
    setRemainingTimeDisplay(result);
    setTimeout(()=>{
      countDownStart(--remainingTime);
    }, 1000);
  }
  };

  useEffect(()=>{
    countDownStart((totalQuestions*60));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[totalQuestions]);
  
  const value = {
    testScore,
    setTestScore,
    percentage,
    setPercentage,
    currentQuestion,
    setCurrentQuestion,
    currentIndex,
    setCurrentIndex,
    calculateScore,
    handleClickNext,
    handleSubmit,
    totalQuestions,
    setTotalQuestions,
    remainingTimeDisplay
  };
  
  return (
    <QuestionContext.Provider value={value}>
      <Questions />
      {showModal && (
        <ResultModal
          isPassed={passed}
          score={percentage}
          closeModal={hideModalHandler}
        />
      )}

      {showCertificate && (
        <Certificate
          isPassed={passed}
          name={userName}
          score={percentage}
          completionTime={27}
          closeModal={hideCertificateModal}
        />
      )}
    </QuestionContext.Provider>
  );
}
