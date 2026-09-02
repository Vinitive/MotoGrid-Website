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
// Motogrid Hosting Announcement

const hostingAnnouncement = document.getElementById('hostingAnnouncement');
const hostingAnnouncementClose = document.getElementById('hostingAnnouncementClose');
const hostingEnterButton = document.getElementById('hostingEnterButton');

function closeHostingAnnouncement() {
    if (!hostingAnnouncement) return;

    hostingAnnouncement.classList.add('is-closing');

    setTimeout(() => {
        hostingAnnouncement.style.display = 'none';
    }, 350);
}

if (hostingAnnouncementClose) {
    hostingAnnouncementClose.addEventListener(
        'click',
        closeHostingAnnouncement
    );
}

if (hostingEnterButton) {
    hostingEnterButton.addEventListener(
        'click',
        closeHostingAnnouncement
    );
}