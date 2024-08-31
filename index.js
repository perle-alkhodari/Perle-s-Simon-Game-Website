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
        userLose();
    }
    else {
        playSound(colorChoice);
        index++
    }
    if (index == pattern.length) {
        userWin();
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

async function restartGame(key) {
    if (key == "s") {
        // Game Start
        playSound("new game");
        title.text("New Game!");
        await sleep(2000);
        index = 0;
        pattern = [];
        userPattern = [];
        level = 1;
        title.text("Level " + level);
        nextSequence();
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

function playSound(type) {
    var fileLoc = "sounds/";
    // get file location
    switch(type) {
        case "purple":
            fileLoc += "purple.mp3";
            break;
        case "yellow":
            fileLoc += "yellow.mp3";
            break;
        case "orange":

            break;
        case "red":

            break;
        case "win":
            fileLoc += "win-sound.mp3";
            break;
        case "lose":
            fileLoc += "lose-sound.mp3";
            break;
        case "new game":
            fileLoc += "new-game-sound.mp3";
            break;
    }
    // play audio
    var audio = new Audio(fileLoc);
    audio.volume = 0.3;
    audio.play();
}

function updateLevel() {
    level++;
    title.fadeOut();
    title.text(`Level ${level}`);
    title.fadeIn();
}

function userWin() {
    playSound("win");
    updateLevel();
    nextSequence();
    index = 0;
    userPattern = [];
}

async function userLose() {
    title.text("You Lost! 🙀 Better luck next time...")
    playSound("lose");
    await sleep(2500);
    index = 0;
    title.text("Press S To Play Again");
}
