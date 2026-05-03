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

    const nextKey = nextTheme === "dark" ? "switch_light" : "switch_dark";
    const nextText = translations[currentLang][nextKey];

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
/**
 * Advanced Command Center Logic (Phase 3)
 */
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");
const terminalWindow = document.querySelector(".terminal-window");

if (terminalWindow && terminalInput) {
  terminalWindow.addEventListener("click", () => {
    terminalInput.focus();
  });
}

const appendTerminalOutput = (text, type = "output") => {
  const output = document.createElement("div");
  output.className = `terminal-${type}`;
  output.innerText = text;
  terminalBody.insertBefore(output, terminalInput.parentElement);
  terminalBody.scrollTop = terminalBody.scrollHeight;
};

if (terminalInput) {
  terminalInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const fullInput = terminalInput.value.trim();
      if (!fullInput) return;

      const [cmd, ...args] = fullInput.toLowerCase().split(' ');
      
      // Echo command
      const line = document.createElement("div");
      line.className = "terminal-line";
      line.innerHTML = `<span class="prompt">founder@brand:~$</span> <span>${fullInput}</span>`;
      terminalBody.insertBefore(line, terminalInput.parentElement);
      terminalInput.value = "";

      if (cmd === "clear") {
        const lines = terminalBody.querySelectorAll(".terminal-line, .terminal-output");
        lines.forEach(l => { if (!l.contains(terminalInput)) l.remove(); });
        return;
      }

      if (cmd === "oracle") {
        document.getElementById('oracle-chat')?.classList.remove('hidden');
        appendTerminalOutput("Opening The Oracle interface...", "output");
        return;
      }

      // API-based commands
      appendTerminalOutput("Processing...", "output");
      const lastOutput = terminalInput.parentElement.previousElementSibling;

      try {
        // Dynamic API Base for local development
        const apiBase = window.location.port !== '3000' ? 'http://localhost:3000' : '';
        const response = await fetch(`${apiBase}/api/terminal/bridge`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: cmd, args })
        });
        const data = await response.json();

        
        if (lastOutput.classList.contains('terminal-output') && lastOutput.innerText === "Processing...") {
          lastOutput.innerText = data.output || data.error;
        } else {
          appendTerminalOutput(data.output || data.error, "output");
        }
      } catch (err) {
        if (lastOutput.innerText === "Processing...") lastOutput.innerText = "Bridge connection lost.";
        else appendTerminalOutput("Bridge connection lost.", "output");
      }
      
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
    projects: "Engineering", launchpad_hub: "Launchpad", podcasts: "Podcasts", contact: "Contact",
    discovery_title: "Discover Your Brand's Potential",
    discovery_desc: "Enter your website URL to get an instant Brand Vitality Score and identify elite growth opportunities.",
    scan_now: "Scan Now",
    get_full_report: "Get Full Intelligence Report",
    analyzing: "Analyzing...",
    performance: "Performance",
    identity: "Identity",
    oracle_name: "The Oracle",
    oracle_welcome: "Welcome. Speak your strategy, and I shall architect the path.",
    oracle_placeholder: "Ask the Oracle...",
    hero_title: "Crafting High-Performance Digital Presences",
    hero_desc: "Architecting holistic digital experiences that combine robust engineering with strategic marketing and elite branding.",
    trust_label_1: "Brand Strategy", trust_label_2: "Technical Excellence",
    trust_val_1: "Holistic Digital Presence", trust_val_2: "Robust & Scalable Solutions",
    about_title: "The Visionary Behind the Code",
    about_p1: "I'm more than a developer; I'm a strategic partner. With a background in marketing and branding, I create digital voices that resonate.",
    about_p2: "I provide 'a la carte' digital solutions tailored to your unique business journey.",
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
    skills_title: "The Strategic Toolkit",
    s_java: "Enterprise-grade architecture. Building the robust backbone for complex systems.",
    s_python: "Data-driven automation and smart backend solutions that streamline operations.",
    eng_title: "Digital Engineering A La Carte",
    p1_desc: "Advanced backend logic, patterns, and robust distributed implementations.",
    p2_desc: "Scalable applications solving complex algorithmic and automation tasks.",
    p3_desc: "Hardware/software integration for smart, connected real-world systems.",
    p_link: "View Repo", p_link_3: "View Projects",
    impact_title: "Direct Impact (Stats)", special_title: "Tech Specialization",
    podcasts_title: "Podcasts & Content",
    pod1_desc: "The journey from a solopreneur to a business owner with strategic vision.",
    pod2_desc: "Practical wisdom on yogic principles in the modern world.",
    contact_title: "Ready to build the future?",
    contact_desc: "Let's architect something remarkable together.",
    contact_email: "Send an Email", download_cv: "Download CV",
    t_welcome: "Welcome to Cuauhtémoc's interactive shell.",
    t_instr: "Type 'help' for options.",
    t_whoami: "Cuauhtémoc Cataño: Developer, Founder, and Podcast Host.",
    modal_title: "Book a Discovery Call",
    modal_desc: "45 minutes to architect your digital future.",
    form_name: "Your Name",
    form_email: "Email Address",
    suite_general: "General Consultation",
    btn_next: "Pick a Time",
    pick_time: "Select Date & Time",
    syncing: "Syncing availability...",
    switch_light: "Switch to light mode",
    switch_dark: "Switch to dark mode"
  },
  ES: {
    home: "Inicio", about: "Sobre Mí", services: "Servicios", skills: "Habilidades", projects: "Ingeniería", launchpad_hub: "Launchpad", podcasts: "Podcasts", contact: "Contacto",
    discovery_title: "Descubre el Potencial de tu Marca",
    discovery_desc: "Ingresa la URL de tu sitio para obtener un Score de Vitalidad de Marca instantáneo e identificar oportunidades de crecimiento.",
    scan_now: "Escanear Ahora",
    get_full_report: "Obtener Reporte de Inteligencia Completo",
    analyzing: "Analizando...",
    performance: "Desempeño",
    identity: "Identidad",
    oracle_name: "El Oráculo",
    oracle_welcome: "Bienvenida. Habla de tu estrategia y yo trazaré el camino.",
    oracle_placeholder: "Pregunta al Oráculo...",
    hero_title: "Presencia Digital de Alto Desempeño",
    hero_desc: "Construyo experiencias digitales holísticas que unen ingeniería robusta con marketing estratégico y branding de élite.",
    trust_label_1: "Estrategia de Marca", trust_label_2: "Excelencia Técnica",
    trust_val_1: "Presencia Digital Holística", trust_val_2: "Soluciones Robustas y Escalables",
    about_title: "El Visionario Detrás del Código",
    about_p1: "Soy más que un desarrollador; soy un socio estratégico. Con experiencia en marketing y branding, creo voces digitales que resuenan.",
    about_p2: "Ofrezco soluciones digitales 'a la carta' adaptadas a tu camino empresarial único.",
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
    skills_title: "El Arsenal Estratégico",
    s_java: "Arquitectura empresarial. El núcleo robusto y confiable para sistemas complejos.",
    s_python: "Automatización inteligente y soluciones de backend que optimizan operaciones.",
    eng_title: "Ingeniería Digital A La Carta",
    p1_desc: "Lógica de backend avanzada, patrones e implementaciones robustas.",
    p2_desc: "Aplicaciones escalables que resuelven tareas complejas de automatización.",
    p3_desc: "Integración de hardware/software para sistemas inteligentes.",
    p_link: "Ver Repo", p_link_3: "Ver Proyectos",
    impact_title: "Impacto Directo", special_title: "Especialización Técnica",
    podcasts_title: "Podcasts y Contenido",
    pod1_desc: "El viaje de emprendedor a dueño de negocio con visión estratégica.",
    pod2_desc: "Sabiduría práctica sobre principios yóguicos en el mundo moderno.",
    contact_title: "¿Listo para construir el futuro?",
    contact_desc: "Diseñemos algo extraordinario juntos.",
    contact_email: "Enviar Email", download_cv: "Descargar CV",
    t_welcome: "Bienvenido a la terminal interactiva de Cuauhtémoc.", t_instr: "Escribe 'help' para ver opciones.",
    t_whoami: "Cuauhtémoc Cataño: Desarrollador, Fundador y Host de Podcast.",
    modal_title: "Reserva una Llamada de Descubrimiento",
    modal_desc: "45 minutos para diseñar tu futuro digital.",
    form_name: "Tu Nombre",
    form_email: "Correo Electrónico",
    suite_general: "Consultoría General",
    btn_next: "Elegir Horario",
    pick_time: "Selecciona Fecha y Hora",
    syncing: "Sincronizando disponibilidad...",
    switch_light: "Cambiar a modo claro",
    switch_dark: "Cambiar a modo oscuro"
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  
  // 1. Text Content with data-i18n
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

  // 2. Section Titles Mapping
  document.querySelectorAll(".section-title").forEach(title => {
    const section = title.closest("section");
    if (!section && title.parentElement.classList.contains("podcasts")) return;
    
    const id = section ? section.id : "";
    const titleMap = {
      about: t.about_title,
      services: t.services_title,
      skills: t.skills_title,
      projects: t.eng_title,
      podcasts: t.podcasts_title,
      contact: t.contact_title
    };
    if (titleMap[id]) title.innerText = titleMap[id];
  });

  // 3. Dynamic Elements & Lists
  document.querySelectorAll(".home-content h1").forEach(h1 => h1.innerText = t.hero_title);
  document.querySelectorAll(".home-content p").forEach(p => p.innerText = t.hero_desc);
  
  document.querySelectorAll(".btn").forEach(btn => {
    if (btn.innerText.includes("CV") || btn.innerText.includes("Descargar") || btn.innerText.includes("Download")) {
      btn.innerText = t.download_cv;
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

  document.querySelectorAll(".skill-card p").forEach(p => {
    if (p.innerText.includes("Enterprise-grade") || p.innerText.includes("Arquitectura empresarial")) p.innerText = t.s_java;
    if (p.innerText.includes("Data-driven") || p.innerText.includes("Automatización inteligente")) p.innerText = t.s_python;
  });

  document.querySelectorAll(".project-card p").forEach(p => {
    if (p.innerText.includes("Advanced backend") || p.innerText.includes("Lógica de backend")) p.innerText = t.p1_desc;
    if (p.innerText.includes("Scalable applications") || p.innerText.includes("Aplicaciones escalables")) p.innerText = t.p2_desc;
    if (p.innerText.includes("Hardware/software") || p.innerText.includes("Integración de hardware")) p.innerText = t.p3_desc;
    if (p.innerText.includes("solopreneur") || p.innerText.includes("emprendedor a dueño")) p.innerText = t.pod1_desc;
    if (p.innerText.includes("wisdom") || p.innerText.includes("Sabiduría")) p.innerText = t.pod2_desc;
  });

  document.querySelectorAll(".contact-content p").forEach(p => p.innerText = t.contact_desc);
  document.querySelectorAll(".welcome-msg").forEach(msg => msg.innerText = t.t_welcome);
  document.querySelectorAll(".instruction-msg").forEach(msg => msg.innerText = t.t_instr);
  document.querySelectorAll(".terminal-output").forEach(out => {
    if (out.innerText.includes("Cataño:") ) out.innerText = t.t_whoami;
  });

  // 4. Update dynamic attributes
  const isDark = document.body.classList.contains("dark-mode");
  const nextKey = isDark ? "switch_light" : "switch_dark";
  const nextText = t[nextKey];

  toggleIcons.forEach((btn) => {
    btn.setAttribute("aria-label", nextText);
    btn.setAttribute("title", nextText);
  });

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
 * Service Button & Booking Modal Logic
 */
const bookingModal = document.getElementById("bookingModal");
const modalClose = document.querySelector(".modal-close");
const leadForm = document.getElementById("leadCaptureForm");
const bookingFlow = document.getElementById("bookingFlow");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const backBtn = document.getElementById("backToStep1");
const serviceSelect = document.getElementById("leafService");

const suiteMap = {
  "Omnichannel Advertising": "Ads",
  "Publicidad Omnicanal": "Ads",
  "Content & Media Studio": "Media",
  "Estudio de Contenido y Medios": "Media",
  "Identity & Brand Strategy": "Brand",
  "Identidad y Estrategia de Marca": "Brand",
  "Operations & Growth": "Growth",
  "Operaciones y Crecimiento": "Growth",
  "Digital Engineering": "Engineering",
  "Ingeniería Digital": "Engineering"
};

document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Identify service
    const h3Element = btn.parentElement.querySelector("h3");
    const suiteTitle = h3Element?.innerText.trim();
    const i18nKey = h3Element?.getAttribute("data-i18n");
    
    const keyMap = {
      "suite_ads_title": "Ads",
      "suite_media_title": "Media",
      "suite_brand_title": "Brand",
      "suite_biz_title": "Growth",
      "suite_tech_title": "Engineering"
    };

    console.log("Suite Detected:", { suiteTitle, i18nKey });

    if (i18nKey && keyMap[i18nKey]) {
      serviceSelect.value = keyMap[i18nKey];
    } else if (suiteTitle && suiteMap[suiteTitle]) {
      serviceSelect.value = suiteMap[suiteTitle];
    } else {
      serviceSelect.value = "General";
    }
    console.log("Pre-selected Value:", serviceSelect.value);

    // Reset flow
    step1.classList.add("active");
    step2.classList.remove("active");
    
    // Open modal
    bookingModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Handle Lead Form Next
leadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const leadData = {
    name: document.getElementById("leafName").value,
    email: document.getElementById("leafEmail").value,
    service: serviceSelect.value,
    timestamp: new Date().toISOString()
  };

  console.log("Lead Captured (Ready for Firebase):", leadData);
  localStorage.setItem("pendingLead", JSON.stringify(leadData));

  // Transition to Step 2
  step1.classList.remove("active");
  step2.classList.add("active");

  // In Step 2, we will eventually inject the custom app or Calendly
  setTimeout(() => {
    const anchor = document.getElementById("calendar-anchor");
    anchor.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <p style="margin-bottom: 20px; color: var(--text-muted);">Lead Verified. Ready to Schedule.</p>
        <a href="https://calendly.com/cuauhtemoccatano/30min" 
           target="_blank" 
           class="btn btn-primary">
           <i class='bx bx-calendar'></i> Open My Calendar
        </a>
      </div>
    `;
  }, 1000);
});

backBtn.addEventListener("click", () => {
  step2.classList.remove("active");
  step1.classList.add("active");
});

modalClose.addEventListener("click", () => {
  bookingModal.classList.remove("active");
  document.body.style.overflow = "";
});

bookingModal.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Initialize Language on Load
const savedLang = localStorage.getItem("preferredLang");
const browserLang = navigator.language.startsWith("es") ? "ES" : "EN";
currentLang = savedLang || browserLang;
updateLanguage(currentLang);
// Brand Discovery Logic (Move 3)
const startScanBtn = document.getElementById('start-scan');
const scanResults = document.getElementById('scan-results');
const scanUrlInput = document.getElementById('scan-url');

if (startScanBtn) {
  startScanBtn.addEventListener('click', async () => {
    const url = scanUrlInput.value;
    if (!url) return;

    startScanBtn.disabled = true;
    startScanBtn.innerHTML = `<span>${translations[currentLang].analyzing}</span><i class='bx bx-loader-alt bx-spin'></i>`;
    
    try {
      // Dynamic API Base for local development
      const apiBase = window.location.port !== '3000' ? 'http://localhost:3000' : '';
      const response = await fetch(`${apiBase}/api/check-vitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (data.score) {
        scanResults.classList.remove('hidden');
        
        // Animate Score
        const scoreText = document.getElementById('score-text');
        const scorePath = document.getElementById('score-path');
        const message = document.getElementById('vitals-message');
        
        message.innerText = data.message;
        
        let start = 0;
        const duration = 1000;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentScore = Math.floor(progress * data.score);
          
          scoreText.textContent = currentScore;
          scorePath.style.strokeDasharray = `${currentScore}, 100`;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }
        requestAnimationFrame(animate);

        // Animate Bars
        setTimeout(() => {
          document.getElementById('bar-perf').style.width = `${data.metrics.performance}%`;
          document.getElementById('bar-ident').style.width = `${data.metrics.identity}%`;
        }, 100);
      }
    } catch (err) {
      console.error('Scan failed:', err);
    } finally {
      startScanBtn.disabled = false;
      startScanBtn.innerHTML = `<span>${translations[currentLang].scan_now}</span><i class='bx bx-zap'></i>`;
    }
  });
}

// Oracle AI Chat Logic (Phase 1)
const oracleToggle = document.getElementById('oracle-toggle');
const oracleChat = document.getElementById('oracle-chat');
const closeOracle = document.getElementById('close-oracle');
const oracleMessages = document.getElementById('oracle-messages');
const oracleInput = document.getElementById('oracle-input');
const sendOracle = document.getElementById('send-oracle');

if (oracleToggle) {
  oracleToggle.addEventListener('click', () => {
    oracleChat.classList.toggle('hidden');
    if (!oracleChat.classList.contains('hidden')) {
      oracleInput.focus();
    }
  });

  closeOracle.addEventListener('click', () => {
    oracleChat.classList.add('hidden');
  });

  const appendMessage = (text, type) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.innerText = text;
    oracleMessages.appendChild(msgDiv);
    oracleMessages.scrollTop = oracleMessages.scrollHeight;
  };

  const processOracleMessage = async () => {
    const text = oracleInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    oracleInput.value = '';
    
    // Typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerText = '...';
    oracleMessages.appendChild(typingDiv);
    oracleMessages.scrollTop = oracleMessages.scrollHeight;

    try {
      // Dynamic API Base for local development
      const apiBase = window.location.port !== '3000' ? 'http://localhost:3000' : '';
      const response = await fetch(`${apiBase}/api/oracle/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();
      
      if (typingDiv.parentNode) oracleMessages.removeChild(typingDiv);
      appendMessage(data.response || "Silence from the Oracle...", 'bot');
    } catch (err) {
      console.error('Oracle failed:', err);
      if (typingDiv.parentNode) oracleMessages.removeChild(typingDiv);
      appendMessage("Link to the Oracle lost. Check your network.", 'bot');
    }
  };

  sendOracle.addEventListener('click', processOracleMessage);
  oracleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processOracleMessage();
  });
}

