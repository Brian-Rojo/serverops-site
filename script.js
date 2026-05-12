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
    if (mobileMenu.classList.contains('active')) toggleMenu();
  });
});

// ----- Terminal typing effect (mejorado) -----
const terminalLines = [
  "docker compose up -d",
  "python automation.py",
  "Deploy completado",
  "API online correctamente",
  "Telegram bot conectado",
  "Sistema monitoreando servicios"
];
const typingBox = document.querySelector(".typing-box");
let lineIndex = 0, charIndex = 0;

function typeEffect() {
  if (lineIndex < terminalLines.length) {
    const currentLine = terminalLines[lineIndex];
    if (charIndex < currentLine.length) {
      typingBox.innerHTML = `<span class="cyan">root@serverops</span>:~$ ${currentLine.substring(0, charIndex + 1)}<span class="cursor">|</span>`;
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

// ----- Partículas (solo en desktop, menos carga) -----
if (window.innerWidth > 768) {
  const particlesContainer = document.querySelector('.particles');
  for (let i = 0; i < 30; i++) { // reducido a 30 para mejor rendimiento
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 5) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ----- Scroll Reveal (Intersection Observer) -----
const fadeElements = document.querySelectorAll('.card, .solution-box, .stack-item, .hero h2, .subtitle, .badge, .hero-points, .cta-box');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-up-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

fadeElements.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ----- Mouse parallax glow (mejorado con throttle) -----
const glow = document.querySelector('.bg-glow');
let ticking = false;
document.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      glow.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
      ticking = false;
    });
    ticking = true;
  }
});

// ----- Botón "Volver arriba" -----
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ----- Año dinámico en footer -----
document.getElementById('currentYear').innerText = new Date().getFullYear();

// ----- Formulario de contacto (simulado con fetch / alert) -----
const contactForm = document.getElementById('contactForm');
const formFeedback = document.querySelector('.form-feedback');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  // Simulación de envío (cambia por un fetch real a tu backend)
  formFeedback.textContent = 'Enviando...';
  formFeedback.style.color = '#4da3ff';

  // Simular delay de red
  setTimeout(() => {
    // Aquí puedes enviar a un webhook o API real
    console.log('Datos enviados:', data);
    formFeedback.textContent = '✅ Mensaje enviado correctamente. Te responderé pronto.';
    formFeedback.style.color = '#3fb950';
    contactForm.reset();
    setTimeout(() => {
      formFeedback.textContent = '';
    }, 5000);
  }, 800);
});

// ----- Cerrar menú al hacer clic fuera (opcional) -----
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    toggleMenu();
  }
});