var endScreen = document.getElementById("end-screen");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials");

var highscores = [];

var sendToLocal = function() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
};

function init() {
    if (JSON.parse(localStorage.getItem("highscores")) != null) {
        highscores = JSON.parse(localStorage.getItem("highscores"));
    };
};

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

init();


//Debugging Zone
//console.log(highscores);