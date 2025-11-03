// Collapsible Projects Logic
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    function updateCardHeight(card) {
        if (!card) return;
        const content = card.querySelector('.project-content');
        if (!content) return;
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }
    
    // Open first project by default after a delay to ensure content is loaded
    if (projectCards.length > 0) {
        setTimeout(() => {
            const firstCard = projectCards[0];
            const firstContent = firstCard.querySelector('.project-content');
            const firstChevron = firstCard.querySelector('.project-chevron');
            
            // Add active class first to ensure proper z-index
            firstCard.classList.add('active');
            
            // Then set the height
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
            firstChevron.style.transform = 'rotate(0deg)';
            
            // Force a reflow to ensure the active class is applied before content expands
            firstCard.offsetHeight;

            // Recalculate height once initial content settles
            setTimeout(() => updateCardHeight(firstCard), 200);
        }, 100);
    }
    
    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        const content = card.querySelector('.project-content');
        const chevron = card.querySelector('.project-chevron');
        const images = card.querySelectorAll('.project-content img');

        images.forEach(img => {
            if (img.complete) {
                updateCardHeight(card);
            } else {
                img.addEventListener('load', () => updateCardHeight(card));
            }
        });
        
        header.addEventListener('click', function() {
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            // Close all other projects and remove active class
            projectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherContent = otherCard.querySelector('.project-content');
                    const otherChevron = otherCard.querySelector('.project-chevron');
                    otherContent.style.maxHeight = '0px';
                    otherChevron.style.transform = 'rotate(180deg)';
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current project
            if (isOpen) {
                content.style.maxHeight = '0px';
                chevron.style.transform = 'rotate(180deg)';
                card.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                chevron.style.transform = 'rotate(0deg)';
                card.classList.add('active');
                setTimeout(() => updateCardHeight(card), 150);
            }
        });
    });

    window.addEventListener('resize', () => {
        projectCards.forEach(card => updateCardHeight(card));
    });
});

// Image Zoom Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const modal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');

    zoomableImages.forEach(img => {
        img.addEventListener('click', function () {
            zoomedImage.src = img.src;
            modal.classList.remove('hidden');
        });
    });

    // Close modal when clicking outside or on the image itself
    modal.addEventListener('click', function () {
        modal.classList.add('hidden');
        zoomedImage.src = '';
    });
    zoomedImage.addEventListener('click', function () {
        modal.classList.add('hidden');
        zoomedImage.src = '';
    });
});

// Project Iframe Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const iframeModal = document.getElementById('projectIframeModal');
    const projectIframe = document.getElementById('projectIframe');
    const closeBtn = document.getElementById('closeIframeBtn');
    const previewButtons = document.querySelectorAll('.project-preview-btn');

    // Open iframe modal when preview button is clicked
    previewButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const projectUrl = this.getAttribute('data-project-url');
            projectIframe.src = projectUrl;
            iframeModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close iframe modal
    function closeIframeModal() {
        iframeModal.classList.add('hidden');
        projectIframe.src = ''; // Clear iframe to stop loading
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close button click
    closeBtn.addEventListener('click', closeIframeModal);

    // Close on background click
    iframeModal.addEventListener('click', function (e) {
        if (e.target === iframeModal) {
            closeIframeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !iframeModal.classList.contains('hidden')) {
            closeIframeModal();
        }
    });
});
// Image Zoom Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const modal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');

    zoomableImages.forEach(img => {
        img.addEventListener('click', function () {
            zoomedImage.src = img.src;
            modal.classList.remove('hidden');
        });
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target === zoomedImage) {
            modal.classList.add('hidden');
            zoomedImage.src = '';
        }
    });
});
// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Smooth Scroll for Navigation Links
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

// Navbar Scroll Effect - Show navbar when leaving hero section
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    const currentScroll = window.pageYOffset;
    
    // Always keep navbar visible (removed hiding logic for hero section)
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
});

// Initialize scroll reveal on load
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Add stagger animation delays to certificate cards
function addCertificateStagger() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Add animation delay to hero elements
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        revealOnScroll();
    }, 100);
    
    // Add stagger effect to certificates
    addCertificateStagger();
    
    // Add typing effect to hero text (optional enhancement)
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-in';
            heroTitle.style.opacity = '1';
        }, 300);
    }
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#hero');
    
    if (heroSection && scrolled < window.innerHeight) {
        const heroContent = heroSection.querySelector('.relative.z-10');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = `${1 - (scrolled / window.innerHeight) * 0.5}`;
        }
    }
});

// Intersection Observer for better scroll reveal performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll reveal elements
document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
    observer.observe(el);
});

// Add cursor effect for premium feel (optional - can be removed if too heavy)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Prevent scroll restoration on page reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// 3D Animated Footer Canvas
function initFooterCanvas() {
    const canvas = document.getElementById('footer-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class for 3D effect
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 1000;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.vz = Math.random() * 2 + 1;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.z -= this.vz;
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.z < 1) {
                this.reset();
                this.z = 1000;
            }
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            const scale = 1000 / (1000 + this.z);
            const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
            const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
            const size = this.size * scale;
            
            // Use dynamic color from theme
            const colorHex = window.particleColor || '#a855f7';
            const r = parseInt(colorHex.slice(1, 3), 16);
            const g = parseInt(colorHex.slice(3, 5), 16);
            const b = parseInt(colorHex.slice(5, 7), 16);
            
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * scale})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // Set default particle color
    window.particleColor = '#a855f7';
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between nearby particles
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    // Use dynamic color from theme
                    const colorHex = window.particleColor || '#a855f7';
                    const r = parseInt(colorHex.slice(1, 3), 16);
                    const g = parseInt(colorHex.slice(3, 5), 16);
                    const b = parseInt(colorHex.slice(5, 7), 16);
                    
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
            
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
}

// Initialize footer canvas when page loads
window.addEventListener('load', initFooterCanvas);

// Add loading state (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounced scroll
window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
}, 5));

// Analytics placeholder (add your tracking code here)
function trackPageView() {
    // Add Google Analytics or other tracking
    console.log('Page view tracked');
}

// Track page view on load
window.addEventListener('load', trackPageView);

// Easter egg: Konami code (optional fun feature)
let konamiCode = [];
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-pattern.length);
    
    if (konamiCode.join('') === pattern.join('')) {
        // Easter egg activated
        console.log('🎮 Konami Code Activated! You found the secret!');
        document.body.style.animation = 'rainbow 5s infinite';
    }
});

// Initialize Theme Color Selector
function init3DCube() {
    const colorBoxes = document.querySelectorAll('.theme-color-box');
    
    // Exit if no color boxes found
    if (colorBoxes.length === 0) return;
    
    colorBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const themeName = box.getAttribute('data-theme');
            const theme = colorThemes[themeName];
            
            if (theme && theme.gradientFrom !== currentTheme.gradientFrom) {
                applyTheme(theme);
                showThemeNotification(theme.name);
                showResetButton();
            }
        });
    });
    
    // Color themes mapping
    const colorThemes = {
        front: {
            name: 'Purple Dreams',
            primary: '#a855f7',
            secondary: '#ec4899',
            accent: '#c084fc',
            gradientFrom: '#a855f7',
            gradientTo: '#ec4899',
            bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
            glassHover: 'rgba(168, 85, 247, 0.1)',
            borderColor: 'rgba(168, 85, 247, 0.3)',
            textAccent: '#c084fc'
        },
        back: {
            name: 'Ocean Blue',
            primary: '#3b82f6',
            secondary: '#9333ea',
            accent: '#60a5fa',
            gradientFrom: '#3b82f6',
            gradientTo: '#9333ea',
            bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
            glassHover: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.3)',
            textAccent: '#60a5fa'
        },
        right: {
            name: 'Sunset Pink',
            primary: '#ec4899',
            secondary: '#ef4444',
            accent: '#f472b6',
            gradientFrom: '#ec4899',
            gradientTo: '#ef4444',
            bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%)',
            glassHover: 'rgba(236, 72, 153, 0.1)',
            borderColor: 'rgba(236, 72, 153, 0.3)',
            textAccent: '#f472b6'
        },
        left: {
            name: 'Emerald Fresh',
            primary: '#22c55e',
            secondary: '#3b82f6',
            accent: '#4ade80',
            gradientFrom: '#22c55e',
            gradientTo: '#3b82f6',
            bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
            glassHover: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.3)',
            textAccent: '#4ade80'
        },
        top: {
            name: 'Golden Hour',
            primary: '#fbbf24',
            secondary: '#a855f7',
            accent: '#fcd34d',
            gradientFrom: '#fbbf24',
            gradientTo: '#a855f7',
            bgGradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            glassHover: 'rgba(251, 191, 36, 0.1)',
            borderColor: 'rgba(251, 191, 36, 0.3)',
            textAccent: '#fcd34d'
        },
        bottom: {
            name: 'Violet Dream',
            primary: '#6366f1',
            secondary: '#22c55e',
            accent: '#818cf8',
            gradientFrom: '#6366f1',
            gradientTo: '#22c55e',
            bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)',
            glassHover: 'rgba(99, 102, 241, 0.1)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            textAccent: '#818cf8'
        }
    };
    
    const defaultTheme = {
        name: 'Default',
        primary: '#a855f7',
        secondary: '#ec4899',
        accent: '#c084fc',
        gradientFrom: '#a855f7',
        gradientTo: '#ec4899',
        bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
        glassHover: 'rgba(168, 85, 247, 0.1)',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        textAccent: '#c084fc'
    };
    
    let currentTheme = defaultTheme;
    
    function applyTheme(theme) {
        const root = document.documentElement;
        const isDefault = theme.name === 'Default';
        
        // Add or remove theme-active class for glitch border
        if (!isDefault) {
            document.body.classList.add('theme-active');
        } else {
            document.body.classList.remove('theme-active');
        }
        
        // Update CSS variables for comprehensive theming
        root.style.setProperty('--gradient-from', theme.gradientFrom);
        root.style.setProperty('--gradient-to', theme.gradientTo);
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--border-color', theme.borderColor);
        root.style.setProperty('--glass-hover', theme.glassHover);
        root.style.setProperty('--text-accent', theme.textAccent);
        
        // Only apply background transformation for non-default themes
        if (!isDefault) {
            // Transform entire page background
            document.body.style.background = `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary}15 100%)`;
            
            // Update all glass card backgrounds with theme tint
            const glassCards = document.querySelectorAll('.bg-white\\/\\[0\\.03\\], .bg-white\\/\\[0\\.04\\], .bg-white\\/\\[0\\.05\\]');
            glassCards.forEach(card => {
                card.style.backgroundColor = `${theme.primary}08`;
                card.style.borderColor = theme.borderColor;
            });
        } else {
            // Reset to original black background
            document.body.style.background = '#000000';
            
            // Reset glass cards to original
            const glassCards = document.querySelectorAll('.bg-white\\/\\[0\\.03\\], .bg-white\\/\\[0\\.04\\], .bg-white\\/\\[0\\.05\\]');
            glassCards.forEach(card => {
                card.style.backgroundColor = '';
                card.style.borderColor = '';
            });
        }
        
        // Update all gradient text elements
        const gradientTexts = document.querySelectorAll('.bg-gradient-to-r');
        gradientTexts.forEach(el => {
            el.style.backgroundImage = `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`;
        });
        
        // Update hero and section titles
        const titles = document.querySelectorAll('h1, h2');
        titles.forEach(title => {
            if (title.classList.contains('bg-gradient-to-r')) {
                title.style.backgroundImage = `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`;
            }
        });
        
        // Update hero name/title with theme color
        const heroName = document.querySelector('#hero h1');
        if (heroName) {
            heroName.style.backgroundImage = `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`;
            heroName.style.webkitBackgroundClip = 'text';
            heroName.style.backgroundClip = 'text';
            heroName.style.webkitTextFillColor = 'transparent';
            heroName.style.display = 'inline-block';
            heroName.style.paddingBottom = '0.15em';
            heroName.style.paddingTop = '0.05em';
            heroName.style.lineHeight = '1.2';
        }
        
        // Update hero section paragraph and description with theme color
        const heroDesc = document.querySelector('#hero p.text-xl, #hero p.text-gray-400');
        if (heroDesc && !isDefault) {
            heroDesc.style.color = `${theme.textAccent}cc`;
        } else if (heroDesc && isDefault) {
            heroDesc.style.color = '';
        }
        
        // Update all buttons with gradient backgrounds
        const gradientButtons = document.querySelectorAll('button.bg-gradient-to-r, a.bg-gradient-to-r');
        gradientButtons.forEach(btn => {
            btn.style.backgroundImage = `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`;
        });
        
        // Update border colors throughout the site
        const borders = document.querySelectorAll('.border-white\\/10, .border-white\\/20');
        borders.forEach(el => {
            if (!isDefault) {
                el.style.borderColor = theme.borderColor;
            } else {
                el.style.borderColor = '';
            }
        });
        
        // Update text accent colors (stats, highlights)
        const stats = document.querySelectorAll('.text-5xl, .text-4xl');
        stats.forEach(stat => {
            if (!isDefault) {
                stat.style.color = theme.textAccent;
            } else {
                stat.style.color = '';
            }
        });
        
        // Update navbar background
        const navbar = document.getElementById('navbar');
        if (navbar && !isDefault) {
            navbar.style.backgroundColor = `${theme.primary}10`;
            navbar.style.borderBottomColor = theme.borderColor;
        } else if (navbar && isDefault) {
            navbar.style.backgroundColor = '';
            navbar.style.borderBottomColor = '';
        }
        
        // Update footer - keep dark, only change accents
        const footer = document.querySelector('footer');
        if (footer && !isDefault) {
            // Only update border color, keep background dark
            const footerBorder = footer.querySelector('.border-t');
            if (footerBorder) {
                footerBorder.style.borderColor = `${theme.borderColor}`;
            }
        } else if (footer && isDefault) {
            const footerBorder = footer.querySelector('.border-t');
            if (footerBorder) {
                footerBorder.style.borderColor = '';
            }
        }
        
        // Update experience cards with theme
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach(card => {
            if (!isDefault) {
                // Update card border and shadow with theme colors
                card.style.borderColor = theme.borderColor;
                card.style.boxShadow = `0 8px 32px ${theme.glassHover}, inset 0 1px 0 rgba(255,255,255,0.1)`;
                
                // Update icon backgrounds
                const iconBg = card.querySelector('.experience-icon-bg');
                if (iconBg) {
                    iconBg.style.backgroundColor = `${theme.primary}20`;
                }
                
                // Update icon colors
                const iconColor = card.querySelector('.experience-icon-color');
                if (iconColor) {
                    iconColor.style.color = theme.accent;
                }
                
                // Update badge colors
                const badge = card.querySelector('.experience-badge');
                if (badge) {
                    badge.style.color = theme.accent;
                }
            } else {
                // Reset to default
                card.style.borderColor = '';
                card.style.boxShadow = '';
                
                const iconBg = card.querySelector('.experience-icon-bg');
                if (iconBg) {
                    iconBg.style.backgroundColor = '';
                }
                
                const iconColor = card.querySelector('.experience-icon-color');
                if (iconColor) {
                    iconColor.style.color = '';
                }
                
                const badge = card.querySelector('.experience-badge');
                if (badge) {
                    badge.style.color = '';
                }
            }
        });
        
        // Update contact form elements
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.removeEventListener('focus', input._themeFocusHandler);
            input.removeEventListener('blur', input._themeBlurHandler);
            
            input._themeFocusHandler = function() {
                this.style.borderColor = theme.primary;
                this.style.boxShadow = `0 0 0 3px ${theme.glassHover}`;
            };
            input._themeBlurHandler = function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            };
            
            if (!isDefault) {
                input.addEventListener('focus', input._themeFocusHandler);
                input.addEventListener('blur', input._themeBlurHandler);
            }
        });
        
        // Update scrollbar with dynamic theme
        let style = document.getElementById('dynamic-scrollbar');
        if (!style) {
            style = document.createElement('style');
            style.id = 'dynamic-scrollbar';
            document.head.appendChild(style);
        }
        
        if (!isDefault) {
            style.textContent = `
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, ${theme.gradientFrom}, ${theme.gradientTo}) !important;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, ${theme.accent}, ${theme.secondary}) !important;
                }
                ::selection {
                    background-color: ${theme.glassHover} !important;
                    color: white !important;
                }
                ::-moz-selection {
                    background-color: ${theme.glassHover} !important;
                    color: white !important;
                }
            `;
        } else {
            style.textContent = `
                ::-webkit-scrollbar-thumb {
                    background: rgb(75, 85, 99) !important;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgb(107, 114, 128) !important;
                }
                ::selection {
                    background-color: rgba(168, 85, 247, 0.3) !important;
                    color: white !important;
                }
                ::-moz-selection {
                    background-color: rgba(168, 85, 247, 0.3) !important;
                    color: white !important;
                }
            `;
        }
        
        // Update footer canvas particles color
        updateFooterCanvasColor(theme.primary);
        
        // Update reset button theme
        const resetBtn = document.getElementById('theme-reset-btn');
        if (resetBtn) {
            resetBtn.style.backgroundImage = `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`;
            resetBtn.style.boxShadow = `0 10px 40px ${theme.glassHover}, 0 0 0 1px rgba(255, 255, 255, 0.1) inset`;
        }
        
        // Update certificate cards with theme
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach(card => {
            if (!isDefault) {
                // Update card border with theme color
                card.style.borderColor = theme.borderColor;
                
                // Update hover effect gradient
                card.style.setProperty('--gradient-from', `${theme.primary}15`);
                
                // Update verified badge icon color
                const verifiedIcon = card.querySelector('svg.text-white\\/70');
                if (verifiedIcon) {
                    verifiedIcon.style.color = theme.accent;
                }
                
                // Update view button styling
                const viewButton = card.querySelector('a');
                if (viewButton) {
                    viewButton.style.borderColor = theme.borderColor;
                    viewButton.style.background = `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`;
                }
                
                // Update view button hover effect
                viewButton.addEventListener('mouseenter', function() {
                    this.style.background = `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)`;
                    this.style.borderColor = theme.accent;
                });
                
                viewButton.addEventListener('mouseleave', function() {
                    this.style.background = `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`;
                    this.style.borderColor = theme.borderColor;
                });
            } else {
                // Reset to default
                card.style.borderColor = '';
                card.style.setProperty('--gradient-from', 'rgba(255,255,255,0.05)');
                
                const verifiedIcon = card.querySelector('svg.text-white\\/70');
                if (verifiedIcon) {
                    verifiedIcon.style.color = '';
                }
                
                const viewButton = card.querySelector('a');
                if (viewButton) {
                    viewButton.style.borderColor = '';
                    viewButton.style.background = '';
                    viewButton.replaceWith(viewButton.cloneNode(true)); // Remove all event listeners
                }
            }
        });
        
        currentTheme = theme;
    }
    
    function updateFooterCanvasColor(color) {
        // Update the particle color in footer canvas
        if (window.particleColor) {
            window.particleColor = color;
        }
    }
    
    function showThemeNotification(themeName) {
        // Remove existing notification if any
        const existingNotif = document.querySelector('.theme-notification');
        if (existingNotif) existingNotif.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Theme changed to <strong>${themeName}</strong></span>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function showResetButton() {
        const resetBtn = document.getElementById('theme-reset-btn');
        if (resetBtn) {
            resetBtn.classList.remove('hidden');
            setTimeout(() => resetBtn.classList.add('show'), 10);
        }
    }
    
    function hideResetButton() {
        const resetBtn = document.getElementById('theme-reset-btn');
        if (resetBtn) {
            resetBtn.classList.remove('show');
            setTimeout(() => resetBtn.classList.add('hidden'), 300);
        }
    }
    

    
    // Reset button functionality
    const resetBtn = document.getElementById('theme-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Reset button clicked - resetting to default theme');
            
            // Remove theme-active class
            document.body.classList.remove('theme-active');
            
            // Reset all CSS variables to default
            const root = document.documentElement;
            root.style.setProperty('--gradient-from', '#a855f7');
            root.style.setProperty('--gradient-to', '#ec4899');
            root.style.setProperty('--primary-color', '#a855f7');
            root.style.setProperty('--secondary-color', '#ec4899');
            root.style.setProperty('--accent-color', '#c084fc');
            root.style.setProperty('--border-color', 'rgba(168, 85, 247, 0.3)');
            root.style.setProperty('--glass-hover', 'rgba(168, 85, 247, 0.1)');
            root.style.setProperty('--text-accent', '#c084fc');
            
            // Reset body background
            document.body.style.background = '#000000';
            
            // Reset all glass cards
            const glassCards = document.querySelectorAll('.bg-white\\/\\[0\\.03\\], .bg-white\\/\\[0\\.04\\], .bg-white\\/\\[0\\.05\\]');
            glassCards.forEach(card => {
                card.style.backgroundColor = '';
                card.style.borderColor = '';
            });
            
            // Reset hero name
            const heroName = document.querySelector('#hero h1');
            if (heroName) {
                heroName.style.backgroundImage = '';
                heroName.style.webkitBackgroundClip = '';
                heroName.style.backgroundClip = '';
                heroName.style.webkitTextFillColor = '';
                heroName.style.display = '';
                heroName.style.paddingBottom = '';
                heroName.style.paddingTop = '';
                heroName.style.lineHeight = '';
            }
            
            // Reset hero description
            const heroDesc = document.querySelector('#hero p.text-xl, #hero p.text-gray-400');
            if (heroDesc) {
                heroDesc.style.color = '';
            }
            
            // Reset borders
            const borders = document.querySelectorAll('.border-white\\/10, .border-white\\/20');
            borders.forEach(el => {
                el.style.borderColor = '';
            });
            
            // Reset stats
            const stats = document.querySelectorAll('.text-5xl, .text-4xl');
            stats.forEach(stat => {
                stat.style.color = '';
            });
            
            // Reset navbar
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.style.backgroundColor = '';
                navbar.style.borderBottomColor = '';
            }
            
            // Reset footer
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.background = '';
            }
            
            // Update footer canvas particles color
            updateFooterCanvasColor('#a855f7');
            
            // Reset scrollbar
            let style = document.getElementById('dynamic-scrollbar');
            if (style) {
                style.textContent = `
                    ::-webkit-scrollbar-thumb {
                        background: rgb(75, 85, 99) !important;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: rgb(107, 114, 128) !important;
                    }
                    ::selection {
                        background-color: rgba(168, 85, 247, 0.3) !important;
                        color: white !important;
                    }
                    ::-moz-selection {
                        background-color: rgba(168, 85, 247, 0.3) !important;
                        color: white !important;
                    }
                `;
            }
            
            // Update current theme
            currentTheme = defaultTheme;
            
            // Hide reset button
            hideResetButton();
            
            // Show notification
            showThemeNotification('Default Purple Dreams');
        });
    } else {
        console.error('Reset button not found!');
    }
}

// Initialize theme selector when DOM is loaded
window.addEventListener('DOMContentLoaded', init3DCube);

// Certificates Carousel with Center Focus
function initCertificatesCarousel() {
    const scrollContainer = document.getElementById('certificates-scroll');
    const progressBar = document.getElementById('certificates-progress');
    if (!scrollContainer) return;
    
    const cards = scrollContainer.querySelectorAll('.certificate-card');
    const isMobile = () => window.innerWidth < 768;
    
    function updateCardStates() {
        const containerCenter = scrollContainer.offsetLeft + scrollContainer.offsetWidth / 2;
        let centerCard = null;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2 - scrollContainer.scrollLeft;
            const distanceFromCenter = Math.abs(containerCenter - cardCenter);
            
            // On mobile, no scaling
            if (isMobile()) {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '5';
                card.classList.remove('silver-shine-active');
            } 
            // Desktop: Center card (larger scale 1.3x, opacity 1, silver shine)
            else if (distanceFromCenter < card.offsetWidth / 2) {
                card.style.transform = 'scale(1.3)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.classList.add('silver-shine-active');
                centerCard = card;
            } 
            // Desktop: Side cards (smaller 0.75x, semi-transparent)
            else {
                card.style.transform = 'scale(0.75)';
                card.style.opacity = '0.5';
                card.style.zIndex = '1';
                card.classList.remove('silver-shine-active');
            }
        });
        
        // Update progress bar on mobile
        if (progressBar && isMobile()) {
            const scrollPercentage = (scrollContainer.scrollLeft / (scrollContainer.scrollWidth - scrollContainer.clientWidth)) * 100;
            progressBar.style.width = `${Math.max(10, scrollPercentage)}%`;
        }
    }
    
    // Click to center functionality
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the button
            if (e.target.closest('a')) return;
            
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const containerCenter = scrollContainer.offsetWidth / 2;
            const scrollTo = cardCenter - containerCenter;
            
            scrollContainer.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        });
        
        // Add cursor pointer to indicate clickability
        card.style.cursor = 'pointer';
    });
    
    // Update on scroll
    scrollContainer.addEventListener('scroll', updateCardStates);
    
    // Initial update
    updateCardStates();
    
    // Update on resize
    window.addEventListener('resize', updateCardStates);
}

// Auto-scrolling Experience Cards
function initExperienceScroll() {
    const scrollContainer = document.getElementById('experience-scroll');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');
    
    if (!scrollContainer) return;
    
    let isAutoScrolling = true;
    let scrollDirection = 1;
    let userInteracted = false;
    
    // Auto-scroll function
    function autoScroll() {
        if (!isAutoScrolling || userInteracted) return;
        
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;
        
        if (currentScroll >= maxScroll) {
            scrollDirection = -1;
        } else if (currentScroll <= 0) {
            scrollDirection = 1;
        }
        
        scrollContainer.scrollLeft += scrollDirection * 1;
    }
    
    // Start auto-scrolling
    const autoScrollInterval = setInterval(autoScroll, 30);
    
    // Stop auto-scroll on user interaction
    scrollContainer.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        userInteracted = false;
        setTimeout(() => {
            isAutoScrolling = true;
        }, 3000);
    });
    
    scrollContainer.addEventListener('touchstart', () => {
        isAutoScrolling = false;
        userInteracted = true;
    });
    
    scrollContainer.addEventListener('scroll', () => {
        if (!isAutoScrolling) {
            userInteracted = true;
        }
    });
    
    // Manual scroll buttons
    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -400, behavior: 'smooth' });
            isAutoScrolling = false;
            userInteracted = true;
            setTimeout(() => {
                isAutoScrolling = true;
                userInteracted = false;
            }, 5000);
        });
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
            isAutoScrolling = false;
            userInteracted = true;
            setTimeout(() => {
                isAutoScrolling = true;
                userInteracted = false;
            }, 5000);
        });
    }
}

// Initialize on page load
window.addEventListener('load', initExperienceScroll);
window.addEventListener('load', initCertificatesCarousel);
