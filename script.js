// Main container handles the primary light/dark mode state
const container = document.querySelector(".container");

// Create a duplicate of the entire container for the transition effect
const cloneContainer = container.cloneNode(true);
cloneContainer.id = "dark-container";
document.body.appendChild(cloneContainer);

// Ensure the dark container starts inactive
cloneContainer.classList.remove("active");

// Select interactive elements from BOTH containers
const toggleIcons = document.querySelectorAll(".toggle-icon");
const icons = document.querySelectorAll(".toggle-icon i");
const darkContainer = document.querySelector("#dark-container");
const darkContainerImg = document.querySelector(
  "#dark-container .home-img img"
);

// High-contrast image for dark mode (Liquid Glass aesthetic)
if (darkContainerImg) {
    darkContainerImg.src = "Assets/headshotbw.png";
}

/**
 * Disables theme toggle buttons during the animation to prevent glitches.
 */
function setButtonsDisabled(disabled) {
  toggleIcons.forEach((btn) => {
    if (disabled) {
      btn.classList.add("disabled");
      btn.setAttribute("disabled", "true");
    } else {
      btn.classList.remove("disabled");
      btn.removeAttribute("disabled");
    }
  });
}

/**
 * Handle Theme Toggle Event
 */
toggleIcons.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // Prevent spam clicking while transition is running
    if (toggle.classList.contains("disabled")) return;

    setButtonsDisabled(true);

    // Toggle sun/moon icons in all buttons
    icons.forEach((icon) => {
      icon.classList.toggle("bx-sun");
    });

    // Determine next accessibility label
    const isNowDarkMode = !container.classList.contains("active");
    const label = isNowDarkMode ? "Toggle light mode" : "Toggle dark mode";

    toggleIcons.forEach((btn) => {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });

    // Trigger the CSS clip-path animation
    container.classList.toggle("active");
    darkContainer.classList.toggle("active");

    // Re-enable interactions after the 1.5s CSS transition ends
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 1500);
  });
});

/**
 * Liquid Cursor Logic (Optimized for 60fps responsiveness)
 */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const links = document.querySelectorAll("a, button, .toggle-icon, .social-media a, .btn");

let mouseX = 0, mouseY = 0;     // Target position
let cursorX = 0, cursorY = 0;   // Current main cursor position
let followerX = 0, followerY = 0; // Current follower position

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// High-performance animation loop
function updateCursor() {
  // Main cursor: instant follow (no lag)
  cursorX = mouseX;
  cursorY = mouseY;
  
  // Follower: Smooth lag (lerp) for liquid feel
  // Factor of 0.2 means it moves 20% of the distance each frame
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;

  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  follower.style.transform = `translate3d(${followerX - 15}px, ${followerY - 15}px, 0)`;

  requestAnimationFrame(updateCursor);
}

// Start the loop
updateCursor();

// Hover interactions
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    follower.classList.add("hover");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    follower.classList.remove("hover");
  });
});

// Hide/Show logic
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
  follower.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
  follower.style.opacity = "1";
});

/**
 * 3D Tilt Effect Logic
 */
const tiltCards = document.querySelectorAll(".skill-card, .project-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

/**
 * Interactive Terminal Logic
 */
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");

const commands = {
  help: "Available commands: help, whoami, skills, projects, clear, ls",
  whoami: "Cuauhtémoc Cataño: Full-Stack Developer, UX Designer, and Passionate Content Creator.",
  skills: "Java, Python, Flutter, JavaScript, React, SQL, Arduino, IoT.",
  projects: "Java Comprehensive, Python Solutions, IoT Smart Systems.",
  ls: "about.txt  skills.py  projects.java  contact.log",
  clear: ""
};

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const input = terminalInput.value.toLowerCase().trim();
      
      // Create a copy of the line with the static input
      const line = document.createElement("div");
      line.className = "terminal-line";
      line.innerHTML = `<span class="prompt">guest@portfolio:~$</span> <span>${input}</span>`;
      
      // Clear the current input line
      terminalInput.value = "";
      
      // Insert the previous command line before the actual input line
      terminalBody.insertBefore(line, terminalInput.parentElement);

      if (input === "clear") {
        const lines = terminalBody.querySelectorAll(".terminal-line, .terminal-output");
        lines.forEach(l => {
          if (!l.contains(terminalInput)) l.remove();
        });
        return;
      }

      const output = document.createElement("div");
      output.className = "terminal-output";
      output.innerText = commands[input] || `Command not found: ${input}. Type 'help' for options.`;
      
      terminalBody.insertBefore(output, terminalInput.parentElement);
      
      // Scroll to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}

/**
 * Multi-language Support Logic
 */
const langSwitches = document.querySelectorAll(".lang-switch");
let currentLang = "EN";const translations = {
  EN: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Engineering",
    podcasts: "Podcasts",
    contact: "Contact",
    hero_title: "Architecting Digital Transformation",
    hero_desc: "From lines of code to strategic business growth. I help founders and enterprises build robust software while maintaining the mindful vision of a leader.",
    trust_label_1: "Strategic Vision",
    trust_label_2: "Mindful Execution",
    trust_val_1: '"De Emprendedor a Empresario" Podcast',
    trust_val_2: '"Viviendo como un Yogui" Podcast',
    about_title: "About Me",
    skills_title: "Skills & Technologies",
    eng_title: "Engineering Excellence",
    podcasts_title: "Podcasts & Content",
    contact_title: "Ready to build the future?",
    contact_desc: "Whether you're scaling a vision or starting a journey, let's architect something remarkable together.",
    download_cv: "Download CV",
    terminal_welcome: "Welcome to Cuauhtémoc's interactive shell.",
    terminal_instruction: "Type 'help' to see available commands."
  },
  ES: {
    home: "Inicio",
    about: "Sobre Mí",
    skills: "Habilidades",
    projects: "Ingeniería",
    podcasts: "Podcasts",
    contact: "Contacto",
    hero_title: "Arquitectando la Transformación Digital",
    hero_desc: "De líneas de código al crecimiento estratégico. Ayudo a fundadores y empresas a construir software robusto manteniendo la visión consciente de un líder.",
    trust_label_1: "Visión Estratégica",
    trust_label_2: "Ejecución Consciente",
    trust_val_1: 'Podcast "De Emprendedor a Empresario"',
    trust_val_2: 'Podcast "Viviendo como un Yogui"',
    about_title: "Sobre Mí",
    skills_title: "Habilidades y Tecnologías",
    eng_title: "Excelencia en Ingeniería",
    podcasts_title: "Podcasts y Contenido",
    contact_title: "¿Listo para construir el futuro?",
    contact_desc: "Ya sea que estés escalando una visión o comenzando un viaje, construyamos algo increíble juntos.",
    download_cv: "Descargar CV",
    terminal_welcome: "Bienvenido a la terminal interactiva de Cuauhtémoc.",
    terminal_instruction: "Escribe 'help' para ver los comandos disponibles."
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  
  // Header Nav
  document.querySelectorAll(".navbar a").forEach((link, index) => {
    const keys = ["home", "about", "skills", "projects", "podcasts", "contact"];
    link.innerText = t[keys[index]];
  });

  // Hero
  const heroH1 = document.querySelector(".home-content h1");
  const heroP = document.querySelector(".home-content p");
  if (heroH1) heroH1.innerText = t.hero_title;
  if (heroP) heroP.innerText = t.hero_desc;
  
  document.querySelectorAll(".btn").forEach(btn => {
    if (btn.innerText.includes("CV") || btn.innerText.includes("Descargar")) {
      btn.innerText = t.download_cv;
    }
  });

  // Trust Bar
  const trustLabels = document.querySelectorAll(".trust-label");
  const trustValues = document.querySelectorAll(".trust-value");
  if (trustLabels[0]) trustLabels[0].innerText = t.trust_label_1;
  if (trustLabels[1]) trustLabels[1].innerText = t.trust_label_2;
  if (trustValues[0]) trustValues[0].innerText = t.trust_val_1;
  if (trustValues[1]) trustValues[1].innerText = t.trust_val_2;

  // Section Titles & Content
  const aboutTitle = document.querySelector("#about .section-title");
  const skillsTitle = document.querySelector("#skills .section-title");
  const engTitle = document.querySelector("#projects .section-title");
  const podTitle = document.querySelector("#podcasts .section-title");
  const contactTitle = document.querySelector("#contact .section-title");
  const contactDesc = document.querySelector(".contact-content p");

  if (aboutTitle) aboutTitle.innerText = t.about_title;
  if (skillsTitle) skillsTitle.innerText = t.skills_title;
  if (engTitle) engTitle.innerText = t.eng_title;
  if (podTitle) podTitle.innerText = t.podcasts_title;
  if (contactTitle) contactTitle.innerText = t.contact_title;
  if (contactDesc) contactDesc.innerText = t.contact_desc;

  // Terminal
  const welcomeMsg = document.querySelector(".welcome-msg");
  const instructionMsg = document.querySelector(".instruction-msg");
  if (welcomeMsg) welcomeMsg.innerText = t.terminal_welcome;
  if (instructionMsg) instructionMsg.innerText = t.terminal_instruction;

  // Update button text
  langSwitches.forEach(btn => btn.innerText = lang === "EN" ? "ES" : "EN");
}

langSwitches.forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "ES" : "EN";
    updateLanguage(currentLang);
  });
});
