import React, { useState, useEffect } from "react";
import "./App.css";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const TIMER_START_VALUE = 15;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [questions] = useState([
    {
      questionText: "What is the capital of Ireland",
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
    },
    {
      questionText: "What is the house number of the Simpsons?",
      answerOptions: ["1", "64", "742", "0"],
      answer: "742"
    },
    {
      questionText: "Which of these is not an planet?",
      answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
      answer: "Florida"
    }
  ]);

  // when `timer` changes this will call this effect and trigger the countdown
  // could possibly write `updateTimer` as a simple loop but good to teach the useEffect hook
  useEffect(() => {
    updateTimer();
  }, [timer]);

  // This is a helper to help tidy up the code
  const currentQuestion = questions[currentQuestionIndex];

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
    setTimer(TIMER_START_VALUE);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(TIMER_START_VALUE);
  };

  // do the simple stuff first. If the answers are revealed we don't want to do anything with the button click
  const handleAnswerClick = selectedAnswer => {
    if (revealAnswers) {
      return;
    }
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    setRevealAnswers(true);
  };

  return (
    <div className="quiz-wrapper">
      {currentQuestionIndex < questions.length ? (
        <>
          <div className="question-count">
            <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
          </div>
          <div className="timer-wrapper">
            <div
              className="timer-countdown-bar"
              style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
            ></div>
          </div>
          <div className="question">{currentQuestion.questionText}?</div>
          <div className="answer-list">
            {currentQuestion.answerOptions.map((answerOption, index) => (
              <div className="answer-item" key={`answer_button_${index}`}>
                <AnswerButton
                  answerOption={answerOption}
                  isCorrectAnswer={answerOption === currentQuestion.answer}
                  isSelectedAnswer={answerOption === selectedAnswer}
                  revealAnswers={revealAnswers}
                  handleAnswerClick={handleAnswerClick}
                />
              </div>
            ))}
          </div>
          {revealAnswers && (
            <div className="next-question-wrapper">
              <button onClick={handleNextQuestionClick}>
                <span>Next</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="quiz-score">
            You scored {score} out of {questions.length}
          </div>
          <div className="play-again-wrapper">
            <button className="play-again-button" onClick={() => resetQuiz()}>
              Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

/******* ANSWER BUTTON COMPONENT ********/
const AnswerButton = ({
  answerOption,
  isCorrectAnswer,
  isSelectedAnswer,
  revealAnswers,
  handleAnswerClick
}) => {
  let backgroundColor;
  let icon;

  // if this button is the correct answer, set the background to green and dispay "tick circle"
  // if this button is selected but not the correct answer, set background to red and display "x circle"
  // only show correct/incorrect answers if the player clicked a button or if time runs out
  // this is indicated by the "revealAnswers" flag being "true"
  // else, display a regular "circle"
  if (revealAnswers && isCorrectAnswer) {
    backgroundColor = "#2f922f";
    icon = faCheckCircle;
  } else if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else {
    icon = faCircleRegular;
  }

  return (
    <button
      style={{ backgroundColor: backgroundColor }}
      onClick={() => handleAnswerClick(answerOption)}
    >
      <FontAwesomeIcon className="answer-item-circle" icon={icon} />
      {answerOption}
    </button>
  );
};

export default App;
