const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('[data-category]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    cards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      card.style.display = (filter === 'all' || categories.includes(filter)) ? '' : 'none';
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactBtns = document.querySelectorAll('.open-contact');
const contactModal = document.getElementById('contactModal');
const contactClose = document.getElementById('contactClose');

contactBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden', 'false');
  });
});

contactClose.addEventListener('click', () => {
  contactModal.classList.remove('open');
  contactModal.setAttribute('aria-hidden', 'true');
});

contactModal.addEventListener('click', (event) => {
  if (event.target === contactModal) {
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
  }
});

// Align hero image height with H1 and align aside 'strong' with the lead paragraph
function alignHeroElements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const h1 = hero.querySelector('h1');
  const lead = hero.querySelector('.lead');
  const aside = hero.querySelector('.hero-aside');
  const strong = aside ? aside.querySelector('strong') : null;
  const imgBox = aside ? aside.querySelector('.hero-image-small') : null;

  if (h1 && imgBox) {
    // Match image container height to the rendered h1 height
    const h1Height = h1.getBoundingClientRect().height;
    imgBox.style.height = Math.round(h1Height) + 'px';
  }

  if (hero && lead && aside && strong) {
    // Compute top offsets relative to the hero container
    const heroRect = hero.getBoundingClientRect();
    const leadRect = lead.getBoundingClientRect();
    const strongRect = strong.getBoundingClientRect();

    const leadTopRel = leadRect.top - heroRect.top;
    const strongTopRel = strongRect.top - heroRect.top;

    // Adjust aside padding-top so strong lines up with lead
    const delta = leadTopRel - strongTopRel;
    // Only apply if delta is a finite number
    if (Number.isFinite(delta)) {
      // Keep existing padding but add delta (can be negative)
      const currentPad = parseFloat(getComputedStyle(aside).paddingTop) || 0;
      aside.style.paddingTop = Math.max(0, currentPad + delta) + 'px';
    }
  }
}

window.addEventListener('load', alignHeroElements);
window.addEventListener('resize', () => {
  // reset aside padding before recalculating to avoid accumulation
  const aside = document.querySelector('.hero-aside');
  if (aside) aside.style.paddingTop = '';
  const imgBox = document.querySelector('.hero-image-small');
  if (imgBox) imgBox.style.height = '';
  alignHeroElements();
});
