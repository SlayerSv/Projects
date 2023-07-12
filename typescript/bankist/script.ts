const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const navLinks = document.querySelector(".nav__links");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

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


// ----Adding cookie message to the html programatically.
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


// Navigation.
navLinks?.addEventListener("click", function(e: Event) {
  const target: HTMLElement | null = e.target as HTMLElement;

  if (target.classList.contains("nav__link")) {
    e.preventDefault();
    const sectionID = target.getAttribute("href");
    if (sectionID) {
      document.querySelector(sectionID)?.scrollIntoView({behavior: "smooth"});
    }
  }
});


// Tabs switch.
tabsContainer?.addEventListener("click", (e: Event) => {
  const target: HTMLElement | null = e.target as HTMLElement;
  const tab: HTMLElement | null = target?.closest(".operations__tab");
  if (!tab) return;

  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(tab => tab.classList.remove("operations__content--active"));

  tab.classList.add("operations__tab--active");

  const tabNumber = tab.dataset.tab;
  const tabContent = document.querySelector(`.operations__content--${tabNumber}`);
  tabContent?.classList.add("operations__content--active");
});


// Nav links fade when hover.
nav?.addEventListener("mouseover", (e) => changeOpacityOnHover(e, 0.5));
nav?.addEventListener("mouseout", (e) => changeOpacityOnHover(e, 1));

function changeOpacityOnHover(e: Event, opacity: number | string) {
  const target = e.target as HTMLElement;
  if (target.classList.contains("nav__link")) {
    const nav = target.closest(".nav");
    const navLinks: NodeListOf<HTMLElement> | undefined = nav?.querySelectorAll(".nav__link");
    
    navLinks?.forEach(link => {
      if (target !== link) {
        link.style.opacity = opacity.toString();
      }
    })
  }
}