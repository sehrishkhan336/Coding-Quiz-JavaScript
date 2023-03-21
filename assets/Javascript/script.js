var questions = [
    {
        title: "Commonly used data types Do Not include: ",
        choices: ["Strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed with __________.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        title: "Arrays in JavaScript can be used to store________.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _________ when being assigned to variables.",
        choices: ["Commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
];
var StartQuizPage = document.querySelector(".container");
var timeLeftEl = document.querySelector(".timerstyle");
var headerEl = document.querySelector("#heading");
var contentEl = document.querySelector("#content");
var startBtnEl = document.querySelector(".quiz-button");
var highscoresEl = document.querySelector(".high-scores");
var currentScore = 0;
var timeLeft = 60;
var indexOfCurrentQuestion = 0;
var currentQuestion = 0;

function renderStartQuizPage() {
    headerEl.textContent = "Coding Quiz Challenge";
    var startBtnEl = document.createElement("button");
    startBtnEl.textContent = "Start Quiz";
    contentEl.innerHTML = "";
    contentEl.appendChild(startBtnEl);
    startBtnEl.addEventListener("click", function () {
        renderNextQuestion();
        // start the timer
        var timer = setInterval(function () {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                renderEndPage();
            }
        }, 1000);
    });
}

function renderNextQuestion() {
    startBtnEl.style.display = "none";
    contentEl.textContent = "";
    currentQuestion = questions[indexOfCurrentQuestion];
    console.log(currentQuestion);
    headerEl.textContent = currentQuestion.title;
    var resultEl = document.createElement("div");
    resultEl.classList.add("result");
    contentEl.appendChild(resultEl);
    console.log(currentQuestion.choices);
    // create an ordered list element
    var choicesOlEl = document.createElement("ol");
    contentEl.appendChild(choicesOlEl);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        // create a list item element for each choice
        var choiceLiEl = document.createElement("li");
        choicesOlEl.appendChild(choiceLiEl);
        var buttonEl = document.createElement("button");

        buttonEl.textContent = currentQuestion.choices[i];
        choiceLiEl.appendChild(buttonEl);
        buttonEl.addEventListener("click", function (event) {
            var userChoice = event.target.textContent;
            if (userChoice === currentQuestion.answer) {
                resultEl.textContent = "Correct!";
                currentScore += 1;
            } else {
                resultEl.textContent = "Wrong!";
                timeLeft -= 10;
            }
            if (indexOfCurrentQuestion === questions.length) {
                clearInterval(timer);
                renderEndPage();
            } else {
                indexOfCurrentQuestion++;
                renderEndPage();
            }
        });
    }
}

function renderEndPage() {
    contentEl.textContent = "";
    headerEl.textContent = "";
    var doneHeaderEl = document.createElement("h1");
    doneHeaderEl.textContent = "ALL DONE!";
    contentEl.appendChild(doneHeaderEl);
    var scoreEl = document.createElement("p");
    scoreEl.textContent = "Your final score is " + currentScore;
    contentEl.appendChild(scoreEl);
    var initialsFormEl = document.createElement("form");
    contentEl.appendChild(initialsFormEl);
    var initialsLabelEl = document.createElement("label");
    initialsLabelEl.textContent = "Enter your initials: ";
    initialsFormEl.appendChild(initialsLabelEl);
    var initialsInputEl = document.createElement("input");
    initialsInputEl.type = "text";
    initialsInputEl.name = "initials";
    initialsFormEl.appendChild(initialsInputEl);
    var submitBtnEl = document.createElement("button");
    submitBtnEl.type = "submit";
    submitBtnEl.textContent = "Submit";
    initialsFormEl.appendChild(submitBtnEl);
    initialsFormEl.addEventListener("submit", function (event) {
        event.preventDefault();
        var initials = initialsInputEl.value;
        var score = currentScore;
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        highscores.push({ initials: initials, score: score });
        localStorage.setItem("highscores", JSON.stringify(highscores));
        renderHighscoresPage();
    });
}

function renderHighscoresPage() {
    contentEl.textContent = "";
    headerEl.textContent = "";

    // Create the "Highscores" header
    var highscoresHeaderEl = document.createElement("h1");
    highscoresHeaderEl.textContent = "Highscores";
    contentEl.appendChild(highscoresHeaderEl);

    // Create the list of highscores
    var highscoresListEl = document.createElement("ol");
    contentEl.appendChild(highscoresListEl);

    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    for (var i = 0; i < highscores.length; i++) {
        var highscoreItemEl = document.createElement("li");
        highscoreItemEl.textContent = highscores[i].initials + " - " + highscores[i].score;
        highscoresListEl.appendChild(highscoreItemEl);
    }

    // Create the form to clear highscores
    var clearFormEl = document.createElement("form");
    contentEl.appendChild(clearFormEl);

    var clearBtnEl = document.createElement("button");
    clearBtnEl.type = "button";
    clearBtnEl.textContent = "Clear Highscores";
    clearFormEl.appendChild(clearBtnEl);

    // Add an event listener to the clear highscores button
    clearBtnEl.addEventListener("click", function () {
        localStorage.removeItem("highscores");
        highscoresListEl.textContent = "";
    });

    // Create the "Go Back" button
    var goBackBtnEl = document.createElement("button");
    goBackBtnEl.textContent = "Go Back";
    contentEl.appendChild(goBackBtnEl);

    // Add an event listener to the "Go Back" button to restart the quiz
    goBackBtnEl.addEventListener("click", function () {
        renderStartQuizPage();
    });
}
//renderQuizPage to be fixed 
// function renderStartQuizPage() {
//     contentEl.innerHTML = ;
//     startBtnEl.addEventListener("click", function () {
//         currentScore = 0;
//         timeLeft = 60;
//         indexOfCurrentQuestion = 0;
//         renderNextQuestion();
//     });
// }
startBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    renderNextQuestion();

    timer = setInterval(function () {
        console.log("Timer started!");
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft === 0 || indexOfCurrentQuestion === questions.length) {
            clearInterval(timer);
            renderEndPage();
        }
    }, 1000);
});
contentEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        var selectedAnswer = event.target.textContent;
        var currentQuestion = questions[indexOfCurrentQuestion];

        if (selectedAnswer === currentQuestion.answer) {
            // increase the current score
            currentScore += 1;
            // TODO: Implement logic for correct answer
            // Add a message to indicate that the answer was correct
            var messageEl = document.createElement("p");
            messageEl.textContent = "Correct!";
            contentEl.appendChild(messageEl);

        } else {
            timeLeft -= 10;
            timeLeftEl.textContent = timeLeft;

            // TODO: Implement logic for incorrect answer
            // Add a message to indicate that the answer was incorrect
            var messageEl = document.createElement("p");
            messageEl.textContent = "Incorrect!";
            contentEl.appendChild(messageEl);
            // Remove the message after a short delay
            setTimeout(function () {
                contentEl.removeChild(messageEl);
            }, 1000);
        }

        // Increase the index of current question
        indexOfCurrentQuestion++;
        // Render the next question
        renderNextQuestion();
    }
});