// Video functionality
let videoPlaying = true;
let videoMuted = false;
const introVideo = document.getElementById('introVideo');
const videoPlayIcon = document.getElementById('video-play-icon');
const videoMuteIcon = document.getElementById('video-mute-icon');

function toggleVideo() {
    if (videoPlaying) {
        introVideo.pause();
        videoPlayIcon.className = 'fas fa-play';
        videoPlaying = false;
    } else {
        introVideo.play();
        videoPlayIcon.className = 'fas fa-pause';
        videoPlaying = true;
    }
}

function toggleMute() {
    if (videoMuted) {
        introVideo.muted = false;
        videoMuteIcon.className = 'fas fa-volume-up';
        videoMuted = false;
    } else {
        introVideo.muted = true;
        videoMuteIcon.className = 'fas fa-volume-mute';
        videoMuted = true;
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Video loading and error handling
if (introVideo) {
    introVideo.addEventListener('loadeddata', () => {
        console.log('🎥 Video loaded successfully');
        // Force autoplay with sound
        introVideo.muted = false;
        introVideo.volume = 1.0;
        videoMuted = false;
        videoMuteIcon.className = 'fas fa-volume-up';

        // Aggressive autoplay attempt
        const forceAutoplay = () => {
            introVideo.play().then(() => {
                console.log('🎵 Video autoplay successful on load!');
                videoPlaying = true;
                videoPlayIcon.className = 'fas fa-pause';
            }).catch(e => {
                console.log('Autoplay failed on load:', e);
                // Try again after a short delay
                setTimeout(() => {
                    introVideo.play().catch(e2 => {
                        console.log('Retry autoplay failed:', e2);
                    });
                }, 100);
            });
        };

        forceAutoplay();
    });

    introVideo.addEventListener('error', () => {
        console.error('❌ Video failed to load');
        // Fallback to static background
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    });

    // Pause video when not in viewport for performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (videoPlaying) introVideo.play();
            } else {
                introVideo.pause();
            }
        });
    }, { threshold: 0.1 });

    videoObserver.observe(introVideo);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Account for fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scrollToSection function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .ai-card, .section-header, .video-content');

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Initialize video controls
    if (introVideo) {
        // Force video to start unmuted
        introVideo.muted = false;
        videoMuted = false;
        videoMuteIcon.className = 'fas fa-volume-up';

        // Set volume to maximum
        introVideo.volume = 1.0;

        // Force autoplay with sound
        const playVideoWithSound = async () => {
            try {
                // Try multiple approaches to autoplay with sound
                introVideo.muted = false;
                introVideo.volume = 1.0;

                // Method 1: Direct play
                await introVideo.play();
                console.log('🎵 Video autoplay with sound successful!');

            } catch (error) {
                console.log('Autoplay blocked, trying alternative methods:', error);

                // Method 2: Try with user gesture simulation
                try {
                    // Simulate user interaction
                    const playPromise = introVideo.play();
                    if (playPromise !== undefined) {
                        await playPromise;
                        console.log('🎵 Video started with alternative method!');
                    }
                } catch (error2) {
                    console.log('All autoplay methods failed:', error2);
                    // Show play button as fallback
                    videoPlayIcon.className = 'fas fa-play';
                    videoPlaying = false;
                }
            }
        };

            // Execute autoplay
    playVideoWithSound();
    
    // Additional autoplay attempts on different events
    introVideo.addEventListener('canplay', () => {
        if (!videoPlaying) {
            introVideo.play().catch(e => console.log('Canplay autoplay failed:', e));
        }
    });
    
    introVideo.addEventListener('canplaythrough', () => {
        if (!videoPlaying) {
            introVideo.play().catch(e => console.log('Canplaythrough autoplay failed:', e));
        }
    });
}
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
document.querySelectorAll('.btn-primary, .btn-secondary, .video-btn').forEach(button => {
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
    
    .loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .video-btn {
        position: relative;
        overflow: hidden;
    }
    
    .video-btn.loading {
        pointer-events: none;
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
    transform: scale(1);
    backdrop-filter: blur(10px);
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
    
    // Add visual feedback
    scrollToTopBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        scrollToTopBtn.style.transform = 'scale(1)';
    }, 150);
});

// Initialize animations when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add loading animation to video
    if (introVideo) {
        introVideo.style.opacity = '0';
        introVideo.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => {
            introVideo.style.opacity = '1';
        }, 100);
        
        // Final autoplay attempt on window load
        setTimeout(() => {
            if (!videoPlaying) {
                introVideo.muted = false;
                introVideo.volume = 1.0;
                introVideo.play().then(() => {
                    console.log('🎵 Video autoplay successful on window load!');
                    videoPlaying = true;
                    videoPlayIcon.className = 'fas fa-pause';
                }).catch(e => {
                    console.log('Final autoplay attempt failed:', e);
                });
            }
        }, 500);
    }
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
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Space bar to toggle video
    if (e.key === ' ' && introVideo) {
        e.preventDefault();
        toggleVideo();
    }
});

// Start video with sound on first user interaction
let userInteracted = false;
function startVideoWithSound() {
    if (!userInteracted && introVideo) {
        userInteracted = true;
        introVideo.muted = false;
        introVideo.volume = 1.0;
        introVideo.play().then(() => {
            videoPlaying = true;
            videoPlayIcon.className = 'fas fa-pause';
            console.log('🎵 Video started with sound after user interaction');
        }).catch(e => {
            console.log('Failed to start video with sound:', e);
        });
    }
}

// Listen for any user interaction to start video with sound
document.addEventListener('click', startVideoWithSound, { once: true });
document.addEventListener('touchstart', startVideoWithSound, { once: true });
document.addEventListener('keydown', startVideoWithSound, { once: true });

// Add focus management for accessibility
document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn, .video-btn, .video-control-btn').forEach(button => {
    button.addEventListener('focus', function () {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });

    button.addEventListener('blur', function () {
        this.style.outline = 'none';
    });
});

// Enhanced touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 30; // Reduced threshold for easier swiping
    const diffY = touchStartY - touchEndY;
    const diffX = touchStartX - touchEndX;
    
    // Only handle vertical swipes (ignore horizontal swipes)
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > swipeThreshold) {
        if (diffY > 0) {
            // Swipe up - scroll down
            window.scrollBy({
                top: 150,
                behavior: 'smooth'
            });
        } else {
            // Swipe down - scroll up
            window.scrollBy({
                top: -150,
                behavior: 'smooth'
            });
        }
    }
}

// Enhanced mobile scrolling performance
if ('ontouchstart' in window) {
    // Disable hover effects on touch devices for better performance
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Optimize scroll performance on mobile
    let ticking = false;
    
    function updateScroll() {
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, {passive: true});
}

// Service Worker registration for PWA capabilities
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

// Add preload for video
const videoPreload = document.createElement('link');
videoPreload.rel = 'preload';
videoPreload.as = 'video';
videoPreload.href = 'clinic.mp4';
document.head.appendChild(videoPreload);

console.log('🏥 Clinic website loaded successfully!');
console.log('📱 Mobile apps available on Google Play and App Store');
console.log('🎥 Video introduction ready');