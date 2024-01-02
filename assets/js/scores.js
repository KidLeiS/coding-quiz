//Set DOMS variables (web APIs)
var highscoresEl = document.getElementById("highscores");
var clearButton = document.getElementById("clear");

//Creating a function for rendering of highscores
var renderHS = function() {
    if (JSON.parse(localStorage.getItem("highscores")) != null) {
        var highscores = JSON.parse(localStorage.getItem("highscores"));
    
        //Display highscores
        for (var i = 0; i < highscores.length; i++) {
            var entry = document.createElement("li");
    
            var initials = highscores[i].initials
            var score = highscores[i].score
            entry.textContent = initials.concat(" - ").concat(score.toString());
            highscoresEl.appendChild(entry);
    
            // console.log(highscores[i].initials);
        };
    };
};

//Function for the clearing of highscores
var clearHS = function() {
    var i = document.querySelectorAll("li").length;
    for (var i = document.querySelectorAll("li").length; i > 0; i--){
        highscoresEl.removeChild(document.querySelector("li"));
    };
}

//Initialisation function
var init = function() {
    renderHS();
}

//Event listener for the clicking of the clear highscores button
clearButton.addEventListener("click", function(){
    localStorage.removeItem("highscores");
    clearHS();
});

//Initialisation command
init();

