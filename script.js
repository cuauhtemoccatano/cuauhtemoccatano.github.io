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

function setButtonsDisabled(disabled) {
  toggleIcons.forEach((btn) => {
    if (disabled) {
      btn.classList.add("disabled");
      btn.disabled = true;
    } else {
      btn.classList.remove("disabled");
      btn.disabled = false;
    }
  });
}

toggleIcons.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setButtonsDisabled(true);

    setTimeout(() => {
      setButtonsDisabled(false);
    }, 1500);

    icons.forEach((icon) => {
      icon.classList.toggle("bx-sun");
    });

    const isDarkMode = container.classList.contains("active");
    const nextText = isDarkMode ? "Toggle dark mode" : "Toggle light mode";

    toggleIcons.forEach((btn) => {
      btn.setAttribute("aria-label", nextText);
      btn.setAttribute("title", nextText);
    });

    container.classList.toggle("active");
    darkContainer.classList.toggle("active");
  });
});
