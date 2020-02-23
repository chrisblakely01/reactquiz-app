# Walkthrough

- Start with the layouts

- Let's add a background, and style the body

```
* {
  font-family: "Courier New", Courier, monospace;
}

body {
  background-color: #7cc6fe;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

- Add a quiz-container

```
const App = () => {
  return (
    <div class="quiz-container">
    </div>
  );
}

.quiz-container {
  background-color: #fff;
  width: 450px;
  height: min-content;
  border-radius: 15px;
  padding: 10px;
}
```

- We have a white line! Let's add to our game

- Add a container for the question. Add dummy data for now

```
<div class="question">
    Q) What is the capital of Spain?
</div>

.question {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
}
```

- Now, let's style our answer buttons
- Add a div to hold the buttons, remember grouping related elements together in a parent div helps with layouts

```
<div class="answer-list">
    <div class="answer-item">
        <button>Answer 1</button>
    </div>
    <div class="answer-item">
        <button>Answer 2</button>
    </div>
    <div class="answer-item">
        <button>Answer 3</button>
    </div>
    <div class="answer-item">
        <button>Answer 4</button>
    </div>
</div>

.answer-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

```

- Next, lets style the buttons. Since they are in a flex parent, we can use flex properties on the buttons
- The answer-item div is a container which helps us space things out

```

.answer-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 50%;
  padding: 10px;
  box-sizing: border-box;
}

```

- Next we style the buttons to make them fill the container:

```
.answer-item button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #ffffff;
  background-color: #545e75;
}
```

- Let's add some styles to adjust the hover, and hide the outline onClick

````
.answer-item button:hover {
  background-color: #f4e04d;
  color: #000000;
}

.answer-item button:focus {
  outline: none;
}

```

- Now we can start adding some data. Let's store some questions in state (Doing this seperates data from presentation)

```

  const [questions, setQuestions] = useState([
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
  ])

  ```

  - Let's render the first questions, using the data we just added
  - Replace the dummy question text with JSX (we'll make this more dynamic)

  ```
    <div class="question">
        {questions[0].questionText}
    </div>

```

- Next replace the questions sections. Map over the answer options, and display each

```
    <div class="answer-list">
    {questions[0].answerOptions.map((answerOption, index) => (
        <div class="answer-item">
        <button>{answerOption}</button>
        </div>
    ))}
    </div>
```

- Now, we want to handle when the user clicks an answer, and see if its correct
- Create a function

```
  const handleAnswerClick = selectedAnswer => {
    if (selectedAnswer === questions[0].answer) {
      alert("correct!");
    } else {
      alert("wrong!");
    }
  };
```

- This takes the clicked answer, and compares it to answer stored in the current question
- If the answer is correct, an alert is displayed

- Add the onclick handler

```
<button onClick={() => handleAnswerClick(answerOption)}>
```

- Ok so everything works! But instead of an alert, we want to move to the next question. So how do we do this?
- Now is a good time to look at making the code more dynamic. We hardcoded the current question index, which is bad practice and not very dynamic

- lets store the current question in state, which we'll initially to 0

```
  const [currentQuestion, setCurrentQuestion] = useState(0);
```

- And instead of 0, we'll use this value

- Now, we can increment this state value, which will cause the app to rerender with the next question:

```
  const handleAnswerClick = selectedAnswer => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  };
```

- [QUEUE] explain this more for emphasis
- Now if we play with the app, it moves to the next question! Nice!

- You'll notice if we keep going, the app will throw an error - thats because our index has gone over the number of questions!

- When we have answered all the questions, we want to show the score instead of the answer list

- First, let's add a div to hold the score content (we'll look at how to save the score in a minute)

```
    <div class="quiz-score">You scored SCORE out of {questions.length}</div>
```

- {questions.length} means the data is dynamic - if the number of questions change we don't have to alter the rendering code in any way. A good example of data vs presentation

- And add some styling to center everything

```
.quiz-score {
  text-align: center;
}
```

- Looks good, except we are showing the score while the user is still playing the game!
- What we want is display the question list, OR display the score
- So let's use conditional rendering to display one or the other:

```
    <div class="quiz-container">
      {currentQuestion < questions.length ? (
        <>
          <div class="question">{questions[currentQuestion].questionText}</div>
          <div class="answer-list">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <div class="answer-item">
                  <button onClick={() => handleAnswerClick(answerOption)}>
                    {answerOption}
                  </button>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <div class="quiz-score">You scored SCORE out of {questions.length}</div>
      )}
    </div>
```

- [QUEUE] explain this more for emphasis
- Now, when we've answered all the questions, the score will display

- [QUEUE] Remember, writing out the steps helps plan what we need.
- [QUEUE] Include hints and let viewer have a go
- Let's implement saving the score. Basically, when the user answers a correct question, we want to add 1 to their score
- At the end we want to display their score
- For this, we need another state object:

``
const [score, setScore] = useState(0);
```

- Next, in our handleAnswerClick function, we want to add one to the score if they guess correctly
- We can also refactor this method to become tidier, we don't need an else!

- [QUEUE] emphasis how refactoring a design as you code is natural etc

```
  const handleAnswerClick = selectedAnswer => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };
```

- Now, we can display our state variable within the score message:

```
    <div class="quiz-score">
        You scored {score} out of {questions.length}
    </div>
```

- Play with the app to see how you score!

- Lastly, let's add functionality to reset the quiz.

- Add a fragment and a button to the score element:

```
        <>
          <div class="quiz-score">
            You scored {score} out of {questions.length}
          </div>
          <button class="play-again-button" onClick={() => resetQuiz()}>
            Play Again
          </button>
        </>
```

- Add an onlick listener:

```
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  }

```

- Finally, we'll reuse some styles for consistency:

```
.play-again-button,
.answer-item button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #ffffff;
  background-color: #545e75;
}

.play-again-button:hover,
.answer-item button:hover {
  background-color: #f4e04d;
  color: #000000;
}

.quiz-score,
.question {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
}


```

- Done!
