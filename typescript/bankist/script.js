"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const openModal = function (e) {
    e.preventDefault;
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("hidden");
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.add("hidden");
};
btnsOpenModal.forEach(button => button.addEventListener("click", openModal));
btnCloseModal === null || btnCloseModal === void 0 ? void 0 : btnCloseModal.addEventListener("click", closeModal);
overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !(modal === null || modal === void 0 ? void 0 : modal.classList.contains("hidden"))) {
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
header === null || header === void 0 ? void 0 : header.appendChild(cookieMessage);
