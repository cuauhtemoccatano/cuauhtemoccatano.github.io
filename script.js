const container = document.querySelector(".container");

const cloneContainer = container.cloneNode(true);
cloneContainer.id = "dark-container";
document.body.appendChild(cloneContainer);
cloneContainer.classList.remove("active");

const darkContainer = document.querySelector("#dark-container");
const darkContainerImg = darkContainer.querySelector(".home-img img");

if (darkContainerImg) {
  darkContainerImg.src = "Assets/headshotbw.png";
}

let isTransitioning = false;

document.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest(".toggle-icon");
  if (!toggleBtn || isTransitioning) return;

  isTransitioning = true;

  const allToggles = document.querySelectorAll(".toggle-icon");
  const allIcons = document.querySelectorAll(".toggle-icon i");
  const isDarkMode = container.classList.contains("active");

  // Disable buttons
  allToggles.forEach((btn) => {
    btn.classList.add("disabled");
    btn.disabled = true;
  });

  // Toggle icons and ARIA labels
  allIcons.forEach((icon) => {
    icon.classList.toggle("bx-sun");
    icon.classList.toggle("bx-moon");
  });

  allToggles.forEach((btn) => {
    btn.setAttribute(
      "aria-label",
      isDarkMode ? "Switch to dark mode" : "Switch to light mode"
    );
  });

  // Trigger transition
  container.classList.toggle("active");
  darkContainer.classList.toggle("active");

  // Lockout timer matching the CSS transition (1.5s in style.css, but we use a bit less for responsiveness or match it)
  // style.css has .active#container transition: 1.5s
  setTimeout(() => {
    allToggles.forEach((btn) => {
      btn.classList.remove("disabled");
      btn.disabled = false;
    });
    isTransitioning = false;
  }, 1000); // 1s lockout is usually enough for UX feedback
});
