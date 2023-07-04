const bodyEl = document.querySelector("body");
const numberEl = document.querySelector(".number");
const messageEl = document.querySelector(".message");
const guessEl: HTMLInputElement | null = document.querySelector(".guess");
const checkBtn: HTMLButtonElement | null = document.querySelector(".check");
const againBtn: HTMLButtonElement | null = document.querySelector(".again");
const scoreEl = document.querySelector(".score");
const highestScoreEl = document.querySelector(".highscore");

checkBtn?.addEventListener("click", checkAnswer);
againBtn?.addEventListener("click", reset);

let number: number;
let guess: number;
let message: string;
let score: number;
let highestScore = 0;

reset();


function checkAnswer() {
  if (guessEl) if (guessEl.value === "") {
    message = "No number!";
    updateMessage(message);
    return;
  }
  guess = Number(guessEl?.value);

  if (guess !== number) {
    message = guess < number ? "Too Low!" : "Too high!";
    updateMessage(message);
    score = updateScore(score - 1);
  } else {
    message = ("Correct!");
    updateMessage(message);
    document.querySelector("body")!.style.backgroundColor = "green";
    if (numberEl) numberEl.textContent = number.toString();
    if (score > highestScore) {
      highestScore = score;
      if (highestScoreEl) highestScoreEl.textContent = highestScore.toString();
    }
  }
}

function reset() {
  message = "Start guessing...";
  updateMessage(message);
  number = getRandomNumber();
  score = updateScore(20);
  bodyEl!.style.backgroundColor = "#222";
  if (numberEl) numberEl.textContent = "?";
  if (guessEl) guessEl.value = "";
  checkBtn!.disabled = false;
  guessEl!.disabled = false;
}

function getRandomNumber() {
  return Math.ceil(Math.random() * 20);
}

function updateScore(newScore: number) {
  if (newScore === 0) {
    bodyEl!.style.backgroundColor = "red";
    checkBtn!.disabled = true;
    guessEl!.disabled = true;
    message = "You have lost!";
    updateMessage(message);
    guessEl!.value = "";
  }
  if (scoreEl) scoreEl.textContent = newScore.toString();
  return newScore;
}

function updateMessage(newMessage: string) {
  if (messageEl) messageEl.textContent = newMessage;
}