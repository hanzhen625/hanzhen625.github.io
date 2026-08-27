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
