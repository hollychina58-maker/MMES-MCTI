/* ========================================
   main.js - Main Entry Point
   ======================================== */

// Import modules (ES modules)
import { I18n } from './i18n.js';
import { Sharing } from './sharing.js';
import { Form } from './form.js';
import { ScrollEffects } from './scroll-effects.js';

const App = {
  /**
   * Initialize the application
   */
  async init() {
    // Show page loader
    this.showPageLoader();

    // Initialize modules
    await this.initializeModules();

    // Set up event listeners
    this.setupEventListeners();

    // Hide page loader
    this.hidePageLoader();

    // Add loaded class to body
    document.body.classList.add('loaded');

    console.log('[App] Application initialized');
  },

  /**
   * Initialize all modules
   */
  async initializeModules() {
    try {
      // Initialize i18n first
      if (I18n) {
        await I18n.init();
      }

      // Initialize other modules
      if (Sharing) {
        Sharing.init();
      }

      if (Form) {
        Form.init();
      }

      if (ScrollEffects) {
        ScrollEffects.init();
      }

    } catch (error) {
      console.error('[App] Module initialization error:', error);
    }
  },

  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Mobile menu toggle
    this.setupMobileMenu();

    // Smooth scroll for anchor links
    this.setupSmoothScroll();

    // Keyboard navigation
    this.setupKeyboardNav();

    // Image lazy loading
    this.setupLazyLoading();
  },

  /**
   * Set up mobile menu toggle
   */
  setupMobileMenu() {
    const menuToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');

      // Update aria-expanded
      const isExpanded = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  },

  /**
   * Set up smooth scrolling for anchor links
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL hash
          history.pushState(null, null, href);
        }
      });
    });
  },

  /**
   * Set up keyboard navigation
   */
  setupKeyboardNav() {
    // Handle Tab navigation for accessibility
    document.addEventListener('keydown', (e) => {
      // Skip to main content link
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  },

  /**
   * Set up lazy loading for images
   */
  setupLazyLoading() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
      // Use native lazy loading
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    } else {
      // Fallback for browsers without native support
      this.loadLazyImages();
    }
  },

  /**
   * Load lazy images using IntersectionObserver
   */
  loadLazyImages() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  },

  /**
   * Show page loader
   */
  showPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.classList.remove('hidden');
    }
  },

  /**
   * Hide page loader
   */
  hidePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.remove();
      }, 300);
    }
  },

  /**
   * Initialize product thumbnails if on product page
   */
  initProductThumbnails() {
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.product-main-image');

    if (thumbnails.length === 0 || !mainImage) return;

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Update main image
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;

        // Update active state
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  },

  /**
   * Initialize category tabs if on products page
   */
  initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const productCards = document.querySelectorAll('.product-card');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter products
        productCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Export for debugging
window.App = App;
