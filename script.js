// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Menu Tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding category
        const category = tab.getAttribute('data-category');
        const targetCategory = document.getElementById(category);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .menu-item, .gallery-item, .testimonial-card, .info-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// WhatsApp message formatting
function formatWhatsAppMessage(type) {
    const baseUrl = 'https://wa.me/22871923333';
    let message = '';
    
    switch(type) {
        case 'reservation':
            message = 'Bonjour 👋\n\nJe souhaite réserver une table à THE PENTHOUSE.\n\n📅 Date: \n⏰ Heure: \n👥 Nombre de personnes: \n\nMerci !';
            break;
        case 'takeaway':
            message = 'Bonjour 👋\n\nJe souhaite passer une commande à emporter / livraison.\n\nMerci !';
            break;
        case 'event':
            message = 'Bonjour 👋\n\nJe souhaite organiser un événement privé à THE PENTHOUSE.\n\nMerci !';
            break;
        default:
            message = 'Bonjour, je souhaite réserver une table';
    }
    
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

// Add click handlers for WhatsApp buttons
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Optional: Track analytics here
        console.log('WhatsApp link clicked');
    });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Phone number clicked');
    });
});

// Lazy loading for images (if you add real images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Note: Les liens Google Maps partagés ne peuvent pas être utilisés directement comme sources d'images
// Pour afficher les images directement, vous devez obtenir les URLs directes des images depuis Google Maps
// Instructions dans le fichier INSTRUCTIONS_IMAGES.md

// Function to handle image loading errors
function setupGalleryImages() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach((img) => {
        img.onerror = function() {
            // Si l'image ne charge pas, afficher le placeholder
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('gallery-placeholder')) {
                placeholder.style.display = 'flex';
            }
        };
        
        img.onload = function() {
            // Si l'image charge, cacher le placeholder
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('gallery-placeholder')) {
                placeholder.style.display = 'none';
            }
        };
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    setupGalleryImages();
});

// Form validation (if you add a contact form later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

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

// Apply debounce to scroll handler
const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Add active state to current section in navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', debounce(updateActiveNav, 100));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('THE PENTHOUSE website loaded');
    
    // Set current year in footer if needed
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
});

