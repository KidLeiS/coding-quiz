//Set DOMS variables (web APIs)

var startButton = document.querySelector("#start");
var startScreen = document.querySelector(".start");
var questionScreen = document.querySelector("#questions");
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var feedback = document.getElementById("feedback");
var feedbackText = document.getElementById("feedback-text")
var timeEl = document.getElementById("time");

//Set logic variables
var questionIndex = 0;
var score = 0;
var correctAnswer;
var timer = 0;

//Set question objects
var question1 = {
    question:"What type of variable would you use for an if condition?",
    answers:["number", "integer", "boolean", "null"],
    correctIndex:2,
};

var question2 = {
    question:"What does an event listener do?",
    answers:["Triggers a function upon an event", "Triggers an event upon a function", "Returns the program", "Sets local storage"],
    correctIndex:0,
};

var question3 = {
    question:"What is not a built in event?",
    answers:["click", "change", "keydown", "keyclick"],
    correctIndex:3,
};

var question4 = {
    question:"What function do you use to stop the default submit logic?",
    answers:["stopDefault", "preventDefault", "stopSubmit", "preventSubmit"],
    correctIndex:1,
};

var question5 = {
    question:"What is not a variable declaration command?",
    answers:["var", "create", "let", "const"],
    correctIndex:1,
};

//Bundled question objects into an array
var questions = [question1, question2, question3, question4, question5];

//Function for rendering questions
var renderQuestions = function() {
    var listEl = document.createElement("ol");
    var choice0 = document.createElement("li");
    var choice1 = document.createElement("li");
    var choice2 = document.createElement("li");
    var choice3 = document.createElement("li");

    questionTitle.textContent = questions[questionIndex].question;
    choice0.textContent = questions[questionIndex].answers[0];
    choice1.textContent = questions[questionIndex].answers[1];
    choice2.textContent = questions[questionIndex].answers[2];
    choice3.textContent = questions[questionIndex].answers[3];

    choice0.setAttribute("data-index", 0);
    choice1.setAttribute("data-index", 1);
    choice2.setAttribute("data-index", 2);
    choice3.setAttribute("data-index", 3);

    choice0.setAttribute("class", "button-style");
    choice1.setAttribute("class", "button-style");
    choice2.setAttribute("class", "button-style");
    choice3.setAttribute("class", "button-style");

    correctAnswer = questions[questionIndex].correctIndex;

    choices.appendChild(listEl);
    listEl.appendChild(choice0);
    listEl.appendChild(choice1);
    listEl.appendChild(choice2);
    listEl.appendChild(choice3);
}

//Function for clearing rendered questions
var clearQuestions = function() {
    listEl = choices.querySelector("ol");
    listEl.remove();
}

//Function for ending (submitting) the quiz
var endQuiz = function() {
    document.getElementById("final-score").textContent = score;
    sessionStorage.setItem("score", score);
    questionScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "active");
    timeEl.textContent = 0;
}

//Function for generating the next question
var nextQuestion = function() {
    clearQuestions();
    if (questionIndex<questions.length-1) {
        questionIndex++;
        renderQuestions();
    } else {
        endQuiz();
    };
}

// Timer function (not including 10s penalty on wrong questions)
var startTimer = function() {
    timer = 60;
    timeEl.textContent = timer;
    setInterval(function(){
        if (timer > 0 && endScreen.getAttribute("class") === "hide") {
            timer--;
            timeEl.textContent = timer;
            console.log(timer);
        } else {
            clearInterval();
            endQuiz();
        }
    },1000);

}

// Start quiz function
var startQuiz = function() {
    startScreen.setAttribute("class", "hide");
    questionScreen.setAttribute("class", "active");
    renderQuestions();
    startTimer();
}



// Start quiz event listener
startButton.addEventListener("click", startQuiz);


// Setting Timeout Handle variable for Feedback
var timeoutHandle = window.setTimeout(function(){
    feedback.setAttribute("class", "hide");
},2000);

// Feedback event listener
choices.addEventListener("click", function(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        if (event.target.dataset.index == correctAnswer){
            score++;
            feedbackText.textContent = "Correct!"; 
            feedbackText.style.color = "rgb(5,151,42)";  
        } else {
            feedbackText.textContent = "Wrong!";
            feedbackText.style.color = "rgb(255,0,0)";
            timer -= 10;
            timeEl.textContent = timer;
        };
        
        feedback.setAttribute("class", "active");
        
        window.clearTimeout(timeoutHandle);

        timeoutHandle = window.setTimeout(function(){
            feedback.setAttribute("class", "hide");
        },2000);

        nextQuestion();
    };
});

// console.log(questions);

// console.log(question1.question);