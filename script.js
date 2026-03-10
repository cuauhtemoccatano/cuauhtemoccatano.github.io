const container = document.querySelector(".container");

const cloneContainer = container.cloneNode(true);
cloneContainer.id = "dark-container";
document.body.appendChild(cloneContainer);
cloneContainer.classList.remove("active");

const darkContainer = document.querySelector("#dark-container");
const darkContainerImg = document.querySelector(
  "#dark-container .home-img img"
);

darkContainerImg.src = "Assets/headshotbw.png";

document.addEventListener("click", (event) => {
  const toggleBtn = event.target.closest(".toggle-icon");
  if (!toggleBtn) return;

  const toggleButtons = document.querySelectorAll(".toggle-icon");
  const icons = document.querySelectorAll(".toggle-icon i");

  // Disable all toggle buttons during transition to prevent race conditions
  toggleButtons.forEach((btn) => {
    btn.classList.add("disabled");
    btn.disabled = true;
  });

  setTimeout(() => {
    toggleButtons.forEach((btn) => {
      btn.classList.remove("disabled");
      btn.disabled = false;
    });
  }, 1000);

  const isDarkMode = darkContainer.classList.contains("active");

  icons.forEach((icon) => {
    if (isDarkMode) {
      icon.classList.replace("bx-sun", "bx-moon");
    } else {
      icon.classList.replace("bx-moon", "bx-sun");
    }
  });

  toggleButtons.forEach((btn) => {
    btn.setAttribute(
      "aria-label",
      isDarkMode ? "Switch to dark mode" : "Switch to light mode"
    );
  });

  container.classList.toggle("active");
  darkContainer.classList.toggle("active");
});
