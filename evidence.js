(() => {
  const links = [...document.querySelectorAll('[data-image-viewer]')];
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;

  const viewer = document.createElement('dialog');
  viewer.className = 'media-viewer';
  viewer.setAttribute('aria-labelledby', 'media-viewer-title');
  viewer.innerHTML = `<div class="media-viewer-bar">
    <h2 id="media-viewer-title"></h2>
    <div class="media-viewer-actions">
      <button type="button" data-zoom aria-pressed="false">Zoom in</button>
      <button type="button" data-close autofocus>Close</button>
    </div>
  </div><div class="media-viewer-stage" tabindex="0" role="region" aria-label="Image preview; scroll to explore when zoomed"><img alt=""></div>`;
  document.body.append(viewer);
  const image = viewer.querySelector('img');
  const title = viewer.querySelector('h2');
  const stage = viewer.querySelector('.media-viewer-stage');
  const zoom = viewer.querySelector('[data-zoom]');
  let opener;

  function resetZoom() {
    stage.classList.remove('is-zoomed');
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = 'Zoom in';
    stage.scrollTo(0, 0);
  }
  links.forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    title.textContent = link.dataset.imageTitle;
    resetZoom();
    viewer.showModal();
    document.body.classList.add('media-open');
  }));
  zoom.addEventListener('click', () => {
    const enlarged = stage.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.textContent = enlarged ? 'Fit image' : 'Zoom in';
    stage.scrollTo(0, 0);
  });
  viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('media-open');
    opener?.focus({ preventScroll: true });
    image.removeAttribute('src');
  });
})();
