import React, { useState, useEffect } from "react";
import "./App.css";
import { faCircle, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [questions] = useState([
    {
      questionText: "What is the capital of Ireland?",
      answerOptions: ["New York", "Dublin", "Madrid", "Paris"],
      answer: "Dublin"
    },
    {
      questionText: "Luke Skywalker is a character from which film series",
      answerOptions: [
        "The Lion King",
        "Harry Potter",
        "Star Wars",
        "Lord of the Rings"
      ],
      answer: "Star Wars"
    },
    {
      questionText: "How many days are in September",
      answerOptions: ["28", "29", "30", "31"],
      answer: "30"
    }
  ]);

  useEffect(() => {
    updateTimer();
  }, [timer]);

  const updateTimer = () => {
    if (!revealAnswers && timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setRevealAnswers(true);
    }
  };

  const handleNextQuestionClick = () => {
    setRevealAnswers(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(15);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // do the simple stuff first. If the answers are revealed we don't want to do anything with the
  const handleAnswerClick = (selectedAnswer, answer) => {
    if (revealAnswers) {
      return;
    }

    setSelectedAnswer(answer);
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setRevealAnswers(true);
  };

  const AnswerButton = ({ answerOption, answer }) => {
    // check if this is the correct answer
    const isCorrectAnswer =
      answerOption === questions[currentQuestionIndex].answer;
    const isSelectedAnswer = answer === selectedAnswer;

    // if this button is the correct answer, set the background to green
    // if this button is selected but not the correct answer, set background to red
    let backgroundColor;
    if (isCorrectAnswer) {
      backgroundColor = "green";
    } else if (isSelectedAnswer) {
      backgroundColor = "red";
    } else {
      backgroundColor = "black";
    }

    // set the background color, but only show correct/incorrect answers if the player clicked a button or if time runs out
    // this is indicated by the "revealAnswers" flag being "true"
    return (
      <button
        style={{ backgroundColor: revealAnswers && backgroundColor }}
        onClick={() => handleAnswerClick(answerOption, answer)}
      >
        <FontAwesomeIcon icon={faCircle} /> {answerOption}
      </button>
    );
  };

  return (
    <div class="quiz-container">
      {currentQuestionIndex < questions.length ? (
        <>
          <div class="timer"> {timer}</div>
          <div class="question">
            {questions[currentQuestionIndex].questionText}
          </div>
          <div class="answer-list">
            {questions[currentQuestionIndex].answerOptions.map(
              (answerOption, index) => (
                <div class="answer-item">
                  <AnswerButton
                    answerOption={answerOption}
                    answer={questions[currentQuestionIndex].answer}
                  />
                </div>
              )
            )}
          </div>
          {revealAnswers && (
            <button onClick={handleNextQuestionClick}>Next Question</button>
          )}
        </>
      ) : (
        <>
          <div class="quiz-score">
            You scored {score} out of {questions.length}
          </div>
          <button class="play-again-button" onClick={() => resetQuiz()}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default App;
