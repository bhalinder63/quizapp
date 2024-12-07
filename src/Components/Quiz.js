import React, { useState, useEffect } from "react";
import Button from "./Buttoncomponent";
import quizQuestions from "./Quizquestionsdata";

export default function Quiz() {
  const [questionindex, setquestionindex] = useState(0);
  const [score, setscore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [alert, setalert] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const handleNextClick = () => {
    if (selectedOption === null) {
      setalert("Please select at least an option");
      return; // Exit the function if no option is selected
    }

    if (questionindex < quizQuestions.length - 1) {
      setquestionindex(questionindex + 1);
      setSelectedOption(null);
    }
    setalert(null);
  };

  const handleSelectedOption = (option) => {
    setSelectedOption(option);
    setalert(null);
    if (option === quizQuestions[questionindex].answer) {
      setscore(score + 1);
    }
  };

  const handleResetClick = () => {
    setquestionindex(0);
    setSelectedOption(null);
    setscore(0);
    setShowScore(false);
  };

  useEffect(() => {
    if (questionindex === quizQuestions.length - 1 && selectedOption) {
      const timer = setTimeout(() => {
        setShowScore(true);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [questionindex, selectedOption]);

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {questionindex === quizQuestions.length - 1 && selectedOption ? (
        showScore ? (
          <>
            <h3 className="score">Your total score is {score}</h3>
            <Button buttontext={"Reset Quiz"} handleClick={handleResetClick} />
          </>
        ) : (
          <h3>Calculating your score...</h3>
        )
      ) : (
        <>
          <h2>{quizQuestions[questionindex].question}</h2>
          <ul>
            {quizQuestions[questionindex].options.map((option, index) => {
              return (
                <li
                  onClick={() => {
                    if (!selectedOption) handleSelectedOption(option);
                  }}
                  key={index}
                  style={{
                    backgroundColor:
                      selectedOption === option
                        ? option === quizQuestions[questionindex].answer
                          ? "green"
                          : "red"
                        : "rgba(255, 255, 255, 0.2",
                    cursor: selectedOption ? "not-allowed" : "pointer",
                  }}
                >
                  {option}
                </li>
              );
            })}
          </ul>
          <Button
            handleClick={handleNextClick}
            disabled={questionindex === quizQuestions.length - 1}
            buttontext={"Next"}
          />
          <div className="index">
            {questionindex + 1} of {quizQuestions.length} Questions
          </div>
          {alert && <h3 className="alert">{alert}</h3>}
        </>
      )}
    </div>
  );
}
