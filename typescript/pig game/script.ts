const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn:HTMLButtonElement | null = document.querySelector(".btn--roll");
const holdBtn:HTMLButtonElement | null = document.querySelector(".btn--hold");
const diceImg: HTMLImageElement | null = document.querySelector(".dice");
const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");
const current1ScoreEl = document.querySelector("#current--0");
const current2ScoreEl = document.querySelector("#current--1");
const playerEls = document.querySelectorAll(".player");


rollDiceBtn?.addEventListener("click", rollDice);
holdBtn?.addEventListener("click", changePlayer);
newGameBtn?.addEventListener("click", reset);

let scores: [number, number];
let currentScore: number;
let dice: number;
let currentPlayer: number;
const currentScoreEls = [current1ScoreEl, current2ScoreEl] as const;
const scoreEls = [score1El, score2El] as const;

reset();


function rollDice() {
  dice = Math.ceil(Math.random() * 6);
  if (diceImg) {
    diceImg.src = `dice-${dice}.png`;
    diceImg.classList.remove("hidden");
  }
  if (dice !== 1) {
    currentScore += dice;
    currentScoreEls[currentPlayer]!.textContent = currentScore.toString();
  } else {
    currentScore = 0;
    changePlayer();
  }
  currentScoreEls[currentPlayer]!.textContent = currentScore.toString();
}

function reset() {
  currentPlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  if (score1El) score1El.textContent = scores[0].toString();
  if (score2El) score2El.textContent = scores[1].toString();
  if (diceImg) diceImg.classList.add("hidden");
  currentScoreEls[0]!.textContent = currentScore.toString();
  currentScoreEls[1]!.textContent = currentScore.toString();
  rollDiceBtn!.disabled = false;
  holdBtn!.disabled = false;
  playerEls[currentPlayer]!.classList.add("player--active");
  playerEls[0]!.classList.remove("player--winner");
  playerEls[1]!.classList.remove("player--winner");
}

function changePlayer() {
  scores[currentPlayer] += currentScore;
  scoreEls[currentPlayer]!.textContent = scores[currentPlayer].toString();
  currentScore = 0;
  currentScoreEls[currentPlayer]!.textContent = currentScore.toString();
  if (scores[currentPlayer] >= 100) {
    playerEls[currentPlayer]!.classList.add("player--winner");
    playerEls[currentPlayer]!.classList.remove("player--active");
    rollDiceBtn!.disabled = true;
    holdBtn!.disabled = true;
    diceImg!.classList.add("hidden");
    return;
  }
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playerEls.forEach(playerEl => playerEl.classList.toggle("player--active"));
}