var pattern = [];
var userPattern = [];
var index = 0;
var level = 1;
var praiseWords = ["Good Job!", "Amazing!", "Insane!!", "Crazy!", "WWWWWWW", "Impressive!!", "U make it look EZ", "On a roll!!", "Epic moves!"];
var praiseEmojis = ["😻", '😼', "😈", "😍", "⭐️", "🍄", "🙀", "🤯", "😵", "🫠", "🙌", "👏", "🤙", "🙊"];

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

var endGameText = $(".end-game-text");

document.addEventListener("keypress", function(event) {
    restartGame(event.key);
})

async function restartGame(key) {
    if (key == "s") {
        // Game Start
        playSound("new game");
        title.text("New Game!");
        endGameText.removeClass("hidden");
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
    else if (key == "a") {
        endGameText.addClass("hidden");
        location.reload();
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
    disableButtons();
    buttons.addClass("not-user-turn");
    for (var i = 0; i < pattern.length; i++) {
        await sleep(700);
        $("." + pattern[i]).fadeOut(100).fadeIn(100)
        playSound(pattern[i]);
    }
    await sleep(1000);
    playSound("sequence end");
    enableButtons();
    buttons.removeClass("not-user-turn");
}

function playSound(type) {
    var fileLoc = "sounds/";
    var volume=1;
    // get file location
    switch(type) {
        case "purple":
            fileLoc += "Boop.mp3";
            break;
        case "yellow":
            fileLoc += "Beep.mp3";
            break;
        case "orange":
            fileLoc += "Bap.mp3";
            break;
        case "red":
            fileLoc += "Skibidi.mp3";
            break;
        case "win":
            fileLoc += "win-sound.mp3";
            volume = 0.3;
            break;
        case "lose":
            fileLoc += "lose-sound.mp3";
            volume = 0.3;
            break;
        case "new game":
            fileLoc += "new-game-sound.mp3";
            volume = 0.3;
            break;
        case "special win":
            fileLoc += "special-win.mp3";
            volume = 0.3;
            break;
        case "sequence end":
            fileLoc += "sequence-end.mp3";
            volume = 0.3;
            break;
    }
    // play audio
    var audio = new Audio(fileLoc);
    audio.volume = volume;
    audio.play();
}

function updateLevel() {
    level++;
    title.fadeOut();
    title.text(`Level ${level}`);
    title.fadeIn();
}

async function userWin() {
    if ((level + 1) % 3 == 0) {
        specialWin();
    }
    else {
        normalWin();
    }
    await sleep(1000);
    nextSequence();
    index = 0;
    userPattern = [];
}

async function userLose() {
    disableButtons();
    title.text("You Lost! 🙀 Better luck next time...")
    playSound("lose");
    await sleep(2500);
    title.text("Press S To Play Again");
}

function disableButtons() {
    buttons.attr("disabled", "disabled");
}

function enableButtons() {
    buttons.removeAttr("disabled");
}

async function specialWin() {
    playSound("special win");
    level++;
    randomEmoji = randomChoice(praiseEmojis);
    randomPraise = randomChoice(praiseWords);
    var text = `${randomEmoji} ${randomPraise} ${randomEmoji} (lvl. ${level})`;
    title.text(text);
    title.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function normalWin() {
    playSound("win");
    updateLevel();
}

function randomChoice(arr) {
    var len = arr.length;
    var random = Math.floor(Math.random() * len);
    return arr[random];
}
