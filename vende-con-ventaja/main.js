'use strict';
(() => {
  const config = window.VENDE_CON_VENTAJA || {};
  const form = document.getElementById('registration-form');
  const fields = document.getElementById('registration-fields');
  const status = document.getElementById('registration-unavailable');
  const result = document.getElementById('registration-result');
  const retry = document.getElementById('retry-config');
  const radios = [...document.querySelectorAll('input[name="flujo"]')];
  const submit = form.querySelector('button[type="submit"]');
  let mode = 'participante';
  let loading = 0;
  let submitting = false;
  const endpoint = () => '/api/vende-con-ventaja/' + mode;
  const label = () => mode === 'interesado' ? 'QUIERO INFORMACIÓN' : 'ENVIAR INSCRIPCIÓN';
  async function loadForm() {
    const version = ++loading;
    fields.disabled = true;
    retry.hidden = true;
    status.hidden = false;
    status.textContent = 'Cargando formulario…';
    form.hidden = false;
    result.hidden = true;
    document.getElementById('consent').checked = false;
    document.getElementById('flow-description').textContent = mode === 'interesado'
      ? 'Déjanos tus datos para recibir información. Este registro no reserva un cupo.'
      : 'Completa tus datos para solicitar tu inscripción al programa. Fenalco validará la modalidad de inversión y el pago.';
    submit.textContent = label();
    try {
      const response = await fetch(endpoint(), { signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (version !== loading) return;
      if (!response.ok || !data.consentimiento || !Array.isArray(data.opciones)) throw new Error(data.message || 'Formulario no disponible.');
      const select = document.getElementById('participant');
      const previous = select.value;
      select.replaceChildren(new Option('Selecciona una opción', ''), ...data.opciones.map(value => new Option(value, value)));
      if (data.opciones.includes(previous)) select.value = previous;
      document.getElementById('consent-text').textContent = data.consentimiento;
      document.getElementById('consent-container').hidden = false;
      fields.disabled = false;
      status.hidden = true;
    } catch {
      if (version !== loading) return;
      status.textContent = 'No fue posible cargar el formulario. Intenta nuevamente.';
      retry.hidden = false;
    }
  }
  radios.forEach(radio => radio.addEventListener('change', () => {
    if (submitting || !radio.checked) return;
    mode = radio.value;
    loadForm();
  }));
  retry.addEventListener('click', loadForm);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || fields.disabled || !form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    data.consentimiento = document.getElementById('consent').checked;
    submitting = true;
    fields.disabled = true;
    radios.forEach(radio => { radio.disabled = true; });
    submit.textContent = 'ENVIANDO…';
    form.setAttribute('aria-busy', 'true');
    result.hidden = true;
    try {
      const response = await fetch(endpoint(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(65000) });
      const answer = await response.json();
      if (!response.ok) throw new Error(answer.message || 'No se pudo enviar. Intenta nuevamente.');
      result.textContent = answer.mensaje + (answer.correoEnviado
        ? ' Enviamos un correo de confirmación de recepción; revisa también la carpeta de spam.'
        : ' Tus datos quedaron registrados, pero no pudimos confirmar el envío del correo.');
      form.hidden = true;
    } catch (error) {
      result.textContent = error.name === 'TimeoutError' ? 'La respuesta está tardando. Conservamos tus datos; puedes reintentar sin duplicar el registro.' : (error.message === 'Failed to fetch' ? 'No se pudo conectar. Conservamos tus datos para que puedas reintentar.' : error.message);
    } finally {
      submitting = false;
      fields.disabled = false;
      radios.forEach(radio => { radio.disabled = false; });
      submit.textContent = label();
      form.removeAttribute('aria-busy');
      result.hidden = false;
      result.focus();
    }
  });
  loadForm();
  if (config.expertPhotoUrl) {
    let url;
    try { url = new URL(config.expertPhotoUrl, location.href); } catch { url = null; }
    if (url && (url.protocol === 'https:' || (url.origin === location.origin && ['http:', 'file:'].includes(url.protocol)))) {
      const photo = new Image();
      photo.alt = 'Rodrigo Jiménez O., Ingeniero Industrial, MBA y Coach';
      photo.width = 800; photo.height = 1000; photo.loading = 'lazy';
      photo.addEventListener('load', () => {
        const visual = document.getElementById('expert-visual');
        visual.replaceChildren(photo);
        visual.classList.add('with-photo');
      });
      photo.src = url.href;
    }
  }
  const sticky = document.querySelector('.mobile-sticky');
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(entries => {
      sticky.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { threshold: 0 });
    visibility.observe(document.getElementById('inscripcion'));
  }
})();
