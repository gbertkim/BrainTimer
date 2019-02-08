'use strict'
let questionNumber = 0;
let score = 0;
var count = 360;

// Global timer set
var timer = new Timer(function() {
    $(".timerCount").html(count);
    count--;
    if(count === -1) {
      timer.stop();
      timeFin();
    } 
    if(questionNumber === STORE.length){
      timer.stop();
    }
  }, 1000);

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        console.log("Timer stopped")
        return this;
    }

    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        console.log("Timer started")
        return this;
    }

    this.reset = function(newT) {
        let t = newT;
        return this.stop().start();
    }
}

// Function for when the timer runs out
function timeFin(){
  console.log("Timer is out");
  $('.quizMain').html(`
    <div class="submitPage">
      <img src="https://media.giphy.com/media/xsF1FSDbjguis/giphy.gif" alt="back to the future car animated">
      <p class="answer">Time ran out!</p>
      <p class="response">Be faster next time.</p>
      <button type="button" id="tryAgain" class="uniBut">Try Again?</button>
    </div>
  `);
  questionUpdate(STORE.length);
}

//To load the needed information and functions for the start
function startQuiz(){
  console.log("Quiz loaded")
  startButton();
  questionUpdate(0);
  scoreUpdate();
  timer.stop();
};
startQuiz();

//Actions to take place when the quiz start button is clicked
function startButton(){
  $('.quizStart').on('click', '.startNow', function(event) {
    console.log("Quiz started")
    $('.quizStart').hide(); 
    $('.mainB').removeClass("justifyC");
    renderQuestion();
    questionUpdate(questionNumber+1);
    submitChoice();
    nextButton();
    timer.stop();
    timer.start();
    restartQuiz ()
  })
}

//Traverse through the array of questions 
function makeQuestions(){
  if (questionNumber < STORE.length) {
    if (STORE[questionNumber].type === 'text'){
      console.log("Text question form is generated");
      return textQuestion();
    }
    else {
      console.log("Image question form is generated");
      return imageQuestion();
    }
  } else {
    alert("fin!");
    console.log("Sending to results page...");
    questionNumber = STORE.length;
    questionUpdate(questionNumber);
    resultsPage();
  }
}

//Form to create text questions
function textQuestion(){
 return `<div class="question-${questionNumber}">
    <legend class="questionShow">${STORE[questionNumber].question}</legend>
    <form class= "formText">
      <fieldset class="choiceOptions" role="listbox">  
        <label class="answerOption">
          <input id="choice1" type="radio" 
          value="1" 
          name="answer" 
          role="option"
          tabindex="0" required> 
          <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
          <input id="choice2" type="radio" 
          value="2" 
          name="answer" 
          role="option" 
          tabindex="0" required>
          <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
          <input id="choice3" type="radio" 
          value="3" 
          name="answer" 
          role="option" 
          tabindex="0" required>
          <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
          <input id="choice4" type="radio" 
          value="4" 
          name="answer" 
          role="option" 
          tabindex="0" required>
          <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" id="submitButton" class="uniBut">Submit</button>
    </fieldset>
    </form>
    </div>`;
}

//Form to create image questions
function imageQuestion(){
   return `<div class="question-${questionNumber}">
    <legend class="questionShow">${STORE[questionNumber].question}</legend>
    <form class="form-inline">
      <fieldset class= "choiceOptions" role="listbox">    
        <label class="answerOption inlineOption">
          <input id="choice1" type="radio" 
          value="1" 
          name="answer" 
          role="option"
          tabindex="0" required> 
          <img src=${STORE[questionNumber].answers[0]}>
        </label>
        <label class="answerOption inlineOption">
          <input id="choice2" type="radio" 
          value="2" 
          name="answer" 
          role="option" 
          tabindex="0" required>
          <img src=${STORE[questionNumber].answers[1]}>
        </label>
        <label class="answerOption inlineOption">
          <input id="choice3" type="radio" 
          value="3" 
          name="answer" 
          role="option" 
          tabindex="0" required>
          <img src=${STORE[questionNumber].answers[2]}>
        </label>
        <label class="answerOption inlineOption">
          <input id="choice4" type="radio" 
          value="4" 
          name="answer" 
          role="option" 
          tabindex="0" required>
          <img src=${STORE[questionNumber].answers[3]}>
        </label>
        <button type="submit" id="submitButton" class="uniBut">Submit</button>
      </fieldset>
    </form>
    </div>`;
}

//Points to index element and changes its content
function renderQuestion(){
  console.log("Rendering questions");
  $('.quizMain').html(makeQuestions());
}

//Takes the score and sends you to appropriate results page
function resultsPage(){
  console.log("Results Page is loaded")  
  if (score >= 8){
    $('.quizMain').html(`
      <div class = submitPage>
        <img src = "https://media0.giphy.com/media/FUc4mw5kM1hVS/giphy.gif?cid=3640f6095c4b24a76a595350638ff17f" alt="Enstein animated">
        <div class="resultsText">
          <p class="response">Einstein!</p>
          <p class="answer">You scored ${score} out of ${STORE.length}!</p>
        </div>
        <button type="button" id="tryAgain" class="uniBut">Try Again?</button>
      </div>
    `);
  }
  else if (score >=5 && score < 8){
    $('.quizMain').html(`
      <div class = submitPage>
        <img src = "https://media0.giphy.com/media/tHufwMDTUi20E/giphy.gif?cid=3640f6095c4b25013745425967e87bb8" alt="hamster in school animated"> 
        <div class="resultsText">
          <p class="response">Looks like you missed a couple!</p> 
          <p class="answer">You scored ${score} out of ${STORE.length}!</p>
        </div>
        <button type="button" id="tryAgain" class="uniBut">Try Again?</button>
      </div>
    `);
  } else {
    $('.quizMain').html(`
      <div class = submitPage>
        <img src = "https://media0.giphy.com/media/l378AEZceMwWboAQE/giphy.gif?cid=3640f6095c4b25013745425967e87bb8" alt="Sleepy student animated" class="lrg">
        <div class="resultsText">
          <p class="response">Try again!</p>
          <p class"answer">You scored ${score} out of ${STORE.length}!</p>
        </div>
        <button type="button" id="tryAgain" class="uniBut">Try Again?</button>
      </div>
    `);
  }
}

//Reload button
function restartQuiz () {
  $('main').on('click', '#tryAgain', function (event) {
    location.reload();
  });
}

//Submit button 
function submitChoice(){
  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log('submitChoice function ran');
    let userChoice = $('input:checked').val();
    console.log("User's choice: " + userChoice);
    timer.stop();
    if (userChoice === STORE[questionNumber].correctAnswer){
      rightAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//Question count 
function questionUpdate(num){
  console.log("Question display is updated");
  $('.questionDisplay').html(`Question: ${num} out of ${STORE.length}`);
}

//Score count
function scoreUpdate(){
  console.log("Score display is updated");
   $('.scoreDisplay').html(`Score: ${score} out of ${STORE.length}`);
}

//Checks if questions are correct or incorrect by comparing objects
function rightAnswer(){
  console.log("Right answer page is loaded");
  let corAns = STORE[questionNumber].correctAnswer - 1;
  if (STORE[questionNumber].type === 'image'){
    $('.quizMain').html(`
      <div class="submitPage">
        <img src = "https://media1.tenor.com/images/f72b54315d8eaf3b0757702b61e538cd/tenor.gif?itemid=6033767" alt="neil de grasse tyson animated">
        <div class="analyzeText">
         <p class="response">Good Job!</p>
         <p class="answer">The correct answer is:</p> 
        </div>
        <img src=${STORE[questionNumber].answers[corAns]} class="sml">
        <button type="button" id="nextBut" class="uniBut">Next</button>
      </div>`
    );
  } else {
    $('.quizMain').html(`
      <div class="submitPage">
        <img src = "https://media1.tenor.com/images/f72b54315d8eaf3b0757702b61e538cd/tenor.gif?itemid=6033767" alt="neil de grasse tyson animated">
        <div class="analyzeText">
          <p class="response">Good Job!</p>
          <p class="answer">The correct answer is:<br>${STORE[questionNumber].answers[corAns]}</p>
        </div>
        <button type="button" id="nextBut" class="uniBut">Next</button>
      </div>`
    );
  }
  score++;
  scoreUpdate();
}

//Checks if questions are correct or incorrect by comparing objects
function wrongAnswer(){
  console.log("Wrong answer page is loaded");
  let corAns = STORE[questionNumber].correctAnswer - 1;
    if (STORE[questionNumber].type === 'image'){
      $('.quizMain').html(`
        <div class="submitPage">
          <img src = "https://media1.tenor.com/images/68045b43f2b226f9bc5f192b112dec79/tenor.gif?itemid=5568438" alt="hangover science animated">
          <div class="analyzeText">
            <p class="response">Incorrect!</p>
            <p class="answer">The correct answer is:</p> 
          </div>
          <img src=${STORE[questionNumber].answers[corAns]}>
          <button type="button" id="nextBut" class="uniBut">Next</button>
        </div>`
      );
    } else {
      $('.quizMain').html(`
        <div class="submitPage">
          <img src="https://media1.tenor.com/images/68045b43f2b226f9bc5f192b112dec79/tenor.gif?itemid=5568438" alt="hangover science animated">
          <div class="analyzeText">
            <p class="response">Incorrect!</p>
            <p class"answer">The correct answer is:</p>
            <p class"answer">${STORE[questionNumber].answers[corAns]}</p>
          </div>
          <button type="button" id="nextBut" class="uniBut">Next</button>
        </div>`
      );
    }
}

//Next button
function nextButton(){
  $('main').on('click', '#nextBut', function(){
    console.log("Next button is clicked");
    event.preventDefault();
    timer.start();
    questionNumber++;
    questionUpdate(questionNumber+1);
    renderQuestion();
    submitChoice();
  })
}

//Helps with accessibility and visibility of question choices
$('main').on('focus', 'input', function(){
  $(this).parent().siblings().removeClass("choiceFocus");
  $(this).parent().addClass("choiceFocus");
})


