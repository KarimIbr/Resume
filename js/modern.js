// Modern JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: false,
    mirror: true
  });

  // Typed.js initialization for the typing effect
  const typedElement = document.querySelector('.typing-text');
  if (typedElement) {
    new Typed('.typing-text', {
      strings: ['App Developer', 'IT Student', 'VR Developer', 'Flutter Specialist', 'Web Developer'],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    });
  }

  // Dark mode toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.modern-nav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMenu();
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      toggleMenu();
    });
    
    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      const isClickInsideMenu = navLinks.contains(e.target);
      const isClickOnHamburger = hamburger.contains(e.target);
      
      if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
        closeMenu();
      }
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Display a message to the user 
      // Note: Normally you would send this data to a server
      const formNotice = document.querySelector('.form-notice');
      if (formNotice) {
        formNotice.innerHTML = `<p>Thanks for your message, ${name}! I'll get back to you soon.</p>`;
        formNotice.style.display = 'block';
        
        // Clear form fields
        contactForm.reset();
      }
    });
  }
});

// Toggle dark mode function
function toggleDarkMode() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  body.classList.toggle('dark-mode');
  
  // Update icon and save preference
  if (body.classList.contains('dark-mode')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
}

// Toggle mobile menu
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Prevent scrolling when menu is open
  document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
}

// Close mobile menu
function closeMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

// Add active class to the current navigation item based on page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    link.classList.remove('active');
    
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') || 
        (currentPage === '/' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink); 