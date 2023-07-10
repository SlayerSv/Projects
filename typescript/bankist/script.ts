const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");

const openModal = function (e: Event) {
  e.preventDefault;
  modal?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
};

const closeModal = function () {
  modal?.classList.add("hidden");
  overlay?.classList.add("hidden");
};

btnsOpenModal.forEach(button => button.addEventListener("click", openModal));
btnCloseModal?.addEventListener("click", closeModal);
overlay?.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal?.classList.contains("hidden")) {
    closeModal();
  }
});

const cookieMessage = document.createElement("div");
cookieMessage.classList.add("cookie-message");

const cookieText = document.createElement("p");
cookieText.textContent = "We use cookies for improved functionality and analytics";
cookieMessage.appendChild(cookieText);

const cookieButton = document.createElement("button");
cookieButton.classList.add("btn", "btn--close-cookies");
cookieButton.textContent = "Got it!";
cookieMessage.appendChild(cookieButton);
cookieButton.addEventListener("click", () => cookieMessage.remove());

header?.appendChild(cookieMessage);