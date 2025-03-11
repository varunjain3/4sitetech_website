document.addEventListener('DOMContentLoaded', function() {
    // Get elements for mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    animateOnScroll(serviceCards, 'fadeInUp');
    
    // Animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    animateOnScroll(featureItems, 'fadeInUp', 150);
    
    // Animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    animateOnScroll(teamMembers, 'fadeInUp', 150);
    
    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple animation feedback
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form sending - in production, this would be an actual API call
            setTimeout(function() {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Show alert and reset form
                setTimeout(function() {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 1500);
            }, 1500);
        });
    }
    
    // Handle smooth scrolling for on-page anchor links ONLY (not external page links)
    // This ensures that links to contact.html don't auto-scroll to a section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only apply to same-page anchors (starting with #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll to the element
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Fix for any CTA buttons going to contact page
    // Make sure they go to the top of the contact page
    document.querySelectorAll('a[href="contact.html"]').forEach(link => {
        // Make sure the href is exactly contact.html without any fragments
        link.setAttribute('href', 'contact.html');
    });
});

// Utility function to animate elements when they come into view
function animateOnScroll(elements, animationClass, delay = 100) {
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.animation = `${animationClass} 0.6s forwards`;
                    
                    // Add transition after animation completes
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.animation = '';
                    }, 600);
                    
                    observer.unobserve(entry.target);
                }, delay * index);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Define animation keyframes
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`);