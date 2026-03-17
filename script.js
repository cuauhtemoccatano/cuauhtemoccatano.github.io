/**
 * Theme Management Logic
 */
const savedTheme = localStorage.getItem("theme");
const homeImg = document.querySelector(".home-img img");
const toggleIcons = document.querySelectorAll(".toggle-icon");
const icons = document.querySelectorAll(".toggle-icon i");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (homeImg) homeImg.src = "Assets/headshotbw.png";
    icons.forEach((icon) => {
      icon.classList.add("bx-sun");
      icon.classList.remove("bx-moon");
    });
  } else {
    document.body.classList.remove("dark-mode");
    if (homeImg) homeImg.src = "Assets/headshot-color.png";
    icons.forEach((icon) => {
      icon.classList.remove("bx-sun");
      icon.classList.add("bx-moon");
    });
  }
}

// System Preference Selection
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// 1. Initial Load: LocalStorage > System Preference
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(prefersDark.matches ? "dark" : "light");
}

// 2. Real-time transition when system settings change (if no manual choice)
prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

toggleIcons.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("disabled")) return;

    setButtonsDisabled(true);

    const isDark = document.body.classList.contains("dark-mode");
    const nextTheme = !isDark ? "dark" : "light";
    
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    const nextText = nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    toggleIcons.forEach((btn) => {
      btn.setAttribute("aria-label", nextText);
      btn.setAttribute("title", nextText);
    });

    setTimeout(() => {
      setButtonsDisabled(false);
    }, 400); // Faster feedback now that we don't have heavy cloning
  });
});

/**
 * Safer Interaction Dispatcher (Prevent rapid clicking during transitions)
 */
function setButtonsDisabled(disabled) {
  const elements = document.querySelectorAll('.toggle-icon, .btn, .social-media a, .project-link');
  elements.forEach(el => {
    el.style.pointerEvents = disabled ? 'none' : 'auto';
  });
}

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
const blobs = document.querySelectorAll(".blob");
const blobData = [
  { x: 0, y: 0, targetX: 0, targetY: 0, inertia: 0.05 },
  { x: 0, y: 0, targetX: 0, targetY: 0, inertia: 0.03 },
  { x: 0, y: 0, targetX: 0, targetY: 0, inertia: 0.02 }
];

function updateCursor() {
  // Main cursor: instant follow (no lag)
  cursorX = mouseX;
  cursorY = mouseY;
  
  // Follower: Smooth lag (lerp) for liquid feel
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;

  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  follower.style.transform = `translate3d(${followerX - 15}px, ${followerY - 15}px, 0)`;

  // Dynamic Background Blobs: Deep inertia follow
  blobs.forEach((blob, i) => {
    const data = blobData[i];
    data.targetX = (mouseX - window.innerWidth / 2) * 0.1;
    data.targetY = (mouseY - window.innerHeight / 2) * 0.1;
    
    data.x += (data.targetX - data.x) * data.inertia;
    data.y += (data.targetY - data.y) * data.inertia;
    
    blob.style.transform = `translate3d(${data.x}px, ${data.y}px, 0)`;
  });

  requestAnimationFrame(updateCursor);
}

// Start the loop
updateCursor();

/**
 * Scroll Reveal Logic (Intersection Observer)
 */
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, revealOptions);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

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
  whoami: "Cuauhtémoc Cataño: Developer, Founder, and Podcast Host.",
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
      const res = commands[input] || `Command not found: ${input}. Type 'help' for options.`;
      output.innerText = (input === "whoami" && currentLang === "ES") ? translations.ES.t_whoami : res;
      
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
let currentLang = "EN";
const translations = {
  EN: {
    home: "Home", about: "About", skills: "Skills", projects: "Engineering", podcasts: "Podcasts", contact: "Contact",
    hero_title: "Crafting High-Performance Digital Presences",
    hero_desc: "You know your business needs to be online, but you don't have to know how. I architect holistic digital experiences that combine robust engineering with strategic marketing and elite branding.",
    trust_label_1: "Brand Strategy", trust_label_2: "Technical Excellence",
    trust_val_1: "Holistic Digital Presence", trust_val_2: "Robust & Scalable Solutions",
    about_title: "The Visionary Behind the Code",
    about_p1: "I'm more than a developer; I'm a strategic partner for business owners. With a deep background in marketing, branding, and communication, I don't just build websites—I create digital voices that resonate and convert.",
    about_p2: "As the founder of Pilea and host of two business-focused podcasts, I understand that technology must serve a purpose: visibility, authority, and growth. I provide 'a la carte' digital solutions tailored to your unique business journey.",
    skills_title: "The Strategic Toolkit",
    s_java: "Enterprise-grade architecture. Building the robust, reliable backbone for complex business systems.",
    s_python: "Data-driven automation and smart backend solutions that streamline business operations.",
    eng_title: "Digital Engineering A La Carte",
    services_title: "Digital Services A La Carte",
    suite_ads_title: "Omnichannel Advertising",
    s_ads_meta: "Meta Ads (FB & IG)",
    s_ads_google: "Google & YouTube Ads",
    s_ads_pro: "LinkedIn, Amazon & Pinterest",
    s_ads_niche: "TikTok, Waze & Snapchat Ads",
    suite_media_title: "Content & Media Studio",
    s_media_podcast: "Full Podcast Production & Editing",
    s_media_video: "High-End Video Production",
    s_media_shorts: "Short-form Video & AI Captions",
    s_media_ar: "Custom AR Filters for Socials",
    suite_brand_title: "Identity & Brand Strategy",
    s_brand_manual: "Brand Identity & Manual Creation",
    s_brand_logo: "Logo Design & Visual Assets",
    s_brand_ebook: "E-book Design & Publication",
    s_brand_story: "Brand Storytelling & Copy",
    suite_biz_title: "Operations & Growth",
    s_biz_pa: "Virtual PA & Agenda Management",
    s_biz_sm: "Full Social Media Management",
    s_biz_email: "Email Marketing & Automation",
    s_biz_leads: "Sales Prototyping & Lead Gen",
    suite_tech_title: "Digital Engineering",
    s_tech_web: "Custom Shopify & Web Design",
    s_tech_seo: "SEO & Web Performance Audit",
    s_tech_apps: "App Development (Custom Apps)",
    s_tech_bots: "AI Chatbots & Flux Integrations",
    book_service: "Book Consultation",
    p1_desc: "Advanced backend logic, patterns, and robust distributed implementations.",
    p2_desc: "Scalable applications solving complex algorithmic and automation tasks.",
    p3_desc: "Hardware/software integration for smart, connected real-world systems.",
    p_link: "View Repo", p_link_3: "View Projects",
    impact_title: "Direct Impact (Stats)", special_title: "Tech Specialization",
    podcasts_title: "Podcasts & Content",
    pod1_desc: "Exploring the journey of transformation from a solopreneur to a business owner with strategic vision.",
    pod2_desc: "Practical wisdom on maintaining inner peace and yogic principles in the modern, fast-paced world.",
    contact_title: "Ready to build the future?",
    contact_desc: "Whether you're scaling a vision or starting a journey, let's architect something remarkable together.",
    contact_email: "Send an Email", download_cv: "Download CV",
    t_welcome: "Welcome to Cuauhtémoc's interactive shell.", t_instr: "Type 'help' to see available commands.",
    t_whoami: "Cuauhtémoc Cataño: Developer, Founder, and Podcast Host."
  },
  ES: {
    home: "Inicio", about: "Sobre Mí", skills: "Habilidades", projects: "Ingeniería", podcasts: "Podcasts", contact: "Contacto",
    hero_title: "Presencia Digital de Alto Desempeño",
    hero_desc: "Sabes que tu negocio debe estar en línea, pero no tienes por qué saber cómo. Construyo experiencias digitales holísticas que unen ingeniería robusta con marketing estratégico y branding de élite.",
    trust_label_1: "Estrategia de Marca", trust_label_2: "Excelencia Técnica",
    trust_val_1: "Presencia Digital Holística", trust_val_2: "Soluciones Robustas y Escalables",
    about_title: "Visionario Detrás del Código",
    about_p1: "Soy más que un desarrollador; soy un socio estratégico para dueños de negocio. Con una sólida formación en marketing, branding y comunicación, no solo programo sitios—creo voces digitales que resuenan y convierten.",
    about_p2: "Como fundador de Pilea y host de dos podcasts de negocios, entiendo que la tecnología debe servir a un propósito: visibilidad, autoridad y crecimiento. Ofrezco soluciones digitales 'a la carta' adaptadas a cada etapa de tu empresa.",
    skills_title: "Herramientas Estratégicas",
    s_java: "Arquitectura de grado empresarial. El núcleo robusto y confiable para sistemas de negocio complejos.",
    s_python: "Automatización basada en datos y soluciones inteligentes que optimizan las operaciones de tu empresa.",
    eng_title: "Ingeniería Digital A La Carta",
    services_title: "Servicios Digitales A La Carta",
    suite_ads_title: "Publicidad Omnicanal",
    s_ads_meta: "Meta Ads (FB e IG)",
    s_ads_google: "Google y YouTube Ads",
    s_ads_pro: "LinkedIn, Amazon y Pinterest",
    s_ads_niche: "TikTok, Waze y Snapchat Ads",
    suite_media_title: "Estudio de Contenido y Medios",
    s_media_podcast: "Producción y Edición de Podcast",
    s_media_video: "Producción de Video de Alta Gama",
    s_media_shorts: "Videos Cortos y Subtítulos con IA",
    s_media_ar: "Filtros AR para Redes Sociales",
    suite_brand_title: "Identidad y Estrategia de Marca",
    s_brand_manual: "Manuales de Identidad de Marca",
    s_brand_logo: "Diseño de Logo y Activos Visuales",
    s_brand_ebook: "Diseño y Publicación de E-books",
    s_brand_story: "Storytelling y Copy de Marca",
    suite_biz_title: "Operaciones y Crecimiento",
    s_biz_pa: "Asistente Virtual y Gestión de Agenda",
    s_biz_sm: "Gestión Integral de Redes Sociales",
    s_biz_email: "Email Marketing y Automatización",
    s_biz_leads: "Prototipado de Ventas y Lead Gen",
    suite_tech_title: "Ingeniería Digital",
    s_tech_web: "Diseño Web y Shopify Personalizado",
    s_tech_seo: "Auditoría de SEO y Rendimiento Web",
    s_tech_apps: "Desarrollo de Apps a la Medida",
    s_tech_bots: "Chatbots de IA e Integraciones",
    book_service: "Reservar Consultoría",
    p1_desc: "Lógica de backend avanzada, patrones e implementaciones distribuidas robustas.",
    p2_desc: "Aplicaciones escalables que resuelven tareas complejas de algoritmos y automatización.",
    p3_desc: "Integración de hardware/software para sistemas conectados e inteligentes.",
    p_link: "Ver Repositorio", p_link_3: "Ver Proyectos",
    impact_title: "Impacto Directo (Stats)", special_title: "Especialización Técnica",
    podcasts_title: "Podcasts y Contenido",
    pod1_desc: "Explorando el viaje de transformación de emprendedor a dueño de negocio con visión estratégica.",
    pod2_desc: "Sabiduría práctica para mantener la paz interior y los principios yóguicos en el mundo moderno.",
    contact_title: "¿Listo para construir el futuro?",
    contact_desc: "Ya sea que estés escalando una visión o comenzando un viaje, construyamos algo increíble juntos.",
    contact_email: "Enviar Email", download_cv: "Descargar CV",
    t_welcome: "Bienvenido a la terminal interactiva de Cuauhtémoc.", t_instr: "Escribe 'help' para ver los comandos disponibles.",
    t_whoami: "Cuauhtémoc Cataño: Desarrollador, Fundador y Host de Podcast."
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = t[key];
      } else {
        el.innerText = t[key];
      }
    }
  });

  document.querySelectorAll(".navbar").forEach(nav => {
    nav.querySelectorAll("a").forEach((link, index) => {
      const keys = ["home", "about", "services", "skills", "projects", "podcasts", "contact"];
      if (keys[index]) link.innerText = t[keys[index]];
    });
  });

  document.querySelectorAll(".home-content h1").forEach(h1 => h1.innerText = t.hero_title);
  document.querySelectorAll(".home-content p").forEach(p => p.innerText = t.hero_desc);
  
  document.querySelectorAll(".btn").forEach(btn => {
    if (btn.innerText.includes("CV") || btn.innerText.includes("Descargar") || btn.innerText.includes("Download")) {
      btn.innerText = t.download_cv;
    }
    if (btn.classList.contains("email-btn")) {
      btn.innerHTML = `<i class='bx bx-envelope'></i> ${t.contact_email}`;
    }
  });

  document.querySelectorAll(".about-text p").forEach((p, i) => {
    p.innerText = i === 0 ? t.about_p1 : t.about_p2;
  });

  document.querySelectorAll(".trust-label").forEach((label, i) => {
    label.innerText = i % 2 === 0 ? t.trust_label_1 : t.trust_label_2;
  });
  document.querySelectorAll(".trust-value").forEach((val, i) => {
    val.innerText = i % 2 === 0 ? t.trust_val_1 : t.trust_val_2;
  });

  document.querySelectorAll(".section-title").forEach(title => {
    const section = title.closest("section");
    if (!section) return;
    const map = { about: t.about_title, skills: t.skills_title, projects: t.eng_title, podcasts: t.podcasts_title, contact: t.contact_title };
    if (map[section.id]) title.innerText = map[section.id];
  });

  document.querySelectorAll(".skill-card").forEach(card => {
    const p = card.querySelector("p");
    if (p) {
      if (p.innerText.includes("Core specialty") || p.innerText.includes("Especialidad principal")) p.innerText = t.s_java;
      if (p.innerText.includes("Data science") || p.innerText.includes("Ciencia de datos")) p.innerText = t.s_python;
    }
  });

  document.querySelectorAll(".project-card").forEach(card => {
    const h3 = card.querySelector("h3");
    const p = card.querySelector("p");
    const link = card.querySelector(".project-link");
    
    if (h3) {
      if (h3.innerText.includes("Comprehensive") || h3.innerText.includes("backend")) h3.innerText = "Java Comprehensive";
      if (h3.innerText.includes("Solutions") || h3.innerText.includes("escalables")) h3.innerText = "Python Solutions";
      if (h3.innerText.includes("Impact") || h3.innerText.includes("Directo")) h3.innerText = t.impact_title;
      if (h3.innerText.includes("Specialization") || h3.innerText.includes("Especialización")) h3.innerText = t.special_title;
    }
    
    if (p) {
      if (p.innerText.includes("Advanced backend") || p.innerText.includes("Lógica de backend")) p.innerText = t.p1_desc;
      if (p.innerText.includes("Scalable applications") || p.innerText.includes("Aplicaciones escalables")) p.innerText = t.p2_desc;
      if (p.innerText.includes("Hardware/software") || p.innerText.includes("Integración de hardware")) p.innerText = t.p3_desc;
      if (p.innerText.includes("solopreneur") || p.innerText.includes("emprendedor a dueño")) p.innerText = t.pod1_desc;
      if (p.innerText.includes("Practical wisdom") || p.innerText.includes("Sabiduría práctica")) p.innerText = t.pod2_desc;
    }

    if (link) {
      link.innerHTML = `${card.id === "projects-3" ? t.p_link_3 : t.p_link} <i class='bx bx-right-arrow-alt'></i>`;
    }
  });

  document.querySelectorAll(".contact-content p").forEach(p => p.innerText = t.contact_desc);
  document.querySelectorAll(".welcome-msg").forEach(msg => msg.innerText = t.t_welcome);
  document.querySelectorAll(".instruction-msg").forEach(msg => msg.innerText = t.t_instr);
  document.querySelectorAll(".terminal-output").forEach(out => {
    if (out.innerText.includes("Cataño: Developer") || out.innerText.includes("Cataño: Desarrollador")) out.innerText = t.t_whoami;
  });

  // Update button text for switcher
  langSwitches.forEach(btn => btn.innerText = lang === "EN" ? "ES" : "EN");
}

langSwitches.forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "ES" : "EN";
    updateLanguage(currentLang);
    localStorage.setItem("preferredLang", currentLang);
  });
});

/**
 * Service Button Logic (Stripe Integration Ready)
 */
document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Placeholder for Stripe Payment Link Redirect
    // window.location.href = "https://buy.stripe.com/your_payment_link_here";
    
    // For now, scroll to contact section
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// Initialize Language on Load
const savedLang = localStorage.getItem("preferredLang");
const browserLang = navigator.language.startsWith("es") ? "ES" : "EN";
currentLang = savedLang || browserLang;
updateLanguage(currentLang);
