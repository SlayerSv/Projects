"use strict";
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");
const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");
const current1ScoreEl = document.querySelector("#current--0");
const current2ScoreEl = document.querySelector("#current--1");
const playerEls = document.querySelectorAll(".player");
rollDiceBtn === null || rollDiceBtn === void 0 ? void 0 : rollDiceBtn.addEventListener("click", rollDice);
holdBtn === null || holdBtn === void 0 ? void 0 : holdBtn.addEventListener("click", changePlayer);
newGameBtn === null || newGameBtn === void 0 ? void 0 : newGameBtn.addEventListener("click", reset);
let scores;
let currentScore;
let dice;
let currentPlayer;
const currentScoreEls = [current1ScoreEl, current2ScoreEl];
const scoreEls = [score1El, score2El];
reset();
function rollDice() {
    dice = Math.ceil(Math.random() * 6);
    if (diceImg) {
        diceImg.src = `dice-${dice}.png`;
        diceImg.classList.remove("hidden");
    }
    if (dice !== 1) {
        currentScore += dice;
        currentScoreEls[currentPlayer].textContent = currentScore.toString();
    }
    else {
        currentScore = 0;
        changePlayer();
    }
    currentScoreEls[currentPlayer].textContent = currentScore.toString();
}
function reset() {
    currentPlayer = 0;
    scores = [0, 0];
    currentScore = 0;
    if (score1El)
        score1El.textContent = scores[0].toString();
    if (score2El)
        score2El.textContent = scores[1].toString();
    if (diceImg)
        diceImg.classList.add("hidden");
    currentScoreEls[0].textContent = currentScore.toString();
    currentScoreEls[1].textContent = currentScore.toString();
    rollDiceBtn.disabled = false;
    holdBtn.disabled = false;
    playerEls[currentPlayer].classList.add("player--active");
    playerEls[0].classList.remove("player--winner");
    playerEls[1].classList.remove("player--winner");
}
function changePlayer() {
    scores[currentPlayer] += currentScore;
    scoreEls[currentPlayer].textContent = scores[currentPlayer].toString();
    currentScore = 0;
    currentScoreEls[currentPlayer].textContent = currentScore.toString();
    if (scores[currentPlayer] >= 100) {
        playerEls[currentPlayer].classList.add("player--winner");
        playerEls[currentPlayer].classList.remove("player--active");
        rollDiceBtn.disabled = true;
        holdBtn.disabled = true;
        diceImg.classList.add("hidden");
        return;
    }
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    playerEls.forEach(playerEl => playerEl.classList.toggle("player--active"));
}
