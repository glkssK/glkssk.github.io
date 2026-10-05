/* Progressive enhancement only: the pages and PDFs work without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-language-switch]').forEach(link => {
    if (window.location.hash) link.hash = window.location.hash;
  });
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let scheduled = false;
  function updateNav() {
    const cutoff = window.innerWidth <= 600 ? 160 : 150;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= cutoff) active = section;
    }
    navLinks.forEach(link => {
      if (active && link.hash === '#' + active.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateNav); }
  }, {passive: true});
  updateNav();
  window.addEventListener('hashchange', () => {
    document.querySelectorAll('[data-language-switch]').forEach(link => { link.hash = window.location.hash; });
  });
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const status = document.querySelector('.copy-status');
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(button.dataset.copyEmail);
        if (status) status.textContent = button.dataset.copiedLabel;
      } catch (_) {
        if (status) status.textContent = button.dataset.errorLabel;
      }
    });
  });
})();

/* Click a figure to inspect the unchanged original; Esc, backdrop, and arrow keys work. */
(() => {
  'use strict';
  const viewer = document.getElementById('image-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const links = [...document.querySelectorAll('a[data-lightbox]')];
  const image = document.getElementById('viewer-image');
  const title = document.getElementById('viewer-title');
  const original = document.getElementById('viewer-original');
  const counter = document.getElementById('viewer-counter');
  const close = viewer.querySelector('[data-close-viewer]');
  let index = 0;
  let opener = null;
  const show = nextIndex => {
    index = (nextIndex + links.length) % links.length;
    const link = links[index];
    const thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail?.alt || link.dataset.imageTitle;
    image.removeAttribute('width');
    image.removeAttribute('height');
    title.textContent = link.dataset.imageTitle;
    original.href = link.href;
    counter.textContent = `${index + 1} / ${links.length}`;
  };
  links.forEach((link, i) => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(i);
    viewer.showModal();
    document.documentElement.classList.add('image-viewer-open');
    close.focus();
  }));
  close.addEventListener('click', () => viewer.close());
  viewer.querySelector('[data-viewer-prev]').addEventListener('click', () => show(index - 1));
  viewer.querySelector('[data-viewer-next]').addEventListener('click', () => show(index + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
  // A backdrop click has the dialog as its target. Inside the panel never closes it.
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('image-viewer-open');
    opener?.focus({preventScroll: true});
  });
})();
