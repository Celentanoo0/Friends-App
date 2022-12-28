const menuBtn = document.querySelector('.menu__icon');
const pageFilters = document.querySelector('.menu__body');

menuBtn.addEventListener('click', () => {
    pageFilters.classList.toggle('show');
    document.body.classList.toggle('_lock');
    menuBtn.classList.toggle('_active')
})