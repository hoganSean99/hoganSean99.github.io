// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Get DOM elements
const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
let lastScroll = 0;

// Mobile menu functionality
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
}

// Mobile menu toggle
navToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling up
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.nav-toggle')) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        closeMobileMenu();
        // Smooth scroll
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero.getBoundingClientRect().bottom > 0) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }
});

// Intersection Observer for fade-in animations
const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.delay}s`;
            }
        }
    });
}, fadeObserverOptions);

// Observe all sections and service cards
document.querySelectorAll('section, .service-card').forEach((el, index) => {
    if (el.classList.contains('service-card')) {
        el.dataset.delay = index * 0.2;
    }
    observer.observe(el);
});

// Enhanced hover effects for service cards
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Form validation and animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = 'var(--primary-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// Add subtle parallax to floating images
const floatingImages = document.querySelectorAll('.floating-image');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingImages.forEach((img, index) => {
        const speed = (index + 1) * 0.05;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        img.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        width: 20px;
        height: 20px;
        background: rgba(125, 139, 116, 0.2);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.4s, height 0.3s;
    }
    
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-content h1 span {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.3s ease forwards;
    }
    
    .hero-content h1 span:nth-child(1) {
        animation-delay: 0.1s;
    }
    
    .hero-content h1 span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .japanese-text {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.3s ease forwards;
        animation-delay: 0.25s;
    }
    
    .hero-description {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.3s ease forwards;
        animation-delay: 0.3s;
    }
    
    .hero-cta {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.3s ease forwards;
        animation-delay: 0.4s;
    }
    
    .social-links {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.3s ease forwards;
        animation-delay: 0.5s;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    header.scroll-down {
        transform: translateY(-100%);
    }
    
    header.scroll-up {
        transform: translateY(0);
    }
    
    header {
        transition: transform 0.3s ease-in-out;
    }
`;

document.head.appendChild(style); 