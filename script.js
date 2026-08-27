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

const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const contactClose = document.getElementById("contactClose");

contactBtn.addEventListener("click", () => {
  contactModal.classList.add("open");
});

contactClose.addEventListener("click", () => {
  contactModal.classList.remove("open");
});

contactModal.addEventListener("click", (event) => {
  if (event.target === contactModal) {
    contactModal.classList.remove("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    contactModal.classList.remove("open");
  }
});
