// ----- Menú móvil con accesibilidad -----
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function toggleMenu() {
  const isActive = mobileMenu.classList.toggle('active');

  menuToggle.setAttribute('aria-expanded', isActive);
  mobileMenu.setAttribute('aria-hidden', !isActive);

  document.body.style.overflow = isActive ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// ----- HERO TERMINAL -----
const terminalLines = [
  "docker compose up -d",
  "python automation.py",
  "Deploy completado",
  "API online correctamente",
  "Telegram bot conectado",
  "Sistema monitoreando servicios"
];

const typingBox = document.querySelector(".typing-box");

let lineIndex = 0;
let charIndex = 0;

function typeEffect() {

  if (lineIndex < terminalLines.length) {

    const currentLine = terminalLines[lineIndex];

    if (charIndex < currentLine.length) {

      typingBox.innerHTML =
        `<span class="cyan">root@serverops</span>:~$ ${currentLine.substring(0, charIndex + 1)}<span class="cursor">|</span>`;

      charIndex++;

      setTimeout(typeEffect, 35);

    } else {

      charIndex = 0;
      lineIndex++;

      setTimeout(typeEffect, 1200);
    }

  } else {

    lineIndex = 0;

    setTimeout(typeEffect, 1000);
  }
}

typeEffect();

// ----- TERMINALES DINÁMICAS -----
const terminalOneLines = [
  "root@serverops:~/monitoring-agent$ cargo run --release",
  "",
  "Compiling infrastructure modules...",
  "Initializing observability engine...",
  "Connecting Docker runtime...",
  "Loading monitoring pipelines...",
  "Starting metrics collector...",
  "Monitoring system online ✔",
  "",
  "root@serverops:~/monitoring-agent$"
];

const terminalTwoLines = [
  "root@serverops:~/infra$ docker compose up -d",
  "",
  "Starting rust-api-gateway...",
  "Starting automation-core...",
  "Starting observability-stack...",
  "Checking containers...",
  "",
  "rust-api-gateway    Up 14 days",
  "automation-core     Up 11 days",
  "metrics-engine      Up 22 days",
  "",
  "All systems healthy ✔",
  "",
  "root@serverops:~/infra$"
];

function typeTerminal(elementId, lines, speed = 28) {

  const terminal = document.getElementById(elementId);

  if (!terminal) return;

  let currentLine = 0;
  let currentChar = 0;

  function writeLine() {

    if (currentLine >= lines.length) {

      setTimeout(() => {

        terminal.innerHTML = "";

        currentLine = 0;
        currentChar = 0;

        writeLine();

      }, 2500);

      return;
    }

    const lineText = lines[currentLine];

    const lineElement = document.createElement("p");

    terminal.appendChild(lineElement);

    function typeChar() {

      if (currentChar < lineText.length) {

        const char = lineText.charAt(currentChar);

        lineElement.textContent += char;

        if (
          lineText.includes("✔") ||
          lineText.includes("healthy") ||
          lineText.includes("Starting") ||
          lineText.includes("online") ||
          lineText.includes("Compiling")
        ) {
          lineElement.classList.add("green-text");
        }

        if (lineText.includes("root@serverops")) {
          lineElement.classList.add("cyan");
        }

        currentChar++;

        setTimeout(typeChar, speed);

      } else {

        currentLine++;
        currentChar = 0;

        setTimeout(writeLine, 160);
      }
    }

    typeChar();
  }

  writeLine();
}

typeTerminal("terminalOne", terminalOneLines);
typeTerminal("terminalTwo", terminalTwoLines);

// ----- Partículas -----
if (window.innerWidth > 768) {

  const particlesContainer = document.querySelector('.particles');

  for (let i = 0; i < 30; i++) {

    const particle = document.createElement('span');

    particle.classList.add('particle');

    particle.style.left = Math.random() * 100 + '%';

    particle.style.animationDuration =
      (Math.random() * 10 + 6) + 's';

    particle.style.animationDelay =
      (Math.random() * 5) + 's';

    particlesContainer.appendChild(particle);
  }
}

// ----- Scroll Reveal -----
const fadeElements = document.querySelectorAll(
  '.card, .solution-box, .stack-item, .hero h2, .subtitle, .badge, .hero-points, .cta-box, .terminal-card'
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add('fade-up-visible');

      observer.unobserve(entry.target);
    }
  });

}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
});

fadeElements.forEach(el => {

  el.classList.add('fade-up');

  observer.observe(el);
});

// ----- Glow parallax -----
const glow = document.querySelector('.bg-glow');

let ticking = false;

document.addEventListener('mousemove', (e) => {

  if (!ticking) {

    requestAnimationFrame(() => {

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      glow.style.transform =
        `translate(${x * 40}px, ${y * 40}px)`;

      ticking = false;
    });

    ticking = true;
  }
});

// ----- Back To Top -----
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {

  if (window.scrollY > 500) {

    backToTop.classList.add('visible');

  } else {

    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ----- Año dinámico -----
document.getElementById('currentYear').innerText =
  new Date().getFullYear();

// ----- Cerrar menú al hacer clic fuera -----
document.addEventListener('click', (e) => {

  if (
    mobileMenu.classList.contains('active') &&
    !mobileMenu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    toggleMenu();
  }
});