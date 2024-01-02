var highscoresEl = document.getElementById("highscores");
var clearButton = document.getElementById("clear");

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

var clearHS = function() {
    var i = document.querySelectorAll("li").length;
    for (var i = document.querySelectorAll("li").length; i > 0; i--){
        highscoresEl.removeChild(document.querySelector("li"));
    };
}

var init = function() {
    renderHS();
}


clearButton.addEventListener("click", function(){
    localStorage.removeItem("highscores");
    clearHS();
});

init();

