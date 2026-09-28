(function () {
  'use strict';

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* Nota: el formulario fue eliminado. 
     Todo el contacto ahora se gestiona por Telegram. */

})();