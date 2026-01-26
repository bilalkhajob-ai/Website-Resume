// ========================================
// PEARL SCRIPT - Animations et interactions
// ========================================

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll (fade in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments qui doivent s'animer
window.addEventListener('DOMContentLoaded', () => {
    // Animation des cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animation des skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
        observer.observe(card);
    });
});

// Navigation au scroll - changement de background
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(250, 250, 250, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    } else {
        nav.style.background = 'rgba(250, 250, 250, 0.8)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Animation de succès
        const button = contactForm.querySelector('.btn-primary');
        const originalText = button.textContent;

        button.textContent = '✓ Message envoyé !';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Parallax léger sur l'image hero
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        heroImage.style.transform = `translateY(${parallax}px)`;
    });
}

// Animation du curseur sur les project cards
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

console.log('✨ Pearl Portfolio chargé avec succès !');