const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.getElementById('year');
const contactForm = document.getElementById('contact-form');
const motionCards = document.querySelectorAll('.profile-card, .expertise-card, .skill-card, .project-card, .education-card');

if (year) {
    year.textContent = new Date().getFullYear();
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const fullName = `${formData.get('firstName')} ${formData.get('lastName')}`;
        const subject = encodeURIComponent(formData.get('subject'));
        const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
        window.location.href = `mailto:dubbakapriyanka0521@gmail.com?subject=${subject}&body=${body}`;
    });
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

if (motionCards.length) {
    document.addEventListener('pointermove', (event) => {
        const { innerWidth, innerHeight } = window;
        const offsetX = (event.clientX / innerWidth - 0.5) * 18;
        const offsetY = (event.clientY / innerHeight - 0.5) * 18;

        motionCards.forEach((card, index) => {
            const depth = (index % 3) + 1;
            const translateX = offsetX * depth * 0.7;
            const translateY = offsetY * depth * 0.7;
            const rotateX = offsetY * -0.4;
            const rotateY = offsetX * 0.6;

            card.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = 'transform 0.25s ease-out';
        });
    });

    document.addEventListener('pointerleave', () => {
        motionCards.forEach((card) => {
            card.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
        });
    });
}
