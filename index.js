// Allianza - Interactivity

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    // 1. Scrolled Navbar Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        // For this simple version, we'll just toggle a class or style
        // In a real PWA, we might want a full overlay
        if (navLinksList.style.display === 'flex') {
            navLinksList.style.display = 'none';
        } else {
            navLinksList.style.display = 'flex';
            navLinksList.style.flexDirection = 'column';
            navLinksList.style.position = 'absolute';
            navLinksList.style.top = '100%';
            navLinksList.style.left = '0';
            navLinksList.style.width = '100%';
            navLinksList.style.background = '#FDFDFD';
            navLinksList.style.padding = '20px';
            navLinksList.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });

    // 3. Smooth Scrolling for Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offset = 80; // Navbar height
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    navLinksList.style.display = 'none';
                }
            }
        });
    });

    // 4. Fade-in on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('section, .expertise-card, .impact-box');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 5. Contact Form Handler (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Verzenden...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Bericht verzonden!';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
