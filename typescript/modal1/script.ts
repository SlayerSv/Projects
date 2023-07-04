const modalEl = document.querySelector(".modal");
const showModalBtns = document.querySelectorAll(".show-modal");
const closeModalBtn = document.querySelector(".close-modal");
const overlayEl = document.querySelector(".overlay");

showModalBtns.forEach(btn => btn.addEventListener("click", showModal));
closeModalBtn?.addEventListener("click", closeModal)
overlayEl?.addEventListener("click", closeModal);
document.addEventListener("keydown", closeModal);
console.log(modalEl?.classList);


function showModal() {
  modalEl?.classList.remove("hidden");
  overlayEl?.classList.remove("hidden");
}

function closeModal() {
  modalEl?.classList.add("hidden");
  overlayEl?.classList.add("hidden");
}