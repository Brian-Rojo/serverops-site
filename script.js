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

  /* ---------- Formulario de contacto (envío a Formspree) ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      status.textContent = '';
      status.style.color = 'var(--accent)';

      var data = new FormData(form);
      var action = form.getAttribute('action');

      try {
        var response = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.textContent = '¡Gracias! Tu consulta fue enviada. Te responderemos a la brevedad.';
          form.reset();
        } else {
          var errorData = await response.json();
          status.textContent = errorData.errors
            ? errorData.errors.map(function (err) { return err.message; }).join(', ')
            : 'Hubo un error al enviar. Intentalo de nuevo.';
          status.style.color = '#ff6b6b';
        }
      } catch (error) {
        status.textContent = 'Hubo un error de conexión. Revisá tu internet e intentalo de nuevo.';
        status.style.color = '#ff6b6b';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        setTimeout(function () {
          status.textContent = '';
          status.style.color = 'var(--accent)';
        }, 10000);
      }
    });
  }
})();