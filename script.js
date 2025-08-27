// Portfolio Website JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Portfolio item interactions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });

        // Add click event for portfolio items
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            showPortfolioModal(title, description);
        });
    });

    // Portfolio modal functionality
    function showPortfolioModal(title, description) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('portfolioModal');
        if (!modal) {
            modal = createPortfolioModal();
        }

        // Update modal content
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        // Show modal
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        // Add escape key listener
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePortfolioModal();
            }
        });
    }

    function createPortfolioModal() {
        const modal = document.createElement('div');
        modal.id = 'portfolioModal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h2 class="modal-title"></h2>
                    <p class="modal-description"></p>
                    <div class="modal-3d-preview">
                        <div class="modal-cube">
                            <div class="modal-face modal-front"></div>
                            <div class="modal-face modal-back"></div>
                            <div class="modal-face modal-right"></div>
                            <div class="modal-face modal-left"></div>
                            <div class="modal-face modal-top"></div>
                            <div class="modal-face modal-bottom"></div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">View Full Project</button>
                        <button class="btn btn-secondary modal-close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            #portfolioModal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                transition: opacity 0.3s ease;
            }

            .modal-content {
                background: white;
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
                animation: modalSlideIn 0.3s ease;
            }

            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #999;
                transition: color 0.3s ease;
            }

            .modal-close:hover {
                color: #333;
            }

            .modal-title {
                font-size: 1.8rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .modal-description {
                color: var(--text-secondary);
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .modal-3d-preview {
                perspective: 800px;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 2rem;
            }

            .modal-cube {
                width: 120px;
                height: 120px;
                transform-style: preserve-3d;
                animation: modalCubeRotate 15s linear infinite;
            }

            .modal-face {
                position: absolute;
                width: 120px;
                height: 120px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border: 2px solid rgba(255, 255, 255, 0.3);
                opacity: 0.8;
            }

            .modal-front { transform: rotateY(0deg) translateZ(60px); }
            .modal-back { transform: rotateY(180deg) translateZ(60px); }
            .modal-right { transform: rotateY(90deg) translateZ(60px); }
            .modal-left { transform: rotateY(-90deg) translateZ(60px); }
            .modal-top { transform: rotateX(90deg) translateZ(60px); }
            .modal-bottom { transform: rotateX(-90deg) translateZ(60px); }

            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: scale(0.8) translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }

            @keyframes modalCubeRotate {
                from { transform: rotateX(0deg) rotateY(0deg); }
                to { transform: rotateX(360deg) rotateY(360deg); }
            }
        `;

        // Inject styles
        const styleElement = document.createElement('style');
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);

        // Add event listeners
        const closeButton = modal.querySelector('.modal-close');
        const closeBtn = modal.querySelector('.modal-close-btn');
        const overlay = modal.querySelector('.modal-overlay');

        closeButton.addEventListener('click', closePortfolioModal);
        closeBtn.addEventListener('click', closePortfolioModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closePortfolioModal();
            }
        });

        document.body.appendChild(modal);
        return modal;
    }

    function closePortfolioModal() {
        const modal = document.getElementById('portfolioModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    // Contact form functionality
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            // Show success message (in a real app, you'd send this to a server)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add notification styles
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 10001;
                animation: notificationSlideIn 0.3s ease;
                max-width: 300px;
            }

            .notification-success {
                border-left: 4px solid #10B981;
                color: #065F46;
            }

            .notification-error {
                border-left: 4px solid #EF4444;
                color: #991B1B;
            }

            @keyframes notificationSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;

        // Inject notification styles if they don't exist
        if (!document.querySelector('#notificationStyles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'notificationStyles';
            styleElement.textContent = notificationStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const floatingCube = document.querySelector('.floating-cube');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (floatingCube && scrolled < window.innerHeight) {
            floatingCube.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });

    // 3D mouse interaction for floating cube
    const hero = document.querySelector('.hero');
    const cube = document.querySelector('.cube');
    
    if (hero && cube) {
        hero.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 20;
            const rotateY = (x - 0.5) * 20;
            
            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', function() {
            cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('skill-tag-animate');
    });

    // Add skill tag animation styles
    const skillTagStyles = `
        .skill-tag-animate {
            animation: skillTagFadeIn 0.6s ease-out both;
        }

        @keyframes skillTagFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;

    const skillStyleElement = document.createElement('style');
    skillStyleElement.textContent = skillTagStyles;
    document.head.appendChild(skillStyleElement);

    // Loading animation
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-cube">
                    <div class="loader-face"></div>
                    <div class="loader-face"></div>
                    <div class="loader-face"></div>
                    <div class="loader-face"></div>
                    <div class="loader-face"></div>
                    <div class="loader-face"></div>
                </div>
                <p>Loading Portfolio...</p>
            </div>
        `;

        const loaderStyles = `
            #loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 100000;
                animation: loaderFadeOut 1s ease-out 2s both;
            }

            .loader-content {
                text-align: center;
                color: white;
            }

            .loader-cube {
                width: 60px;
                height: 60px;
                margin: 0 auto 1rem;
                transform-style: preserve-3d;
                animation: loaderRotate 2s linear infinite;
            }

            .loader-face {
                position: absolute;
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }

            @keyframes loaderRotate {
                from { transform: rotateX(0deg) rotateY(0deg); }
                to { transform: rotateX(360deg) rotateY(360deg); }
            }

            @keyframes loaderFadeOut {
                to {
                    opacity: 0;
                    visibility: hidden;
                }
            }
        `;

        const loaderStyleElement = document.createElement('style');
        loaderStyleElement.textContent = loaderStyles;
        document.head.appendChild(loaderStyleElement);

        document.body.appendChild(loader);

        // Remove loader after animation
        setTimeout(() => {
            loader.remove();
        }, 3000);
    });
});

// Console welcome message
console.log(`
🎨 Welcome to the 3D Design Portfolio!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with modern web technologies
✨ Features:
• Responsive design
• 3D animations
• Interactive portfolio
• Smooth scrolling
• Mobile-friendly
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);