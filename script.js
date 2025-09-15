const container = document.querySelector(".container");
const cloneContainer = container.cloneNode(true);
cloneContainer.id = "dark-container";
document.body.appendChild(cloneContainer);

// Initialize the dark container state
cloneContainer.classList.remove("active");

const toggleIcons = document.querySelectorAll(".toggle-icon");
const icons = document.querySelectorAll(".toggle-icon i");
const darkContainer = document.querySelector("#dark-container");
const darkContainerImg = document.querySelector(
  "#dark-container .home-img img",
);

// Set dark mode image
darkContainerImg.src = "Assets/headshotbw.png";

// Improved toggle handler
toggleIcons.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // Prevent multiple clicks during transition
    if (toggle.classList.contains("disabled")) return;

    // Disable toggle during transition
    toggleIcons.forEach((t) => t.classList.add("disabled"));

    // Toggle icons
    icons.forEach((icon) => {
      icon.classList.toggle("bx-sun");
    });

    // Toggle containers
    container.classList.toggle("active");
    darkContainer.classList.toggle("active");

    // Re-enable toggle after transition completes
    setTimeout(() => {
      toggleIcons.forEach((t) => t.classList.remove("disabled"));
    }, 1500);
  });
});
