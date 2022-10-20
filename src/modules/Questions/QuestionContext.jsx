import React, { createContext, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import * as actions from "../Auth/_redux/authActions";
import { Questions } from "../Users";
import ResultModal from "../Users/pages/ResultModal";
import Certificate from "../Users/pages/Certificate";
import { useHistory } from "react-router";
export const QuestionContext = createContext();

export default function QuestionContextContainer() {
  const dispatch = useDispatch();
  const history=useHistory()
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
  const calculateScore = (selectedValue) => {
    console.log(selectedValue)
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
    calculateScore(selectedValue);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async(selectedValue) => {
    await calculateScore(selectedValue);
    setShowModal(true);
    testScore >= 60 ? setPassed(true) : setPassed(false);
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
    history.push("/dashboard")
  };

  const logOut = () => {
    dispatch(actions.logout());
  };
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
          name={"User Name"}
          score={percentage}
          completionTime={27}
          closeModal={hideCertificateModal}
        />
      )}
    </QuestionContext.Provider>
  );
}
