// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Disable scroll-triggered reveal animations: show elements immediately
const showElementsImmediately = () => {
    const elements = document.querySelectorAll('.capability-card, .why-card, .mission-card, .timeline-item, .client-logo-item');
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'none';
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showElementsImmediately);
} else {
    showElementsImmediately();
}

// Scroll progress removed to avoid extra animation work

// Add hover effect to capability cards
const capabilityCards = document.querySelectorAll('.capability-card');
capabilityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn, .quick-action');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
        }
    });
}

// Ensure body is visible immediately (remove slow load fade)
if (document.body) document.body.style.opacity = '1';

// Stats counter animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasSymbol = text.includes('±');
                const number = parseInt(text.replace(/[^\d]/g, ''));
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        
                        let displayValue = Math.floor(current);
                        if (hasPlus) displayValue += '+';
                        if (hasSymbol) displayValue = '±' + displayValue + 'µm';
                        
                        target.textContent = displayValue;
                    }, 30);
                }
                
                statsObserver.unobserve(target);
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });
    
    stats.forEach(stat => statsObserver.observe(stat));
};

// Show stats immediately without counting animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(s => {
        // keep original text (already present in HTML) and ensure visible
        s.style.opacity = '1';
        s.style.transition = 'none';
    });
};

animateStats();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Add performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
                console.warn(`Long task detected: ${entry.name} (${Math.round(entry.duration)}ms)`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['measure', 'longtask'] });
}

console.log('%c🏭 Shan Enterprises Website', 'font-size: 20px; font-weight: bold; color: #003B7A;');
console.log('%cDelivering Thermal & Mechanical Precision Since 1994', 'font-size: 14px; color: #4A5568;');