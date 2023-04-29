menuButton = document.querySelector(".menu-btn");
closeButton = document.querySelector(".close-btn");
navBar = document.querySelector(".nav-bar");

menuButton.addEventListener("click", () => {
  navBar.classList.add("open");
})

closeButton.addEventListener("click", () => {
  navBar.classList.remove("open");
})