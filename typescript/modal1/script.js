"use strict";
const modalEl = document.querySelector(".modal");
const showModalBtns = document.querySelectorAll(".show-modal");
const closeModalBtn = document.querySelector(".close-modal");
const overlayEl = document.querySelector(".overlay");
showModalBtns.forEach(btn => btn.addEventListener("click", showModal));
closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener("click", closeModal);
overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.addEventListener("click", closeModal);
document.addEventListener("keydown", closeModal);
console.log(modalEl === null || modalEl === void 0 ? void 0 : modalEl.classList);
function showModal() {
    modalEl === null || modalEl === void 0 ? void 0 : modalEl.classList.remove("hidden");
    overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.classList.remove("hidden");
}
function closeModal() {
    modalEl === null || modalEl === void 0 ? void 0 : modalEl.classList.add("hidden");
    overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.classList.add("hidden");
}
