// Enhanced Mobile Responsive JavaScript

// Viewport height fix for mobile browsers (iOS Safari fix)
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initial call and event listeners
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
});

// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        } else {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });
}

// Touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');

    // Add touch feedback for buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .badge, .download-btn').forEach(button => {
        button.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('touchend', function () {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Responsive breakpoint detection
function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width < 480) return 'mobile';
    if (width < 768) return 'mobile-large';
    if (width < 1024) return 'tablet';
    if (width < 1200) return 'desktop';
    return 'desktop-large';
}

// Update breakpoint data attribute
function updateBreakpoint() {
    const breakpoint = getCurrentBreakpoint();
    document.documentElement.setAttribute('data-breakpoint', breakpoint);
}

updateBreakpoint();
window.addEventListener('resize', updateBreakpoint);

// Enhanced smooth scrolling with mobile optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile-optimized navbar scroll behavior
let lastScrollY = window.pageYOffset;
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    const currentScrollY = window.pageYOffset;
    const breakpoint = getCurrentBreakpoint();

    if (breakpoint === 'mobile' || breakpoint === 'mobile-large') {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    // Change navbar background on scroll
    if (currentScrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
}

// Throttled scroll handler for better performance
let ticking = false;
function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleNavbarScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Mobile-optimized intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .ai-card, .section-header');

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Mobile-specific optimizations
function initMobileOptimizations() {
    const breakpoint = getCurrentBreakpoint();

    if (breakpoint === 'mobile' || breakpoint === 'mobile-large') {
        // Disable hover effects on mobile
        document.body.classList.add('mobile-device');

        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });

        // Add touch-friendly spacing
        const buttons = document.querySelectorAll('button, a, .badge');
        buttons.forEach(button => {
            if (button.offsetHeight < 44) {
                button.style.minHeight = '44px';
            }
        });
    }
}

// Run mobile optimizations
initMobileOptimizations();
window.addEventListener('resize', initMobileOptimizations);

// Mobile Navigation Toggle
const hamburgerOriginal = document.querySelector('.hamburger');
const navMenuOriginal = document.querySelector('.nav-menu');

hamburgerOriginal.addEventListener('click', () => {
    hamburgerOriginal.classList.toggle('active');
    navMenuOriginal.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerOriginal.classList.remove('active');
        navMenuOriginal.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbarOriginal = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbarOriginal.style.background = 'rgba(255, 255, 255, 0.98)';
        navbarOriginal.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbarOriginal.style.background = 'rgba(255, 255, 255, 0.95)';
        navbarOriginal.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptionsOriginal = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerOriginal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptionsOriginal);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimateOriginal = document.querySelectorAll('.feature-card, .step, .ai-card, .section-header');

    elementsToAnimateOriginal.forEach(el => {
        el.classList.add('fade-in');
        observerOriginal.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form validation and submission
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading states to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.classList.contains('loading')) return;

        this.classList.add('loading');
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Download button interactions
document.querySelectorAll('.download-btn, .badge').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Create ripple effect
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

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Simulate app store redirect
        setTimeout(() => {
            if (this.classList.contains('google-play-btn') || this.classList.contains('google-play')) {
                alert('Redirecting to Google Play Store...\n(This would normally open the actual app store)');
            } else if (this.classList.contains('app-store-btn') || this.classList.contains('app-store')) {
                alert('Redirecting to Apple App Store...\n(This would normally open the actual app store)');
            }
        }, 300);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
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

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize animations when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburgerOriginal.classList.remove('active');
        navMenuOriginal.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn').forEach(button => {
    button.addEventListener('focus', function () {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });

    button.addEventListener('blur', function () {
        this.style.outline = 'none';
    });
});

console.log('🏥 Clinic website loaded successfully!');
console.log('📱 Mobile apps available on Google Play and App Store');

// Enhanced Responsive Functionality

// Viewport height fix for mobile browsers
function setViewportHeightOriginal() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Update on resize and orientation change
window.addEventListener('resize', debounce(setViewportHeightOriginal, 250));
window.addEventListener('orientationchange', setViewportHeightOriginal);
setViewportHeightOriginal();

// Touch device detection and optimization
function detectTouchDeviceOriginal() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        document.body.classList.add('touch-device');

        // Optimize touch interactions
        document.querySelectorAll('.feature-card, .ai-card').forEach(card => {
            card.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function () {
                this.style.transform = '';
            });
        });
    }
}

// Device orientation handling
function handleOrientationChangeOriginal() {
    const orientation = window.screen?.orientation?.angle || window.orientation || 0;
    document.body.classList.toggle('landscape', Math.abs(orientation) === 90);

    // Adjust hero section for landscape mobile
    if (window.innerHeight < 500 && Math.abs(orientation) === 90) {
        document.querySelector('.hero').style.minHeight = 'auto';
        document.querySelector('.hero').style.padding = '2rem 0';
    } else {
        document.querySelector('.hero').style.minHeight = '100vh';
        document.querySelector('.hero').style.padding = '';
    }
}

window.addEventListener('orientationchange', debounce(handleOrientationChangeOriginal, 100));
handleOrientationChangeOriginal();

// Responsive navigation improvements
function enhanceNavigationOriginal() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent body scroll when menu is open
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isActive = navMenu.classList.contains('active');
                document.body.style.overflow = isActive ? 'hidden' : '';
            }
        });
    });

    observer.observe(navMenu, { attributes: true });
}

// Responsive image loading
function setupResponsiveImagesOriginal() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Add loading attribute for better performance
        img.loading = 'lazy';

        // Handle image load errors
        img.addEventListener('error', function () {
            this.src = '/placeholder.svg?height=200&width=200&text=Image+Not+Found';
            this.alt = 'Image not available';
        });
    });
}

// Responsive font size adjustment
function adjustFontSizesOriginal() {
    const screenWidth = window.innerWidth;
    const root = document.documentElement;

    if (screenWidth < 320) {
        root.style.fontSize = '14px';
    } else if (screenWidth < 480) {
        root.style.fontSize = '15px';
    } else if (screenWidth < 768) {
        root.style.fontSize = '16px';
    } else {
        root.style.fontSize = '16px';
    }
}

// Performance monitoring for mobile devices
function monitorPerformanceOriginal() {
    if ('connection' in navigator) {
        const connection = navigator.connection;

        // Reduce animations on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('reduced-motion');

            // Disable heavy animations
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    transition-duration: 0.01ms !important;
                }
                .reduced-motion .floating-card,
                .reduced-motion .phone-mockup {
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Responsive video/media handling
function setupResponsiveMediaOriginal() {
    const mediaElements = document.querySelectorAll('video, iframe');

    mediaElements.forEach(media => {
        // Pause videos when not in viewport on mobile
        if (window.innerWidth < 768) {
            const mediaObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.target.tagName === 'VIDEO') {
                        if (entry.isIntersecting) {
                            entry.target.play?.();
                        } else {
                            entry.target.pause?.();
                        }
                    }
                });
            });

            mediaObserver.observe(media);
        }
    });
}

// Enhanced scroll behavior for mobile
function enhanceScrollBehaviorOriginal() {
    let ticking = false;

    function updateScrollBehavior() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Hide/show navigation on scroll (mobile)
        if (window.innerWidth < 768) {
            const navbar = document.querySelector('.navbar');
            const scrollDirection = scrollY > (window.lastScrollY || 0) ? 'down' : 'up';

            if (scrollDirection === 'down' && scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            window.lastScrollY = scrollY;
        }

        // Update scroll progress
        const scrollProgress = (scrollY / (documentHeight - windowHeight)) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollBehavior);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Responsive form handling
function enhanceFormExperienceOriginal() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Add mobile-friendly input attributes
            if (input.type === 'email') {
                input.setAttribute('autocomplete', 'email');
                input.setAttribute('inputmode', 'email');
            }

            if (input.type === 'tel') {
                input.setAttribute('autocomplete', 'tel');
                input.setAttribute('inputmode', 'tel');
            }

            // Improve mobile keyboard experience
            input.addEventListener('focus', function () {
                if (window.innerWidth < 768) {
                    // Scroll input into view on mobile
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            });
        });
    });
}

// Initialize responsive enhancements
function initResponsiveEnhancementsOriginal() {
    detectTouchDeviceOriginal();
    enhanceNavigationOriginal();
    setupResponsiveImagesOriginal();
    adjustFontSizesOriginal();
    monitorPerformanceOriginal();
    setupResponsiveMediaOriginal();
    enhanceScrollBehaviorOriginal();
    enhanceFormExperienceOriginal();

    // Re-run on resize
    window.addEventListener('resize', debounce(() => {
        adjustFontSizesOriginal();
        handleOrientationChangeOriginal();
    }, 250));
}

// Responsive breakpoint detection
function getBreakpointOriginal() {
    const width = window.innerWidth;

    if (width < 321) return 'xs';
    if (width < 481) return 'sm';
    if (width < 769) return 'md';
    if (width < 1025) return 'lg';
    if (width < 1201) return 'xl';
    return 'xxl';
}

// Update CSS custom property with current breakpoint
function updateBreakpointOriginal() {
    const breakpoint = getBreakpointOriginal();
    document.documentElement.setAttribute('data-breakpoint', breakpoint);
    document.documentElement.style.setProperty('--current-breakpoint', `"${breakpoint}"`);
}

window.addEventListener('resize', debounce(updateBreakpointOriginal, 100));
updateBreakpointOriginal();

// Accessibility improvements for mobile
function enhanceAccessibilityOriginal() {
    // Improve focus management on mobile
    document.addEventListener('focusin', (e) => {
        if (window.innerWidth < 768) {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('.hero') || document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize all responsive features
document.addEventListener('DOMContentLoaded', () => {
    initResponsiveEnhancementsOriginal();
    enhanceAccessibilityOriginal();
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('🏥 Clinic website - Fully responsive version loaded!');
console.log(`📱 Current breakpoint: ${getBreakpoint()}`);
console.log('✅ All responsive features initialized');
