(() => {
  'use strict';

  const copyEmail = document.querySelector('[data-copy-email]');
  copyEmail?.addEventListener('click', async () => {
    const status = document.querySelector('.copy-feedback');
    try {
      await navigator.clipboard.writeText('abhiramkondaguduru@gmail.com');
      copyEmail.textContent = 'Copied';
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the email address to copy it, or open it to write a message.';
    }
  });

  // A working-note link opens the relevant disclosure before the browser
  // settles on its fragment, so readers land on the detail they asked for.
  function openLinkedNote() {
    const target = document.getElementById(location.hash.slice(1));
    const note = target?.closest('details');
    if (note) note.open = true;
  }
  openLinkedNote();
  window.addEventListener('hashchange', openLinkedNote);

  // Four fields show the same approach applied to different kinds of work.
  const story = [
    { label: 'ROUTING & DECISIONS', title: 'When is a<br>specialist useful?', description: 'A specialist can help on one request and make another worse. I follow the decision through to the answer the system actually returns.', status: '01 / ROUTING', command: 'working on', result: 'Model routing', detail: 'Follow the choice through to the served answer.', link: './research.html#routing', linkText: 'Read about my routing work' },
    { label: 'DATA & OBSERVABILITY', title: 'Monitoring a<br>MongoDB app.', description: 'A collection view cannot explain a slow request on its own. I connected application activity to metrics that give the investigation a starting point.', status: '02 / DATA', command: 'working on', result: 'Database monitoring', detail: 'Look at request timing alongside the data.', link: './streamwatch.html', linkText: 'Read about StreamWatch' },
    { label: 'AI & RESEARCH', title: 'How much can<br>uncertainty tell us?', description: 'A reassuring signal can hide a wrong answer. The interesting cases are the ones that make an apparently good detector worth questioning.', status: '03 / RESEARCH', command: 'working on', result: 'LLM reliability', detail: 'Examine the cases a headline score can hide.', link: './research.html', linkText: 'Read the research notes' },
    { label: 'ASSISTIVE VISION', title: 'A helmet with<br>visual cues.', description: 'A camera, a detector, and a display each need to work on their own. Breaking the helmet into separate processes made their connections easier to debug.', status: '04 / HARDWARE', command: 'working on', result: 'HeliVision', detail: 'Inspect each part before reconnecting the pipeline.', link: './helivision.html', linkText: 'Read about HeliVision' }
  ];
  const stepButtons = [...document.querySelectorAll('.story-steps button')];
  let activeStep = 0;
  function setStoryStep(index) {
    if (index === activeStep) return;
    activeStep = index;
    const entry = story[index];
    document.getElementById('story-counter').textContent = `0${index + 1} / 04`;
    document.getElementById('story-eyebrow').textContent = entry.label;
    // Only local, authored strings from the array above are inserted as markup.
    document.getElementById('story-heading').innerHTML = entry.title;
    document.getElementById('story-description').textContent = entry.description;
    document.querySelector('.signal-diagram').dataset.step = String(index);
    document.querySelector('.investigation-visual').dataset.step = String(index);
    document.querySelector('.story-controls').style.setProperty('--step', index);
    document.getElementById('trace-status').textContent = entry.status;
    document.getElementById('trace-command').textContent = entry.command;
    document.getElementById('trace-result').textContent = entry.result;
    document.getElementById('trace-detail').textContent = entry.detail;
    const storyLink = document.getElementById('story-link');
    storyLink.href = entry.link;
    storyLink.replaceChildren(document.createTextNode(entry.linkText + ' '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    storyLink.append(arrow);
    stepButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    refreshTextMasks();
  }
  stepButtons.forEach((button, index) => {
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') setStoryStep(index);
    });
    button.addEventListener('focus', () => setStoryStep(index));
    button.addEventListener('click', () => {
      setStoryStep(index);
      // A sticky phone control can remain visible after its headline has scrolled
      // away. Bring the new explanation back below the controls when tapped.
      if (!matchMedia('(max-width: 700px)').matches) return;
      const copy = document.querySelector('.story-copy').getBoundingClientRect();
      const controls = document.querySelector('.story-controls').getBoundingClientRect();
      if (copy.top < controls.bottom) {
        window.scrollBy({ top: copy.top - controls.bottom - 24, behavior: reduced.matches ? 'instant' : 'smooth' });
      }
    });
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      stepButtons[(index + (event.key === 'ArrowRight' ? 1 : -1) + story.length) % story.length].focus();
    });
  });

  const sectionLinks = [...document.querySelectorAll('.page-index a')];
  const sections = [...document.querySelectorAll('main > section')];
  const pageIndex = document.querySelector('.page-index');
  const indexRunner = pageIndex.querySelector('.index-runner');
  function updateIndex() {
    document.documentElement.classList.toggle('has-scrolled', scrollY > innerHeight * 0.65);
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || document.querySelector('[data-adaptive].site-header').offsetHeight;
    const anchors = sections.map(section => Math.max(0, section.getBoundingClientRect().top + scrollY - offset));
    let index = 0;
    while (index < anchors.length - 1 && scrollY + 1 >= anchors[index + 1]) index++;
    if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) index = anchors.length - 1;
    const page = document.body.dataset.page;
    document.querySelectorAll('.site-header nav a').forEach(link => {
      let current = null;
      if (link.dataset.pageLink === page && !(page === 'home' && ['about', 'contact'].includes(sections[index].id))) current = 'page';
      if (link.hasAttribute('data-scroll-link') && page === 'home' && link.hash === `#${sections[index].id}`) current = 'location';
      if (current) link.setAttribute('aria-current', current);
      else link.removeAttribute('aria-current');
    });
    sectionLinks.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const position = sectionLinks[index].offsetTop + sectionLinks[index].offsetHeight / 2;
    if (indexRunner.dataset.position !== String(position)) indexRunner.dataset.position = String(position);
  }
  const adaptiveElements = [...document.querySelectorAll('[data-adaptive]')];
  const inverseSurfaces = [...document.querySelectorAll('[data-invert-surface]')];
  // Two protected, opaque renderings of each fixed control. The opposite-color
  // rendering is clipped to actual surface intersections, never a midpoint test.
  const chromeCopies = adaptiveElements.flatMap(element => inverseSurfaces.map(surface => {
    const window = document.createElement('div');
    window.className = 'chrome-window';
    window.setAttribute('aria-hidden', 'true');
    window.inert = true;
    const copy = element.cloneNode(true);
    copy.removeAttribute('data-adaptive');
    copy.setAttribute('data-chrome-copy', '');
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    window.append(copy);
    document.body.append(window);
    return { element, surface, copy, window };
  }));
  function syncChromeCopies() {
    chromeCopies.forEach(({ element, copy }) => {
      copy.innerHTML = element.innerHTML;
      copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    });
  }
  let chromeFrame = 0;
  function updateChrome() {
    cancelAnimationFrame(chromeFrame);
    chromeFrame = 0;
    const bounds = new Map(inverseSurfaces.map(surface => [surface, surface.getBoundingClientRect()]));
    chromeCopies.forEach(({ element, surface, copy, window }) => {
      const rect = element.getBoundingClientRect();
      const behind = bounds.get(surface);
      const left = Math.max(rect.left, behind.left);
      const right = Math.min(rect.right, behind.right);
      const top = Math.max(rect.top, behind.top);
      const bottom = Math.min(rect.bottom, behind.bottom);
      if (right <= left || bottom <= top) {
        window.style.display = 'none';
        return;
      }
      Object.assign(window.style, { display: 'block', left: `${left}px`, top: `${top}px`, width: `${right - left}px`, height: `${bottom - top}px` });
      Object.assign(copy.style, { left: `${rect.left - left}px`, top: `${rect.top - top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    });
    updateIndex();
  }
  function scheduleChrome() {
    if (!chromeFrame) chromeFrame = requestAnimationFrame(updateChrome);
  }
  window.addEventListener('scroll', scheduleChrome, { passive: true });
  window.addEventListener('resize', scheduleChrome);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleChrome).observe(document.querySelector('main'));

  // Stationary square pixels: local cursor illumination on important surfaces,
  // a clockwise brightness wave on the single secondary notebook control.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fields = [];
  // All surfaces share one lattice and one peak brightness.
  const settings = { period: 4, size: 2, spacing: 8, intensity: 0.62 };
  let frame = 0;
  let last = 0;
  let elapsed = 0;

  function measure(field) {
    const rect = field.element.getBoundingClientRect();
    const scaleX = field.w ? rect.width / field.w : 1;
    const scaleY = field.h ? rect.height / field.h : 1;
    if (field.w && field.h) {
      field.x *= scaleX; field.tx *= scaleX;
      field.y *= scaleY; field.ty *= scaleY;
    } else {
      field.x = field.tx = rect.width / 2;
      field.y = field.ty = rect.height / 2;
    }
    field.w = rect.width;
    field.h = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.round(rect.width * ratio);
    const height = Math.round(rect.height * ratio);
    if (field.canvas.width !== width || field.canvas.height !== height) {
      field.canvas.width = width;
      field.canvas.height = height;
    }
    field.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    field.ink = getComputedStyle(field.element).getPropertyValue('--pixel-ink').trim() || '#111';
    const boxes = [];
    const walker = document.createTreeWalker(field.element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim() || node.parentElement.closest('canvas, svg, [hidden]')) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      boxes.push(...range.getClientRects());
    }
    field.element.querySelectorAll('svg text, [data-pixel-occluder]').forEach(el => boxes.push(el.getBoundingClientRect()));
    field.textBoxes = boxes.filter(box => box.width && box.height).map(box => ({
      left: box.left - rect.left - 5, right: box.right - rect.left + 5,
      top: box.top - rect.top - 5, bottom: box.bottom - rect.top + 5
    }));
    buildArtShield(field, rect, ratio);
    buildCells(field);
    field.dirty = true;
    schedule();
  }
  // Cache a narrow shield around diagram linework. Pixels can occupy the image
  // background without obscuring labels, outlines, or small device components.
  function buildArtShield(field, rect, ratio) {
    const shapes = field.element.querySelectorAll('svg[data-pixel-art] path, svg[data-pixel-art] rect, svg[data-pixel-art] circle, svg[data-pixel-art] line');
    if (!shapes.length) { field.shield = null; return; }
    const shield = field.shield || document.createElement('canvas');
    shield.width = field.canvas.width;
    shield.height = field.canvas.height;
    const ctx = shield.getContext('2d');
    if (!ctx) return;
    shapes.forEach(shape => {
      const bounds = shape.getBoundingClientRect();
      if (shape.closest('defs, clipPath') || (!bounds.width && !bounds.height)) return;
      const matrix = shape.getScreenCTM();
      if (!matrix) return;
      const style = getComputedStyle(shape);
      if (style.visibility === 'hidden' || style.display === 'none') return;
      const path = new Path2D();
      const n = key => Number(shape.getAttribute(key)) || 0;
      if (shape.tagName === 'path') path.addPath(new Path2D(shape.getAttribute('d') || ''));
      else if (shape.tagName === 'rect') path.rect(n('x'), n('y'), n('width'), n('height'));
      else if (shape.tagName === 'circle') path.arc(n('cx'), n('cy'), n('r'), 0, Math.PI * 2);
      else { path.moveTo(n('x1'), n('y1')); path.lineTo(n('x2'), n('y2')); }
      const scale = Math.hypot(matrix.a, matrix.b) || 1;
      ctx.setTransform(ratio * matrix.a, ratio * matrix.b, ratio * matrix.c, ratio * matrix.d, ratio * (matrix.e - rect.left), ratio * (matrix.f - rect.top));
      ctx.strokeStyle = '#000';
      ctx.fillStyle = '#000';
      ctx.lineWidth = 6 / scale;
      ctx.lineJoin = 'round';
      ctx.stroke(path);
      // Small solid marks remain legible; larger panels still admit texture.
      if (style.fill !== 'none' && bounds.width < 18 && bounds.height < 18) ctx.fill(path);
    });
    field.shield = shield;
  }
  function refreshTextMasks() { fields.forEach(measure); scheduleChrome(); }
  function protectionAt(field, x, y) {
    let protection = 1;
    for (const box of field.textBoxes) {
      const dx = Math.max(box.left - x, 0, x - box.right);
      const dy = Math.max(box.top - y, 0, y - box.bottom);
      protection = Math.min(protection, Math.min(1, Math.hypot(dx, dy) / 14));
    }
    return protection;
  }
  // Geometry and text masking are cached; pointer frames only update brightness.
  function buildCells(field) {
    const { w, h } = field;
    const cells = [];
    for (let y = settings.spacing / 2; y < h; y += settings.spacing) {
      for (let x = settings.spacing / 2; x < w; x += settings.spacing) {
        let mark = 0;
        if (field.mark) {
          // The bracket-and-pixel geometry mirrors favicon.svg's 32px viewBox.
          const size = Math.min(w * 0.96, Math.max(0, h - 64) * 1.12);
          const mx = (x - (w - size) / 2) / size * 32;
          const my = (y - (h - 64 - size) / 2) / size * 32;
          const left = mx >= 7 && mx < 12 && my >= 8 && my < 24 && (mx < 10 || my < 11 || my >= 21);
          const right = mx >= 20 && mx < 25 && my >= 8 && my < 24 && (mx >= 22 || my < 11 || my >= 21);
          const center = mx >= 15 && mx < 18 && my >= 14 && my < 17;
          mark = left || right || center ? 1 : 0;
        }
        cells.push({ x, y, mark, protection: protectionAt(field, x, y), angle: Math.atan2((y - h / 2) / (h / 2), (x - w / 2) / (w / 2)) + Math.PI / 2 });
      }
    }
    field.cells = cells;
  }
  function draw(field) {
    const { ctx, w, h } = field;
    ctx.clearRect(0, 0, w, h);
    if ((!field.mark && !field.rest && field.amount < 0.001) || !w || !h) return;
    ctx.fillStyle = field.ink;
    const phase = reduced.matches ? Math.PI / 4 : elapsed / 1000 / settings.period * Math.PI * 2;
    for (const { x, y, mark, protection, angle } of field.cells) {
      let pulse;
      if (field.mode === 'clockwise') {
        pulse = Math.exp(3 * (Math.cos(angle - phase) - 1));
      } else {
        const distance = Math.hypot(x - field.x, y - field.y);
        const spread = field.small ? 52 : 135;
        pulse = Math.exp(-distance * distance / (2 * spread * spread));
      }
      const selectiveBoost = 1 + 0.06 * pulse * pulse * Math.max(0, (protection - 0.5) * 2);
      const illumination = field.strength * field.amount * (0.012 + settings.intensity * pulse) * selectiveBoost;
      const resting = field.mark ? 0.018 + mark * (0.82 + 0.1 * pulse * field.amount) : field.rest;
      ctx.globalAlpha = Math.max(resting, illumination) * protection;
      ctx.fillRect(Math.round(x - settings.size / 2), Math.round(y - settings.size / 2), settings.size, settings.size);
    }
    ctx.globalAlpha = 1;
    if (field.shield) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(field.shield, 0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    }
  }
  function tick(time) {
    frame = 0;
    const dt = last ? Math.min(time - last, 50) : 16;
    last = time;
    elapsed += dt;
    let running = false;
    for (const field of fields) {
      if (!field.visible) continue;
      const previous = field.amount;
      const active = field.hover || field.focus || field.touch;
      const target = active ? 1 : field.viewGlow || 0;
      field.amount = reduced.matches ? target : field.amount + (target - field.amount) * Math.min(1, dt / 140);
      if (Math.abs(field.amount - target) < 0.002) field.amount = target;
      const distance = Math.hypot(field.tx - field.x, field.ty - field.y);
      const speed = reduced.matches ? 1 : Math.min(1, dt / 65);
      field.x += (field.tx - field.x) * speed;
      field.y += (field.ty - field.y) * speed;
      if (field.dirty || active || previous !== field.amount || distance > 0.15) draw(field);
      field.dirty = false;
      if ((!reduced.matches && active && field.mode === 'clockwise') || Math.abs(field.amount - target) > 0.001 || (distance > 0.15)) running = true;
    }
    if (running && !document.hidden) frame = requestAnimationFrame(tick);
    else last = 0;
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }

  const fieldByElement = new WeakMap();
  const fieldObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const field = fieldByElement.get(entry.target);
      field.visible = entry.isIntersecting;
      field.dirty = true;
      if (!field.visible) { field.hover = false; field.amount = 0; }
    });
    schedule();
  }, { rootMargin: '64px' }) : null;

  document.querySelectorAll('[data-pixels]').forEach(element => {
    const canvas = element.querySelector(':scope > canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const field = { element, canvas, ctx, mode: element.dataset.pixels, mark: element.dataset.pixelMark || null, small: element.classList.contains('button'), strength: Number(element.dataset.pixelStrength) || 1, rest: Number(element.dataset.pixelRest) || 0, viewGlow: 0, hover: false, focus: false, touch: false, amount: 0, x: 0, y: 0, tx: 0, ty: 0, w: 0, h: 0, textBoxes: [], cells: [], dirty: true, visible: true, ink: '#111' };
    const interactionTarget = element.closest('summary') || element;
    fields.push(field);
    fieldByElement.set(element, field);
    fieldObserver?.observe(element);
    function point(event) {
      const rect = element.getBoundingClientRect();
      field.tx = event.clientX - rect.left;
      field.ty = event.clientY - rect.top;
      schedule();
    }
    interactionTarget.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      point(event);
      field.x = field.tx; field.y = field.ty;
      field.hover = true;
      schedule();
    });
    let touchOrigin = null;
    let touchTimer = 0;
    function cancelTouch() {
      clearTimeout(touchTimer);
      touchTimer = 0;
      touchOrigin = null;
      field.touch = false;
      schedule();
    }
    interactionTarget.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') {
        if (touchOrigin && Math.hypot(event.clientX - touchOrigin.x, event.clientY - touchOrigin.y) > 10) cancelTouch();
        return;
      }
      point(event);
    });
    interactionTarget.addEventListener('pointerleave', () => { field.hover = false; schedule(); });
    interactionTarget.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') { point(event); return; }
      cancelTouch();
      if (event.isPrimary === false) return;
      point(event);
      field.x = field.tx; field.y = field.ty;
      touchOrigin = { x: event.clientX, y: event.clientY };
      field.touch = true;
      schedule();
    }, { passive: true });
    interactionTarget.addEventListener('pointerup', event => {
      if (event.pointerType !== 'touch' || !touchOrigin) return;
      touchOrigin = null;
      // Hold a quick tap long enough to paint; vertical scrolling cancels it.
      touchTimer = setTimeout(cancelTouch, reduced.matches ? 100 : 220);
    }, { passive: true });
    interactionTarget.addEventListener('pointercancel', cancelTouch, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelTouch(); });
    interactionTarget.addEventListener('focusin', event => {
      field.focus = event.target.matches(':focus-visible');
      if (field.focus) { field.tx = field.w / 2; field.ty = field.h / 2; }
      schedule();
    });
    interactionTarget.addEventListener('focusout', () => { field.focus = false; schedule(); });
    if ('ResizeObserver' in window) new ResizeObserver(() => measure(field)).observe(element);
    measure(field);
  });
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', refreshTextMasks));
  window.addEventListener('resize', refreshTextMasks);
  document.fonts?.ready.then(refreshTextMasks);
  reduced.addEventListener('change', () => { fields.forEach(field => { field.dirty = true; }); schedule(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    else schedule();
  });

  const projectNotes = [...document.querySelectorAll('[data-hero-note]')];
  const projectButtons = [...document.querySelectorAll('[data-hero-project]')];
  projectButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      projectNotes.forEach(note => {
        note.hidden = note.dataset.heroNote !== button.dataset.heroProject;
      });
      projectButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      refreshTextMasks();
    });
    button.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const next = projectButtons[(index + direction + projectButtons.length) % projectButtons.length];
      next.focus(); next.click();
    });
  });

  // Phones get a small, scroll-driven response on chosen artwork, with no
  // permanent animation loop. The note settles level as it enters the viewport.
  const scrollResponse = matchMedia('(hover: none), (pointer: coarse), (max-width: 700px)');
  const heroNote = document.querySelector('.hero-note');
  let responseFrame = 0;
  function updateScrollResponse() {
    responseFrame = 0;
    const enabled = scrollResponse.matches && !reduced.matches;
    if (heroNote) {
      if (enabled) {
        const progress = Math.max(0, Math.min(1, (innerHeight * 0.9 - heroNote.getBoundingClientRect().top) / (innerHeight * 0.42)));
        heroNote.style.setProperty('--note-angle', `${-1.25 * (1 - progress)}deg`);
      } else heroNote.style.removeProperty('--note-angle');
    }
    fields.forEach(field => {
      if (!field.element.hasAttribute('data-pixel-scroll')) return;
      const rect = field.element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
      field.viewGlow = enabled && rect.bottom > 0 && rect.top < innerHeight ? Math.sin(progress * Math.PI) * 0.38 : 0;
      if (field.viewGlow && !field.hover && !field.touch && !field.focus) {
        field.tx = field.w * (0.25 + progress * 0.5);
        field.ty = field.h * progress;
      }
      field.dirty = true;
    });
    schedule();
  }
  function scheduleScrollResponse() {
    if (!responseFrame) responseFrame = requestAnimationFrame(updateScrollResponse);
  }
  window.addEventListener('scroll', scheduleScrollResponse, { passive: true });
  window.addEventListener('resize', scheduleScrollResponse);
  scrollResponse.addEventListener('change', scheduleScrollResponse);
  reduced.addEventListener('change', scheduleScrollResponse);
  heroNote?.addEventListener('transitionend', refreshTextMasks);
  document.fonts?.ready.then(scheduleScrollResponse);
  scheduleScrollResponse();

  const themeToggle = document.querySelector('.theme-toggle');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let manualTheme = false;
  try { manualTheme = ['dark', 'light'].includes(localStorage.getItem('portfolio-theme')); } catch {}
  function applyTheme(theme, persist = false) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    syncChromeCopies();
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();
    if (persist) {
      manualTheme = true;
      try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch {}
    }
    refreshTextMasks();
    updateChrome();
  }
  themeToggle.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
  systemTheme.addEventListener('change', event => {
    if (!manualTheme) applyTheme(event.matches ? 'dark' : 'light');
  });
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

  // Reveal once on entry. The default document remains fully visible without JS.
  if ('IntersectionObserver' in window && !reduced.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));
    document.documentElement.classList.add('motion-ready');
    document.addEventListener('focusin', event => {
      event.target.closest('[data-reveal]')?.classList.add('is-visible');
    });
  }
  // SVG motion is local to visible diagrams; hidden scenes and offscreen pages
  // do not keep animating. The global reduced-motion rule supplies a still view.
  if ('IntersectionObserver' in window) {
    const diagramObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting));
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-motion]').forEach(diagram => diagramObserver.observe(diagram));
  }
  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('document-hidden', document.hidden);
  });
  function revealLinkedProject() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target?.matches('details.project, details.notebook')) return;
    target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', revealLinkedProject);
  revealLinkedProject();
})();
