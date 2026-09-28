(function () {
  'use strict';

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll (Animaciones de aparición) ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Si el navegador no soporta IntersectionObserver o el usuario prefiere menos movimiento,
  // simplemente mostramos todo el contenido quitando la clase .js.
  if (!('IntersectionObserver' in window) || reduceMotion) {
    document.documentElement.classList.remove('js');
  } else {
    var revealEls = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita que la página se recargue

      // Validación nativa del navegador
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // TODO: Aquí debes conectar tu backend o servicio de correo (Formspree, EmailJS, etc.)
      // Por ahora, simulamos un envío exitoso.
      status.textContent = 'Gracias. Te vamos a responder a la brevedad.';
      form.reset();

      // Limpiar el mensaje después de 8 segundos
      window.setTimeout(function () {
        status.textContent = '';
      }, 8000);
    });
  }
})();