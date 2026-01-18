
// Interactive Elements Manager
class InteractiveManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupHoverEffects();
        this.setupContactLinks();
    }

    setupSmoothScrolling() {
        // Smooth scrolling is handled by CSS, but we can add navigation if needed
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.addEventListener('click', (e) => {
                // Add any section-specific interactions here
            });
        });
    }

    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll('.contact-link, .theme-toggle');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                // Hover effects are handled by CSS for contact links and theme toggle only
                e.target.classList.add('hovered');
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.target.classList.remove('hovered');
            });
        });
    }

    setupContactLinks() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            // Ensure proper href attributes are set
            if (link.textContent.includes('@')) {
                // Email link
                if (!link.href.startsWith('mailto:')) {
                    link.href = `mailto:${link.textContent}`;
                }
            } else if (link.textContent.includes('linkedin')) {
                // LinkedIn link
                if (!link.href.startsWith('http')) {
                    link.href = `https://${link.textContent}`;
                }
            } else if (link.textContent.includes('github')) {
                // GitHub link
                if (!link.href.startsWith('http')) {
                    link.href = `https://${link.textContent}`;
                }
            }
            
            // Add click tracking or analytics here if needed
            link.addEventListener('click', (e) => {
                console.log('Contact link clicked:', link.href);
            });
        });
    }
}

// Profile Picture Manager
class ProfilePictureManager {
    constructor() {
        this.profileElement = null;
        this.init();
    }

    init() {
        this.profileElement = document.getElementById('profilePicture');
        this.setupProfilePicture();
    }

    setupProfilePicture() {
        if (!this.profileElement) return;

        // Maintain aspect ratio on resize
        this.maintainAspectRatio();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.maintainAspectRatio();
        });

        // Handle image loading if an image is added later
        this.setupImageHandling();
    }

    maintainAspectRatio() {
        if (this.profileElement) {
            const width = this.profileElement.offsetWidth;
            this.profileElement.style.height = `${width}px`;
        }
    }

    setupImageHandling() {
        // This method can be extended to handle actual image loading
        const img = this.profileElement.querySelector('img');
        if (img) {
            img.addEventListener('error', () => {
                this.showPlaceholder();
            });
            
            img.addEventListener('load', () => {
                this.hidePlaceholder();
            });
        }
    }

    showPlaceholder() {
        const placeholder = this.profileElement.querySelector('.placeholder-content');
        if (placeholder) {
            placeholder.style.display = 'block';
        }
    }

    hidePlaceholder() {
        const placeholder = this.profileElement.querySelector('.placeholder-content');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    }

    setProfileImage(imageUrl) {
        if (!this.profileElement || !imageUrl) return;

        const existingImg = this.profileElement.querySelector('img');
        if (existingImg) {
            existingImg.remove();
        }

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Profile Picture';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '6px';

        this.profileElement.appendChild(img);
    }
}

// Error Handler
class ErrorHandler {
    static handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // You can extend this to show user-friendly error messages
        // or send errors to a logging service
    }

    static handleThemeError(error) {
        console.warn('Theme error, falling back to light mode:', error);
        // Force light theme on error
        document.body.removeAttribute('data-theme');
    }
}

// Page Navigation
function goToPage(pageNumber) {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    if (pageNumber === 1) {
        page1.style.display = 'block';
        page2.style.display = 'none';
    } else if (pageNumber === 2) {
        page1.style.display = 'none';
        page2.style.display = 'block';
    }
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
}

// Print PDF Functionality
function printResume() {
    // Show both pages for printing
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const printBtn = document.querySelector('.print-pdf-container');
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const pageNavs = document.querySelectorAll('.page-navigation');
    
    // Show both pages
    page1.style.display = 'block';
    page2.style.display = 'block';
    
    // Hide interactive elements
    if (printBtn) printBtn.style.display = 'none';
    themeToggles.forEach(toggle => toggle.style.display = 'none');
    pageNavs.forEach(nav => nav.style.display = 'none');
    
    // Trigger the browser's print dialog
    window.print();
    
    // Restore the original page view and buttons after printing
    setTimeout(() => {
        // Restore to page 1 by default
        goToPage(1);
        
        if (printBtn) printBtn.style.display = 'block';
        themeToggles.forEach(toggle => toggle.style.display = 'flex');
        pageNavs.forEach(nav => nav.style.display = 'flex');
    }, 1000);

    const themeSwitches = document.querySelectorAll('.theme-switch')

    // hide
    themeSwitches.forEach(btn => btn.style.display = 'none')

    window.print()

    setTimeout(() => {
    themeSwitches.forEach(btn => btn.style.display = 'flex')
    }, 600)

    }

// Theme Management System
class ResumeApp {
    constructor() {
        this.themeManager = null;
        this.interactiveManager = null;
        this.profileManager = null;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize all managers
            this.themeManager = new ThemeManager();
            this.interactiveManager = new InteractiveManager();
            this.profileManager = new ProfilePictureManager();
            
            console.log('Resume app initialized successfully');
        } catch (error) {
            ErrorHandler.handleError(error, 'App initialization');
        }
    }

    // Public API methods
    getThemeManager() {
        return this.themeManager;
    }

    getInteractiveManager() {
        return this.interactiveManager;
    }

    getProfileManager() {
        return this.profileManager;
    }
}

// Initialize the application
const resumeApp = new ResumeApp();

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        InteractiveManager,
        ProfilePictureManager,
        ResumeApp,
        ErrorHandler
    };
}