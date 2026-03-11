const container = document.querySelector(".container");

const cloneContainer = container.cloneNode(true);
cloneContainer.id = "dark-container";
document.body.appendChild(cloneContainer);
cloneContainer.classList.remove("active");

const darkContainer = document.querySelector("#dark-container");
const darkContainerImg = darkContainer.querySelector(".home-img img");

darkContainerImg.src = "Assets/headshotbw.png";

document.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest(".toggle-icon");
  if (!toggleBtn || toggleBtn.classList.contains("disabled")) return;

  const allToggles = document.querySelectorAll(".toggle-icon");
  const allIcons = document.querySelectorAll(".toggle-icon i");
  const isDarkMode = !container.classList.contains("active");

  // Disable all toggle buttons during transition to prevent race conditions
  allToggles.forEach((btn) => {
    btn.classList.add("disabled");
    btn.disabled = true;
  });

  setTimeout(() => {
    allToggles.forEach((btn) => {
      btn.classList.remove("disabled");
      btn.disabled = false;
      // Update ARIA labels after transition
      btn.setAttribute(
        "aria-label",
        isDarkMode ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }, 1000);

  // Toggle icons for both containers
  allIcons.forEach((icon) => {
    icon.classList.toggle("bx-sun");
  });

  // Trigger clip-path transition
  container.classList.toggle("active");
  darkContainer.classList.toggle("active");
});
