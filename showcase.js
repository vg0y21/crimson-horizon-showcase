'use strict';
// Gallery interaction only. This file contains no template product code.
const dialog = document.getElementById('preview-dialog');
const image = document.getElementById('full-preview');
const title = document.getElementById('preview-title');
let opener;
document.querySelectorAll('[data-preview]').forEach(button => {
  button.addEventListener('click', () => {
    const source = button.dataset.preview;
    if (!source || !source.startsWith('assets/preview-')) return;
    if (typeof dialog.showModal !== 'function') { window.open(source, '_blank', 'noopener'); return; }
    opener = button;
    image.src = source;
    image.alt = `الصورة الكاملة لقالب Crimson Horizon: ${button.dataset.caption}`;
    title.textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('.dialog-scroll').scrollTop = 0;
  });
});
document.getElementById('close-preview').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (opener) opener.focus();
});
