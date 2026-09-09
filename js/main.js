document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            mirror: false
        });
    }

    const typedElement = document.querySelector('.typing-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: ['IT and AI Developer', 'Data Developer', 'Python Developer', 'Full-Stack Developer', 'Machine Learning Developer'],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 500,
            loop: true
        });
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const updateThemeToggle = () => {
        const darkMode = document.body.classList.contains('dark-mode');
        themeToggle?.classList.toggle('is-dark', darkMode);
        themeToggle?.setAttribute('aria-pressed', String(darkMode));
        if (themeToggle) {
            themeToggle.innerHTML = `<i class="fas fa-${darkMode ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
        }
    };

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
        }
        updateThemeToggle();
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
            updateThemeToggle();
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
            document.body.classList.toggle('no-scroll', isOpen);
        });

        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open navigation');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip for back-to-top button which is handled separately
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialItems.length && dots.length) {
        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            testimonialItems.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialItems[index].classList.add('active');
            dots[index].classList.add('active');
        };
        
        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        };
        
        const prevTestimonial = () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        };
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', nextTestimonial);
            prevBtn.addEventListener('click', prevTestimonial);
        }
        
        // Auto slide every 5 seconds
        setInterval(nextTestimonial, 5000);
    }

    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    if (contactForm && successModal) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const closeModal = () => {
            successModal.classList.remove('is-visible');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
        };

        contactForm.addEventListener('submit', async event => {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Form submission failed');
                }

                contactForm.reset();
                successModal.classList.add('is-visible');
                successModal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('no-scroll');
            } catch {
                const notice = contactForm.parentElement.querySelector('.form-notice p');
                if (notice) {
                    notice.textContent = 'Something went wrong. Please email me directly instead.';
                    notice.classList.add('form-error');
                }
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Send Message';
            }
        });

        successModal.querySelector('.success-modal-close').addEventListener('click', closeModal);
        successModal.querySelector('.success-modal-done').addEventListener('click', closeModal);
        successModal.addEventListener('click', event => {
            if (event.target === successModal) closeModal();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && successModal.classList.contains('is-visible')) closeModal();
        });
    }

    // Image placeholder fallback
    document.querySelectorAll('img').forEach(img => {
        const setImageState = (image, isMissing) => {
            const wrapper = image.parentElement;
            if (!wrapper) return;
            wrapper.classList.toggle('image-missing', isMissing);
            image.classList.toggle('broken', isMissing);
        };

        img.addEventListener('error', () => setImageState(img, true));
        img.addEventListener('load', () => setImageState(img, false));

        if (img.complete && img.naturalWidth === 0) {
            setImageState(img, true);
        }
    });
}); 