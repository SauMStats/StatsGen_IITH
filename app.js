// Modern Academic Website JavaScript

// MathJax Configuration
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initMobileMenu();
  initBlogSearch();
  initContactForm();
  initBlogPosts();
  initSmoothScrolling();
});

// Navigation Management
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav__link[data-page]');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-page');
      
      // Remove active class from all nav links
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Hide all pages
      pages.forEach(page => page.classList.remove('active'));
      
      // Show target page
      const targetPageElement = document.getElementById(targetPage);
      if (targetPageElement) {
        targetPageElement.classList.add('active');
        
        // Re-render MathJax if the page contains math
        if (targetPage === 'blog-post' && window.MathJax) {
          window.MathJax.typesetPromise([targetPageElement]).catch(function (err) {
            console.log('MathJax typeset failed: ' + err.message);
          });
        }
      }

      // Close mobile menu if open
      closeMobileMenu();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Handle CTA button on hero
  const heroCta = document.querySelector('.hero__cta');
  if (heroCta) {
    heroCta.addEventListener('click', function() {
      // Remove active from all nav links
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      
      // Add active to research link
      const researchLink = document.querySelector('.nav__link[data-page="research"]');
      if (researchLink) {
        researchLink.classList.add('active');
      }
      
      // Show research page
      pages.forEach(page => page.classList.remove('active'));
      const researchPage = document.getElementById('research');
      if (researchPage) {
        researchPage.classList.add('active');
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Mobile Menu Management
function initMobileMenu() {
  const menuToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav')) {
        closeMobileMenu();
      }
    });

    // Close menu when window is resized to larger screen
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }
}

function closeMobileMenu() {
  const navMenu = document.querySelector('.nav__menu');
  if (navMenu) {
    navMenu.classList.remove('active');
  }
}

// Blog Search Functionality
function initBlogSearch() {
  const searchInput = document.querySelector('.blog__search');
  const blogPosts = document.querySelectorAll('.blog-post');

  if (searchInput && blogPosts.length > 0) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();

      blogPosts.forEach(post => {
        const title = post.querySelector('.blog-post__title').textContent.toLowerCase();
        const excerpt = post.querySelector('.blog-post__excerpt').textContent.toLowerCase();
        const author = post.querySelector('.blog-post__author').textContent.toLowerCase();

        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || author.includes(searchTerm)) {
          post.style.display = 'block';
          post.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
          post.style.display = 'none';
        }
      });

      // Show all posts if search is empty
      if (searchTerm === '') {
        blogPosts.forEach(post => {
          post.style.display = 'block';
        });
      }
    });
  }
}

// Blog Post Detail Functionality
function initBlogPosts() {
  const blogPosts = document.querySelectorAll('.blog-post');
  const blogPostPage = document.getElementById('blog-post');
  const backButton = document.querySelector('.blog-post__back');

  // Handle blog post click
  blogPosts.forEach(post => {
    const readMoreBtn = post.querySelector('.blog-post__read-more');
    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', function() {
        const postData = post.getAttribute('data-post');
        showBlogPost(postData);
      });
    }
  });

  // Handle back button
  if (backButton) {
    backButton.addEventListener('click', function() {
      // Hide blog post page
      if (blogPostPage) {
        blogPostPage.classList.remove('active');
      }
      
      // Show blog page
      const blogPage = document.getElementById('blog');
      if (blogPage) {
        blogPage.classList.add('active');
      }
      
      // Update nav active state
      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach(link => link.classList.remove('active'));
      
      const blogNavLink = document.querySelector('.nav__link[data-page="blog"]');
      if (blogNavLink) {
        blogNavLink.classList.add('active');
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function showBlogPost(postData) {
  const pages = document.querySelectorAll('.page');
  const blogPostPage = document.getElementById('blog-post');
  
  // Hide all pages
  pages.forEach(page => page.classList.remove('active'));
  
  // Show blog post page
  if (blogPostPage) {
    blogPostPage.classList.add('active');
    
    // Update content based on post data
    updateBlogPostContent(postData);
    
    // Re-render MathJax
    if (window.MathJax) {
      window.MathJax.typesetPromise([blogPostPage]).catch(function (err) {
        console.log('MathJax typeset failed: ' + err.message);
      });
    }
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBlogPostContent(postData) {
  const blogPostDetail = document.querySelector('.blog-post-detail');
  
  if (postData === 'polygenic-math') {
    // Update content for polygenic math post
    const title = blogPostDetail.querySelector('.blog-post-detail__title');
    const author = blogPostDetail.querySelector('.blog-post__author');
    const date = blogPostDetail.querySelector('.blog-post__date');
    const content = blogPostDetail.querySelector('.blog-post-detail__content');
    
    if (title) title.textContent = 'The Mathematics Behind Polygenic Risk Scores';
    if (author) author.textContent = 'David Park';
    if (date) date.textContent = 'November 15, 2024';
    
    if (content) {
      content.innerHTML = `
        <p>Polygenic Risk Scores (PRS) represent a powerful tool for predicting disease risk based on genetic variants across the genome. Understanding the mathematical foundation is crucial for their proper application.</p>
        
        <h3>Basic PRS Formula</h3>
        <p>The standard PRS is calculated as a weighted sum of risk alleles:</p>
        
        <div class="math-equation">
          $$PRS_i = \\sum_{j=1}^{m} \\beta_j \\cdot G_{ij}$$
        </div>
        
        <p>Where:</p>
        <ul>
          <li>\\(PRS_i\\) is the polygenic risk score for individual \\(i\\)</li>
          <li>\\(\\beta_j\\) is the effect size for variant \\(j\\)</li>
          <li>\\(G_{ij}\\) is the genotype (0, 1, or 2) for individual \\(i\\) at variant \\(j\\)</li>
          <li>\\(m\\) is the total number of variants</li>
        </ul>
        
        <h3>Effect Size Estimation</h3>
        <p>Effect sizes are typically derived from GWAS summary statistics using linear or logistic regression:</p>
        
        <div class="math-equation">
          $$\\log(OR_j) = \\beta_j + \\epsilon_j$$
        </div>
        
        <p>Where \\(OR_j\\) is the odds ratio for variant \\(j\\) and \\(\\epsilon_j\\) represents the error term.</p>
        
        <h3>P-value Thresholding</h3>
        <p>Traditional PRS construction uses p-value thresholding to select variants:</p>
        
        <div class="math-equation">
          $$PRS_{PT} = \\sum_{j \\in S(p_T)} \\beta_j \\cdot G_{ij}$$
        </div>
        
        <p>Where \\(S(p_T)\\) is the set of variants with p-values below threshold \\(p_T\\).</p>
        
        <h3>Standardization</h3>
        <p>PRS are often standardized to have mean 0 and variance 1:</p>
        
        <div class="math-equation">
          $$PRS_{std,i} = \\frac{PRS_i - \\mu_{PRS}}{\\sigma_{PRS}}$$
        </div>
        
        <p>This standardization facilitates interpretation and comparison across different populations and studies.</p>
      `;
    }
  }
  // Default content is already in HTML for Hardy-Weinberg post
}

// Contact Form Management
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name') || document.getElementById('name').value;
      const email = formData.get('email') || document.getElementById('email').value;
      const subject = formData.get('subject') || document.getElementById('subject').value;
      const message = formData.get('message') || document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
      
      // Reset form
      this.reset();
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message status status--${type}`;
  messageDiv.textContent = message;
  
  // Insert message before form
  const form = document.getElementById('contact-form');
  if (form) {
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or has data-page attribute
      if (href === '#' || this.hasAttribute('data-page')) {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Utility Functions
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

// Intersection Observer for Animations
function initScrollAnimations() {
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

  // Observe cards and other elements
  const animatedElements = document.querySelectorAll('.card, .highlight, .team-member');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add a small delay to ensure all content is rendered
  setTimeout(initScrollAnimations, 100);
});

// Handle Browser Back/Forward Buttons
window.addEventListener('popstate', function(e) {
  // This would handle browser navigation in a real SPA
  // For this demo, we'll just ensure home page is shown
  const homeNavLink = document.querySelector('.nav__link[data-page="home"]');
  if (homeNavLink) {
    homeNavLink.click();
  }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
  
  // Enter key on nav links
  if (e.key === 'Enter' && e.target.classList.contains('nav__link')) {
    e.target.click();
  }
});

// Performance Monitoring
function logPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function() {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }, 0);
    });
  }
}

// Initialize performance monitoring
logPerformance();

// Add fade-in animation CSS if not already present
if (!document.querySelector('#fadeInStyles')) {
  const fadeInStyles = document.createElement('style');
  fadeInStyles.id = 'fadeInStyles';
  fadeInStyles.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(fadeInStyles);
}

// Error Handling for MathJax
window.addEventListener('error', function(e) {
  if (e.message && e.message.includes('MathJax')) {
    console.warn('MathJax error handled:', e.message);
  }
});

// Accessibility Enhancements
function enhanceAccessibility() {
  // Add ARIA labels to navigation
  const navToggle = document.querySelector('.nav__toggle');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only';
  skipLink.style.position = 'absolute';
  skipLink.style.top = '-40px';
  skipLink.style.left = '6px';
  skipLink.style.transition = 'top 0.3s';
  
  skipLink.addEventListener('focus', function() {
    this.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);