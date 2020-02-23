import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
    startTimer();
  }, [timer]);

  const startTimer = () => {
    if (!revealAnswers && timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setRevealAnswers(true);
    }
  };

  const handleAnswerClick = (selectedAnswer, index) => {
    setSelectedAnswer(index)
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setRevealAnswers(true);
  };

  const handleNextQuestionClick = () => {
    setRevealAnswers(false);
    setCurrentQuestion(currentQuestion + 1);
    setTimer(15);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div class="quiz-container">
      {currentQuestion < questions.length ? (
        <>
          <div class="question">
            {timer} {questions[currentQuestion].questionText}
          </div>
          <div class="answer-list">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <div class="answer-item">
                  <button
                    style={{
                      backgroundColor:
                        revealAnswers &&
                        (answerOption === questions[currentQuestion].answer
                          ? "green"
                          : (index === selectedAnswer && "red"))
                    }}
                    onClick={() => handleAnswerClick(answerOption, index)}
                  >
                    {answerOption}
                  </button>
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
