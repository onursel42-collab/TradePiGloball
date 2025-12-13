// Lightweight interactions: mobile nav toggle, category scroller buttons, small accessibility helpers
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      if (!expanded) nav.setAttribute('open', '');
      else nav.removeAttribute('open');
    });
  }

  // category scroller buttons
  const scroller = document.getElementById('categoryScroller');
  const scrollBtns = document.querySelectorAll('.cat-scroll');
  if (scroller && scrollBtns.length) {
    scrollBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.getAttribute('data-dir');
        scroller.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' });
      });
    });
    // keyboard support
    scroller.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') scroller.scrollBy({ left: 160, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -160, behavior: 'smooth' });
    });
  }
});
