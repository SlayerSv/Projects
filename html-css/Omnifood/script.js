menuButton = document.querySelector(".menu-btn");
closeButton = document.querySelector(".close-btn");
navBar = document.querySelector(".nav-bar");
links = document.querySelectorAll(".nav-link");
links.forEach(link => {
  link.addEventListener("click", () => {
    navBar.classList.remove("open");
  })
});

menuButton.addEventListener("click", () => {
  navBar.classList.add("open");
})

closeButton.addEventListener("click", () => {
  navBar.classList.remove("open");
})