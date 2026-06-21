// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navMenu) navMenu.style.display = 'none';
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(102, 126, 234, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    }
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:gargigautam870@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// Add parallax effect
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
    }
});

// Typewriter effect for titles (optional animation)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--light-text)';
        }
    });
});

// Cursor glow effect (optional - advanced)
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102,126,234,0.3) 0%, rgba(102,126,234,0) 70%);
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
`;

document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 10) + 'px';
    cursorGlow.style.top = (e.clientY - 10) + 'px';
});

// Hide cursor glow when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});

// Smooth scroll restoration
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

// Load animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
    }
});

// Prevent FOUC (Flash of Unstyled Content)
if (document.readyState === 'loading') {
    document.body.style.opacity = '0';
} else {
    document.body.style.opacity = '1';
}

// Add console message
console.log('%cWelcome to my portfolio! 👋', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore and get in touch!', 'color: #f093fb; font-size: 14px;');
console.log('%cGargi Gautam - Full Stack Developer', 'color: #00d4ff; font-size: 12px;');
