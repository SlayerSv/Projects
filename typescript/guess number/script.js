"use strict";
const bodyEl = document.querySelector("body");
const numberEl = document.querySelector(".number");
const messageEl = document.querySelector(".message");
const guessEl = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
const scoreEl = document.querySelector(".score");
const highestScoreEl = document.querySelector(".highscore");
checkBtn === null || checkBtn === void 0 ? void 0 : checkBtn.addEventListener("click", checkAnswer);
againBtn === null || againBtn === void 0 ? void 0 : againBtn.addEventListener("click", reset);
let number;
let guess;
let message;
let score;
let highestScore = 0;
reset();
function checkAnswer() {
    if (guessEl)
        if (guessEl.value === "") {
            message = "No number!";
            updateMessage(message);
            return;
        }
    guess = Number(guessEl === null || guessEl === void 0 ? void 0 : guessEl.value);
    if (guess !== number) {
        message = guess < number ? "Too Low!" : "Too high!";
        updateMessage(message);
        score = updateScore(score - 1);
    }
    else {
        message = ("Correct!");
        updateMessage(message);
        document.querySelector("body").style.backgroundColor = "green";
        if (numberEl)
            numberEl.textContent = number.toString();
        if (score > highestScore) {
            highestScore = score;
            if (highestScoreEl)
                highestScoreEl.textContent = highestScore.toString();
        }
    }
}
function reset() {
    message = "Start guessing...";
    updateMessage(message);
    number = getRandomNumber();
    score = updateScore(20);
    bodyEl.style.backgroundColor = "#222";
    if (numberEl)
        numberEl.textContent = "?";
    if (guessEl)
        guessEl.value = "";
    checkBtn.disabled = false;
    guessEl.disabled = false;
}
function getRandomNumber() {
    return Math.ceil(Math.random() * 20);
}
function updateScore(newScore) {
    if (newScore === 0) {
        bodyEl.style.backgroundColor = "red";
        checkBtn.disabled = true;
        guessEl.disabled = true;
        message = "You have lost!";
        updateMessage(message);
        guessEl.value = "";
    }
    if (scoreEl)
        scoreEl.textContent = newScore.toString();
    return newScore;
}
function updateMessage(newMessage) {
    if (messageEl)
        messageEl.textContent = newMessage;
}
