"use strict";

//set questions
let questions = [
    {
        question: 
            "Which syntax is correct to output 'Hello World' in an alert box?",
        option1: "alertBox('Hello World');",
        option2: "msg('Hello World');",
        option3: "alert('Hello World');",
        option4: "msgBox('Hello World');",
        answer: 3
    },
    {
        question: 
            "What is the full meaning of HTML?",
        option1: "Hyper Type Marked Language",
        option2: "HyperText Markup Language",
        option3: "HyperLink Tech Major Link",
        option4: "HyperType Manual Log",
        answer: 2
    },
    {
        question: 
            "How do you call a function named 'myFunction'?",
        option1: "call function myFunction()",
        option2: "call myFunction('')",
        option3: "myFunction();",
        option4: "execute myFunction()",
        answer: 3
    },
    {
        question: 
            "What is the correct way to write a JavaScript array?",
        option1: "var colors=(1:'red', 2:'green', 3:'blue')",
        option2: "var colors='red','green','blue'",
        option3: "var colors=1=('red'), 2=('green'), 3=('blue')",
        option4: "var colors=['red','green','blue']",
        answer: 4
        
    },
    {
        question: 
            "Which operator is used to assign a value to a variable?",
        option1: "=",
        option2: "*",
        option3: "x",
        option4: "-",
        answer: 1

    },
    {
        question: 
            "What is the correct way to write a JavaScript object?",
        option1: "var person={firstName ='John', lastName = 'Doe'}",
        option2: "var person={firstName:'John', lastName: 'Doe'}",
        option3: "var person= firstName:'John', lastName: 'Doe'",
        option4: "var person=[firstName:'John', lastName: 'Doe']",
        answer: 2
    },
    {
        question: 
        "Inside which HTML element do we put the JavaScript?",
        option1: "&ltscript&gt",
        option2: "&ltjavascript&gt",
        option3: "&ltjs&gt",
        option4: "&ltscripting&gt",
        answer: 1
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        option1: "&ltscript href='xxx.js'&gt",
        option2: "&ltscript name='xxx.js'&gt",
        option3: "&ltscript src='xxx.js'&gt",
        option4: "&ltscript file='xxx.js'&gt",
        answer: 3
    },
    {
        question:
            "What does API stand for'?",
        option1: "Appliances Programming Interaction",
        option2: "Applied Prorgamming Interface",
        option3: "Application Programming Instruction",
        option4: "Application Programming Interface",
        answer: 4
    },
    {
        question:
            "What does DOM stand for?",
        option1: "Docstring Object Module",
        option2: "Document Object Model",
        option3: "Doctype Oriented Module",
        option4: "Document Oriented Model",
        answer: 2
    }
]
//get references
const questionList = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('options'));
const nextButton = document.getElementById("nextBtn");
const timer = document.getElementById("timer");
const getNumOfQuestion = document.getElementById('numberQuestion');
const resultBox = document.getElementById('result');

//object variables

let score = 0;
let queCount = 0;
let currentQuestion = {};
let currentQuestionIndex = 0;
let acceptAnswers = false;
let availableQuestion = [];
let questionCounter = 0;
let questionNumber = 0;
let correctAnswer = null;


//CONSTANTS
const SCORE_MARK = 1;
const MAXIMUM_QUESTION = 10;
//get 10minutes in seconds;
const TIME_DURATION = 600;

//add timer to the quiz
let stopTimer;
function startTimer(){
    let remainingSeconds = TIME_DURATION;

    function updateTimer(){
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        timer.innerHTML = `${minutes}:${seconds}`;
        
        if(remainingSeconds === 0){
            //Time is up!! go to result page
            alert("Time up!!");
            showResult();
        } else if (questionCounter > MAXIMUM_QUESTION) {
            showResult();
        }else {
            remainingSeconds--;
            stopTimer = setTimeout(updateTimer, 1000);
        }
    }
    updateTimer();
}

//display and access quiz
function startQuiz() {
    if(questionCounter >= MAXIMUM_QUESTION){
        showResult();
    }else{
        availableQuestion = [...questions];
        score = 0;
        questionCounter = 0;
        questionNumber = 0;
        nextButton.innerHTML = "Next";
        console.log(availableQuestion);
        showQuestion();

        // set the time to start once question loads
        startTimer();
    };
}

//Declare a result function to show the result of the quiz when it has been completed
function showResult(){
    //Hide the quiz elements
    const quizBox = document.getElementById('quiz');
    quizBox.style.display = 'none';
    questionList.style.display = 'none';
    choices.forEach(option => option.style.display = 'none');
    nextButton.style.display = 'none';
    timer.style.display = 'none';

    //Display the result box
    resultBox.style.display = 'flex';

    //display the result info based on user score
    
    const scoreText = document.getElementById('scoreText');
    //creaate a variable that store the result info
    let scoreInfo;
    if(score === MAXIMUM_QUESTION){
        scoreInfo = `<p>🤗😆Perfect! You got all questions right. Well done!</p>`;
    } else if(score > 6){
        scoreInfo  = `<p>🥳Congratulations! You got ${score} out of ${MAXIMUM_QUESTION} questions.</p>`;
    } else if(score > 3){
        scoreInfo  = `<p>👍Nice! You got ${score} out of ${MAXIMUM_QUESTION} questions.</p>`;
    } else {
        scoreInfo  = `<p>😐Sadly, you got ${score} out of ${MAXIMUM_QUESTION} questions. Better luck next time!</p>`;
    };
    scoreText.innerHTML = scoreInfo;

    //Display retry and exit buttons
    const resultButtons = document.getElementById('resultButton');
    resultButtons.innerHTML = `<button onclick="retryQuiz()" class="btn">Retry</button>`;
    resultButtons.innerHTML += `<button onclick="exitQuiz()" class="btn">Exit</button>`;

    //stop timer
    clearTimeout(stopTimer);
}

function retryQuiz(){
    //Reload the page to restart the quiz
    window.location.reload();
}

function exitQuiz(){
    //Redirect page to the index.html page
    window.location.assign('/index.html');
}

function getRandomQuestionIndex() {
    return Math.floor(Math.random() * availableQuestion.length);
}

//Display and have access to quiz

function showQuestion() {
    if (availableQuestion.length === 0 || questionCounter >= MAXIMUM_QUESTION) {
        console.log('End of quiz');
        return showResult();
    }

    questionCounter++;
    questionNumber++;
    queCount++;
    getNumOfQuestion.innerText = `Question ${queCount} / ${MAXIMUM_QUESTION}`;

    // Randomly select the next question
    currentQuestionIndex = getRandomQuestionIndex();
    currentQuestion = availableQuestion[currentQuestionIndex];

    //Display question text with numbering 
    questionList.innerText = questionNumber + ". " + currentQuestion.question;

    // Display options
    choices.forEach((option) => {
        option.classList.remove("correct", "incorrect");
        const number = option.dataset["number"];
        option.innerHTML = currentQuestion["option" + number];

        if(number == currentQuestion.answer){
            correctAnswer = option;
        };
    });
    availableQuestion.splice(currentQuestionIndex, 1);
    console.log(availableQuestion);

    acceptAnswers = true;
}
let clickDisabled = false;

//get user score for the quiz
 function incrementScore(num){
    score += num;
 }

//Click to get answer
choices.forEach(option => {
    option.addEventListener('click', handleAnswerClick);
});

nextButton.addEventListener('click', handleNextButtonClick);

// Handling the click on an answer
function handleAnswerClick(e) {
    if (!acceptAnswers) {
        return;
    }
    acceptAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    // Check if the selected option is correct
    const correctOption = selectedAnswer == currentQuestion.answer;

    // Highlight the selected option
    selectedOption.classList.add(correctOption ? "correct" : "incorrect");

    // Highlight the correct option if the selected answer is wrong
    if (!correctOption) {
        choices[currentQuestion.answer - 1].classList.add('correct');
    } else {
        // Increment the score only if the answer is correct
        incrementScore(SCORE_MARK);
    };

    // Display the Next button
    nextButton.style.display = "block";
}

// Handling the click on the Next button
function handleNextButtonClick() {
    if (clickDisabled) {
        return;
    }

    clickDisabled = true;
    nextButton.style.display = "none";
    acceptAnswers = true;
    showQuestion();

    setTimeout(() => {
        clickDisabled = false;
    }, 500);
}

startQuiz();