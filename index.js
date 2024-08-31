var pattern = [];
var userPattern = [];
var index = 0;
var level = 1;

var buttonDiv = $(".buttons");
buttonDiv.animate({opacity:1});

var buttons = $("button");
buttons.attr("disabled", "disabled");
buttons.click(function() {
    // User clicks
    var colorChoice = $(this).attr("id");
    userPattern.push(colorChoice);
    if (userPattern[index] != pattern[index]) {
        alert("you lose");
        index = 0;
        title.text("Press Space To Play Again");
    }
    else {
        index++
    }
    if (index == pattern.length) {
        updateLevel();
        nextSequence();
        index = 0;
        userPattern = [];
    }

})

var title = $(".title");

var buttonColors = ["red", "yellow", "orange", "purple"];
var redBtn = $("button.red");
var yellowBtn = $("button.yellow");
var orangeBtn = $("button.orange");
var purpleBtn = $("button.purple");

document.addEventListener("keypress", function(event) {
    restartGame(event.key);
})

function restartGame(key) {
    if (key == " ") {
        // Game Start
        index = 0;
        pattern = [];
        userPattern = [];
        level = 1;
        title.text("Level " + level);
        nextSequence();
        console.log(pattern);
        // Enable Buttons
        buttons.removeAttr("disabled");
    }
}

function randomColor() {
    return buttonColors[randomNumber()];
}

function randomNumber() {
    var n = Math.floor(Math.random() * 4);
    return n;
}

function nextSequence() {
    addColor();
    traversePattern();
}

function addColor() {
    pattern.push(randomColor());
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function traversePattern() {
    for (var i = 0; i < pattern.length; i++) {
        await sleep(700);
        $("." + pattern[i]).fadeOut(100).fadeIn(100)
        playSound(pattern[i]);
    }
}

function playSound(color) {
    switch(color) {
        case "purple":

            break;
        case "yellow":

            break;
        case "orange":

            break;
        case "red":

            break;
    }
}

function updateLevel() {
    level++;
    title.fadeOut();
    title.text(`Level ${level}`);
    title.fadeIn();
}
