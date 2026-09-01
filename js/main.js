const mobileMenuButton = document.getElementById('mobileMenuButton');
const mainNav = document.getElementById('mainNav');

if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

const currentYear = document.getElementById('currentYear');

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}