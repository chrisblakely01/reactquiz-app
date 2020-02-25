import React, { useState, useEffect } from "react";
import "./App.css";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
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
    setTimer(15);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(15);
  };

  // do the simple stuff first. If the answers are revealed we don't want to do anything with the
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

  const AnswerButton = ({ answerOption }) => {
    // check if this is the correct answer
    const isCorrectAnswer = answerOption === currentQuestion.answer;
    const isSelectedAnswer = answerOption === selectedAnswer;

    // if this button is the correct answer, set the background to green
    // if this button is selected but not the correct answer, set background to red
    // TODO move to classes
    let backgroundColor;
    let icon;
    if (isCorrectAnswer) {
      backgroundColor = "#2f922f";
      icon = faCheckCircle;
    } else if (isSelectedAnswer) {
      backgroundColor = "#ff3333";
      icon = faTimesCircle;
    } else {
      icon = faCircleRegular;
    }

    // set the background color, but only show correct/incorrect answers if the player clicked a button or if time runs out
    // this is indicated by the "revealAnswers" flag being "true"
    return (
      <button
        style={{ backgroundColor: revealAnswers && backgroundColor }}
        onClick={() => handleAnswerClick(answerOption)}
      >
        <FontAwesomeIcon
          className="answer-item-circle"
          icon={revealAnswers ? icon : faCircleRegular}
        />
        {answerOption}
      </button>
    );
  };

  return (
    <div class="quiz-container">
      {currentQuestionIndex < questions.length ? (
        <>
          <div className="question-count">
            <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
          </div>
          <div class="timer-wrapper">
            <div
              class="timer-countdown-bar"
              style={{ width: (timer / 15) * 100 + "%" }}
            ></div>
          </div>
          <div class="question">{currentQuestion.questionText}?</div>
          <div class="answer-list">
            {currentQuestion.answerOptions.map((answerOption, index) => (
              <div class="answer-item">
                <AnswerButton answerOption={answerOption} />
              </div>
            ))}
          </div>
          {revealAnswers && (
            <div className="next-question-wrapper">
              <button onClick={handleNextQuestionClick}>
                <span>Next </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div class="quiz-score">
            You scored {score} out of {questions.length}
          </div>
          <div className="play-again-wrapper">
            <button class="play-again-button" onClick={() => resetQuiz()}>
              Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
