// Portfolio App JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupActiveNavLinks();
    }

    // Navigation functionality
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for navbar styling
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link, .scroll-indicator');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });

        // Smooth scroll for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(btn => {
            if (btn.getAttribute('href').startsWith('#')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = btn.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Contact form validation and handling
    setupContactForm() {
        const form = document.getElementById('contactForm');
        const formInputs = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };
        const errorElements = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            subject: document.getElementById('subjectError'),
            message: document.getElementById('messageError')
        };

        if (form) {
            // Real-time validation
            Object.keys(formInputs).forEach(key => {
                const input = formInputs[key];
                if (input) {
                    input.addEventListener('blur', () => this.validateField(key, input, errorElements[key]));
                    input.addEventListener('input', () => this.clearError(input, errorElements[key]));
                }
            });

            // Form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                
                // Validate all fields
                Object.keys(formInputs).forEach(key => {
                    const input = formInputs[key];
                    if (input && !this.validateField(key, input, errorElements[key])) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    this.handleFormSubmission(form, formInputs);
                } else {
                    // Scroll to first error
                    const firstError = form.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        }
    }

    validateField(fieldName, input, errorElement) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                } else if (value.length < 5) {
                    errorMessage = 'Subject must be at least 5 characters long';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        } else {
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
        }

        return isValid;
    }

    clearError(input, errorElement) {
        if (input.classList.contains('error') && input.value.trim()) {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }
    }

    handleFormSubmission(form, formInputs) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-info)'};
            color: var(--color-white);
            padding: var(--space-16) var(--space-20);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
            max-width: 350px;
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Setup scroll animations for sections
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });

        // Observe cards and timeline items
        const animatedElements = document.querySelectorAll('.skill-category, .portfolio-card, .timeline-item, .achievement-item');
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }

    // Setup active navigation link highlighting
    setupActiveNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Utility method to handle external links
    handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]');
        externalLinks.forEach(link => {
            if (link.href.startsWith('http')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
}

// CSS for scroll animations
const animationStyles = `
<style>
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.timeline-item.animate-on-scroll {
    transform: translateX(-50px);
}

.timeline-item:nth-child(even).animate-on-scroll {
    transform: translateX(50px);
}

.timeline-item.animate-in {
    transform: translateX(0);
}

.skill-category.animate-on-scroll,
.portfolio-card.animate-on-scroll {
    transform: translateY(50px) scale(0.95);
}

.skill-category.animate-in,
.portfolio-card.animate-in {
    transform: translateY(0) scale(1);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: var(--space-8);
}

.notification-content i {
    font-size: var(--font-size-lg);
}

@media (max-width: 768px) {
    .timeline-item.animate-on-scroll,
    .timeline-item:nth-child(even).animate-on-scroll {
        transform: translateX(-30px);
    }
}
</style>
`;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inject animation styles
    document.head.insertAdjacentHTML('beforeend', animationStyles);
    
    // Initialize portfolio app
    const app = new PortfolioApp();
    
    // Handle external links
    app.handleExternalLinks();
    
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    console.log('Portfolio website loaded successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! - Selvamani K';
    } else {
        document.title = 'Selvamani K - API Technical Writer';
    }
});