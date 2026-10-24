(() => {
  'use strict';

  // The account's /count endpoint. Set to an empty string to disable analytics.
  // This is a public site identifier, never an API key or account password.
  const endpoint = 'https://k-abhiram21.goatcounter.com/count';
  const productionHost = 'k-abhiram21.github.io';
  const pages = new Map([
    ['/', 'home'], ['/index.html', 'home'], ['/projects.html', 'projects'],
    ['/research.html', 'research'], ['/helivision.html', 'helivision'],
    ['/streamwatch.html', 'streamwatch']
  ]);
  const page = pages.get(location.pathname);

  // Preview copies, embedded pages, and common automation never send requests.
  if (!endpoint || location.hostname !== productionHost || location.protocol !== 'https:' ||
      !page || window.top !== window.self || navigator.webdriver) return;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.goatcounter.com') ||
        url.pathname !== '/count' || url.search || url.hash || url.username || url.password) return;
  } catch { return; }
  // GoatCounter's owner opt-out; analytics never writes browser storage.
  try { if (localStorage.getItem('skipgc') === 't') return; }
  catch { /* Counting still works when browser storage is unavailable. */ }

  const path = page === 'home' ? '/' : location.pathname;
  const sent = new Set();
  const pendingImages = new Set();
  let pageCounted = false;
  let referrer = '';
  try {
    const from = new URL(document.referrer);
    if (from.hostname !== productionHost) referrer = from.origin;
  } catch { /* Direct visit or no referrer. */ }

  // GoatCounter's documented /count protocol is isolated here for replacement.
  // Only fixed page/event names, title, and referring origin leave this module.
  function send(name, title, event = false) {
    if (document.visibilityState !== 'visible' || sent.has(name)) return;
    sent.add(name);
    const params = new URLSearchParams({
      p: name, t: title, r: event ? '' : referrer,
      e: String(event), rnd: Math.random().toString(36).slice(2, 9)
    });
    const url = `${endpoint}?${params}`;
    try {
      if (navigator.sendBeacon?.(url)) return;
    } catch { /* A blocked beacon may still allow the image transport. */ }
    // Detached image fallback: no elements, badges, or counters enter the page.
    try {
      const image = new Image();
      pendingImages.add(image);
      image.onload = image.onerror = () => pendingImages.delete(image);
      image.referrerPolicy = 'origin';
      image.src = url;
    } catch { /* Analytics must never interrupt navigation or other controls. */ }
  }

  function countPage() {
    if (pageCounted || document.visibilityState !== 'visible') return;
    pageCounted = true;
    send(path, document.title);
  }
  countPage();
  document.addEventListener('visibilitychange', countPage);

  function engage(action) {
    countPage();
    send(`engagement/${page}/${action}`, `${page}: ${action.replaceAll('-', ' ')}`, true);
  }

  const notes = [...document.querySelectorAll('details')];
  function onClick(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const control = event.target.closest?.('a, button, summary');
    if (!control) return;
    if (control.matches('[data-copy-email]')) {
      engage('copy-email-click');
      return;
    }
    if (control.matches('summary')) {
      const detail = control.closest('details');
      if (detail && !detail.open) engage(`open-note-${notes.indexOf(detail) + 1}`);
      return;
    }
    if (control.matches('[data-image-viewer]')) {
      const images = [...document.querySelectorAll('[data-image-viewer]')];
      engage(`open-image-${images.indexOf(control) + 1}`);
      return;
    }
    if (!control.matches('a[href]')) return;
    const url = new URL(control.href, location.href);
    if (url.origin === location.origin && control.hasAttribute('download')) engage('resume-click');
    else if (url.protocol === 'mailto:') engage('email-click');
    else if (url.hostname === 'www.linkedin.com') engage('linkedin-click');
    else if (url.hostname === 'github.com') engage('github-click');
  }
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);

  // One milestone per page load; no pointer tracking or continuous scroll logs.
  function onScroll() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    if (distance <= 0 || window.scrollY / distance < 0.75 ||
        document.visibilityState !== 'visible') return;
    engage('scroll-75');
    window.removeEventListener('scroll', onScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();
