(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const forcedColors = matchMedia('(forced-colors: active)');
  const svgNS = 'http://www.w3.org/2000/svg';
  const follow = (value, target, dt, response) => target + (value - target) * Math.exp(-dt / response);
  const near = (a, b) => Math.abs(a - b) < 0.15;
  const svgNode = name => document.createElementNS(svgNS, name);

  // A square leading edge and one continuous, tapering tail replace the beads.
  const rail = document.querySelector('.page-index');
  const runner = rail.querySelector('.index-runner');
  const ribbon = rail.querySelector('.index-trail path');
  const gradient = rail.querySelector('.index-trail linearGradient');
  let railFrame = 0;
  let railLast = 0;
  let railHead = Number(runner.dataset.position) || 0;
  let railTail = railHead;
  let railTarget = railHead;

  function paintRail() {
    runner.style.transform = `translate3d(0,${railHead - 3.5}px,0)`;
    const distance = Math.abs(railHead - railTail);
    const x = rail.clientWidth - 3.5;
    const middle = (railHead + railTail) / 2;
    ribbon.setAttribute('d', `M${x - 3.5},${railHead} C${x - 3.5},${middle} ${x - 1},${railTail} ${x},${railTail} C${x + 1},${railTail} ${x + 3.5},${middle} ${x + 3.5},${railHead}Z`);
    ribbon.style.opacity = String(Math.min(1, distance / 5));
    gradient.setAttribute('y1', String(railHead));
    gradient.setAttribute('y2', String(railTail));
  }

  function stepRail(time) {
    railFrame = 0;
    const dt = railLast ? Math.min(40, time - railLast) : 16;
    railLast = time;
    railHead = follow(railHead, railTarget, dt, 42);
    railTail = follow(railTail, railHead, dt, 110);
    railTail = Math.max(railHead - 76, Math.min(railHead + 76, railTail));
    const moving = !near(railHead, railTarget) || !near(railTail, railTarget);
    if (!moving) { railHead = railTarget; railTail = railTarget; railLast = 0; }
    paintRail();
    if (moving && !document.hidden) railFrame = requestAnimationFrame(stepRail);
  }

  function updateRail(snap = false) {
    railTarget = Number(runner.dataset.position) || 0;
    const enabled = !reduced.matches && !forcedColors.matches && rail.getClientRects().length > 0;
    root.classList.toggle('index-trail-ready', enabled);
    if (!enabled || snap) {
      cancelAnimationFrame(railFrame);
      railFrame = 0; railLast = 0;
      railHead = railTail = railTarget;
      paintRail();
    } else if (!railFrame) {
      railLast = 0;
      railFrame = requestAnimationFrame(stepRail);
    }
  }
  new MutationObserver(() => updateRail()).observe(runner, { attributes: true, attributeFilter: ['data-position'] });
  window.addEventListener('resize', () => updateRail(true), { passive: true });
  reduced.addEventListener('change', () => updateRail(true));
  forcedColors.addEventListener('change', () => updateRail(true));
  updateRail(true);

  // Selection remains owned by the browser. This layer only paints its text rects.
  // Difference blending inverts both text and background, including during motion.
  if (!CSS.supports('mix-blend-mode', 'difference') || !window.getSelection) return;
  const main = document.querySelector('main');
  const overlay = svgNode('svg');
  overlay.classList.add('selection-trail');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('focusable', 'false');
  document.body.append(overlay);
  let rows = [];
  let selectionFrame = 0;
  let selectionLast = 0;
  let selectionDirty = false;
  let selectionSnap = false;
  let allowed = false;
  let selecting = false;
  let backwards = false;

  function clearSelectionPaint() {
    cancelAnimationFrame(selectionFrame);
    selectionFrame = 0; selectionLast = 0;
    selectionDirty = false; selectionSnap = false;
    rows = [];
    overlay.replaceChildren();
    root.classList.remove('selection-trail-active');
  }

  function readSelection() {
    const selection = getSelection();
    if (!allowed || reduced.matches || forcedColors.matches || !selection || selection.isCollapsed || selection.rangeCount !== 1 ||
        !main.contains(selection.anchorNode) || !main.contains(selection.focusNode)) return null;
    const range = selection.getRangeAt(0);
    backwards = selection.anchorNode === range.endContainer && selection.anchorOffset === range.endOffset;
    const ancestor = range.commonAncestorContainer;
    const scope = ancestor.nodeType === Node.TEXT_NODE ? ancestor.parentElement : ancestor;
    if (scope.closest?.('input,textarea,[contenteditable="true"]')) return null;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const fragments = [];
    const header = document.querySelector('.site-header[data-adaptive]');
    const headerBottom = header.getBoundingClientRect().bottom;
    const navigation = header.querySelector('nav');
    const selectionBottom = getComputedStyle(navigation).position === 'fixed' ? navigation.getBoundingClientRect().top : innerHeight;
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim() || node.parentElement.closest('svg,canvas,[aria-hidden="true"],input,textarea,[contenteditable="true"]') || !range.intersectsNode(node)) continue;
      const part = document.createRange();
      part.selectNodeContents(node);
      if (node === range.startContainer) part.setStart(node, range.startOffset);
      if (node === range.endContainer) part.setEnd(node, range.endOffset);
      for (const rect of part.getClientRects()) {
        if (rect.width < 0.1 || rect.height < 1 || rect.bottom <= headerBottom || rect.top >= selectionBottom || rect.right <= 0 || rect.left >= innerWidth) continue;
        fragments.push({ left: Math.max(0, rect.left), right: Math.min(innerWidth, rect.right), top: Math.max(headerBottom, rect.top), bottom: Math.min(selectionBottom, rect.bottom) });
        if (fragments.length > 160) return null;
      }
    }
    const lines = [];
    fragments.sort((a, b) => a.top - b.top || a.left - b.left);
    fragments.forEach(rect => {
      const line = lines.find(line => Math.min(line.bottom, rect.bottom) - Math.max(line.top, rect.top) > Math.min(line.bottom - line.top, rect.bottom - rect.top) * 0.55 && rect.left <= line.right + 3 && rect.right >= line.left - 3);
      if (line) {
        line.left = Math.min(line.left, rect.left); line.right = Math.max(line.right, rect.right);
        line.top = Math.min(line.top, rect.top); line.bottom = Math.max(line.bottom, rect.bottom);
      } else lines.push({ ...rect });
    });
    return lines;
  }

  function measureSelection() {
    const lines = readSelection();
    if (!lines?.length) { clearSelectionPaint(); return; }
    const old = rows.filter(row => !row.retiring);
    const used = new Set();
    const next = lines.map(target => {
      const row = old.find(row => !used.has(row) && Math.min(row.target.bottom, target.bottom) - Math.max(row.target.top, target.top) > Math.min(row.target.bottom - row.target.top, target.bottom - target.top) * 0.5 && target.left <= row.target.right + 3 && target.right >= row.target.left - 3);
      if (row) { used.add(row); row.target = target; return row; }
      const edge = backwards ? target.right : target.left;
      const path = svgNode('path');
      overlay.append(path);
      return { path, target, left: edge, leftTail: edge, right: edge, rightTail: edge, top: target.top, bottom: target.bottom, retiring: false };
    });
    rows.forEach(row => {
      if (used.has(row)) return;
      if (!row.retiring) {
        const edge = backwards ? row.target.right : row.target.left;
        row.target = { ...row.target, left: edge, right: edge };
        row.retiring = true;
      }
      next.push(row);
    });
    rows = next;
    if (selectionSnap) rows.forEach(row => {
      row.left = row.leftTail = row.target.left;
      row.right = row.rightTail = row.target.right;
      row.top = row.target.top; row.bottom = row.target.bottom;
    });
    selectionSnap = false;
    root.classList.add('selection-trail-active');
  }

  function stepSelection(time) {
    selectionFrame = 0;
    const dt = selectionLast ? Math.min(40, time - selectionLast) : 16;
    selectionLast = time;
    if (selectionDirty) { selectionDirty = false; measureSelection(); }
    if (!root.classList.contains('selection-trail-active')) return;
    let moving = false;
    rows = rows.filter(row => {
      const target = row.target;
      row.left = follow(row.left, target.left, dt, 35);
      row.right = follow(row.right, target.right, dt, 35);
      row.leftTail = follow(row.leftTail, row.left, dt, 85);
      row.rightTail = follow(row.rightTail, row.right, dt, 85);
      row.top = follow(row.top, target.top, dt, 35);
      row.bottom = follow(row.bottom, target.bottom, dt, 35);
      row.leftTail = Math.max(row.left - 64, Math.min(row.left + 64, row.leftTail));
      row.rightTail = Math.max(row.right - 64, Math.min(row.right + 64, row.rightTail));
      const settling = !near(row.left, target.left) || !near(row.leftTail, target.left) || !near(row.right, target.right) || !near(row.rightTail, target.right) || !near(row.top, target.top) || !near(row.bottom, target.bottom);
      if (!settling) {
        row.left = row.leftTail = target.left; row.right = row.rightTail = target.right;
        row.top = target.top; row.bottom = target.bottom;
      }
      if (row.retiring && !settling) { row.path.remove(); return false; }
      const mid = (row.top + row.bottom) / 2;
      row.path.setAttribute('d', `M${row.left},${row.top}H${row.right}C${row.right},${mid} ${row.rightTail},${mid} ${row.rightTail},${row.bottom}H${row.leftTail}C${row.leftTail},${mid} ${row.left},${mid} ${row.left},${row.top}Z`);
      moving ||= settling;
      return true;
    });
    if (moving && !document.hidden) selectionFrame = requestAnimationFrame(stepSelection);
    else selectionLast = 0;
  }

  function queueSelection(snap = false) {
    if (!allowed) return;
    selectionDirty = true;
    selectionSnap ||= snap;
    if (!selectionFrame) { selectionLast = 0; selectionFrame = requestAnimationFrame(stepSelection); }
  }
  document.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    allowed = event.pointerType !== 'touch' && !reduced.matches && !forcedColors.matches && main.contains(event.target) && !event.target.closest('input,textarea,[contenteditable="true"]');
    selecting = allowed;
    clearSelectionPaint();
  }, { passive: true });
  document.addEventListener('selectionchange', () => queueSelection());
  document.addEventListener('pointerup', () => {
    if (selecting && getSelection()?.isCollapsed) { allowed = false; clearSelectionPaint(); }
    else if (selecting) queueSelection();
    selecting = false;
  }, { passive: true });
  document.addEventListener('pointercancel', () => { selecting = false; allowed = false; clearSelectionPaint(); });
  document.addEventListener('keydown', event => {
    if (['Control', 'Meta', 'Shift', 'Alt'].includes(event.key) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c')) return;
    allowed = false; selecting = false; clearSelectionPaint();
  });
  window.addEventListener('scroll', () => queueSelection(true), { passive: true });
  window.addEventListener('resize', () => queueSelection(true), { passive: true });
  window.addEventListener('blur', () => { allowed = false; clearSelectionPaint(); });
  reduced.addEventListener('change', () => { allowed = false; clearSelectionPaint(); });
  forcedColors.addEventListener('change', () => { allowed = false; clearSelectionPaint(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { updateRail(true); allowed = false; clearSelectionPaint(); }
  });
})();
