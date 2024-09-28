document.addEventListener("DOMContentLoaded", function () {
    const smoothScroll = (event) => {
        if (event.target.tagName.toLowerCase() !== 'a' || !event.target.getAttribute("href").startsWith("#")) {
            return;
        }
        event.preventDefault();
        const targetId = event.target.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    document.body.addEventListener('click', smoothScroll);

    const typewriter = () => {
        const element = document.querySelector('.typewriter span');
        if (!element) return;
        const fullText = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';
        let index = 0;
        const typingSpeed = 100;
        const typing = () => {
            if (index < fullText.length) {
                element.textContent += fullText.charAt(index);
                index++;
                setTimeout(typing, typingSpeed);
            }
        };
        typing();
    };

    typewriter();

    const navbar = document.querySelector('.navbar');
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = `<span></span><span></span><span></span>`;
    navbar.appendChild(navToggle);
    const navLinks = navbar.querySelector('ul');

    const toggleNav = () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    };

    navToggle.addEventListener('click', toggleNav);
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    const handleResize = () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    };

    window.addEventListener('resize', handleResize);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'No Subject'; 
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }

            const mailtoLink = `mailto:musfirahkorai@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
            contactForm.reset();
        });
    }
});

const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

window.addEventListener('resize', debounce(handleResize, 200));

// script.js
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the active class on nav links
});
