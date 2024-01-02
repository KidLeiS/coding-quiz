//Setting variables in the DOMS
var endScreen = document.getElementById("end-screen");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials");

//Setting logic variables
var highscores = [];

//A function to send highscores array to local storage
var sendToLocal = function() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
};

//Initialisation function which fetches local storage to highscores
function init() {
    if (JSON.parse(localStorage.getItem("highscores")) != null) {
        highscores = JSON.parse(localStorage.getItem("highscores"));
    };
};

//Event listener for the submission of results and appending into highscores
submitButton.addEventListener("click",function(event){
    event.preventDefault();

    var s = sessionStorage.getItem("score");
    var i = initialsEl.value;

    var submission = {
        initials:i,
        score:s,
    }

    highscores.push(submission);
    sendToLocal();

    
    initialsEl.value = "";
    window.location.href = "./highscores.html";
});

//Initialisation command
init();


//Debugging Zone
//console.log(highscores);