const container = document.querySelector(".container");

const cloneContainer = container.cloneNode(true);
cloneContainer.id = "dark-container";
document.body.appendChild(cloneContainer);
cloneContainer.classList.remove("active");

const toggleIcons = document.querySelectorAll(".toggle-icon");
const icons = document.querySelectorAll(".toggle-icon i");
const darkContainer = document.querySelector("#dark-container");
const darkContainerImg = document.querySelector(
  "#dark-container .home-img img"
);

darkContainerImg.src = "Assets/headshotbw.png";

toggleIcons.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // Disable all toggle buttons during transition to prevent race conditions
    toggleIcons.forEach((btn) => {
      btn.classList.add("disabled");
      if (btn.tagName === "BUTTON") {
        btn.disabled = true;
      }
    });

    setTimeout(() => {
      toggleIcons.forEach((btn) => {
        btn.classList.remove("disabled");
        if (btn.tagName === "BUTTON") {
          btn.disabled = false;
        }
      });
    }, 1500);

    icons.forEach((icon) => {
      icon.classList.toggle("bx-sun");
    });

    const isDarkMode = !container.classList.contains("active");
    toggleIcons.forEach((btn) => {
      const label = isDarkMode ? "Toggle light mode" : "Toggle dark mode";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });

    container.classList.toggle("active");
    darkContainer.classList.toggle("active");
  });
});
