(() => {
  const navigationItems = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['skills.html', 'Skills'],
    ['projects.html', 'Projects'],
    ['experience.html', 'Experience'],
    ['resume.html', 'Resume'],
    ['contact.html', 'Contact']
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navigationMarkup = navigationItems
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join('');

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.outerHTML = `
      <nav class="navbar modern-nav" aria-label="Primary navigation">
        <div class="container">
          <a class="logo" href="index.html" aria-label="Karim Ibrahim home">
            <span class="logo-text">Karim Ibrahim</span>
            <span class="logo-dot" aria-hidden="true"></span>
          </a>
          <ul class="nav-links">${navigationMarkup}</ul>
          <button class="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">
            <i class="fas fa-moon" aria-hidden="true"></i>
          </button>
          <button class="hamburger" type="button" aria-label="Open navigation" aria-expanded="false">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </nav>`;

    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.outerHTML = `
      <footer class="footer modern-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-info">
              <div class="footer-logo">
                <h3>Karim Ibrahim</h3>
                <p>IT and AI Developer</p>
              </div>
              <p class="footer-tagline">Creating innovative digital solutions</p>
              <div class="social-links" aria-label="Social links">
                <a href="https://github.com/KarimIbr" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
                <a href="https://www.linkedin.com/in/karim-khaled-ibrahim/" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
                <a href="mailto:KarimKhaledIbrahim2003@gmail.com" aria-label="Email Karim Ibrahim"><i class="fas fa-envelope" aria-hidden="true"></i></a>
              </div>
            </div>
            <div class="footer-links">
              <div class="link-group">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about.html">About</a></li>
                  <li><a href="skills.html">Skills</a></li>
                  <li><a href="projects.html">Projects</a></li>
                </ul>
              </div>
              <div class="link-group">
                <h4>More</h4>
                <ul>
                  <li><a href="experience.html">Experience</a></li>
                  <li><a href="resume.html">Resume</a></li>
                  <li><a href="contact.html">Contact</a></li>
                </ul>
              </div>
              <div class="link-group">
                <h4>Contact</h4>
                <ul class="contact-info">
                  <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Antwerp, Belgium</li>
                  <li><i class="fas fa-envelope" aria-hidden="true"></i> KarimKhaledIbrahim2003@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Karim Ibrahim. All rights reserved.</p>
            <a href="#" class="back-to-top" aria-label="Back to top"><i class="fas fa-arrow-up" aria-hidden="true"></i></a>
          </div>
        </div>
      </footer>`;
  }
})();
