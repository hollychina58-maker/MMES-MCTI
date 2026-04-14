/* ========================================
   scroll-effects.js - Scroll Animations
   ======================================== */

const ScrollEffects = {
  // Intersection Observer options
  observerOptions: {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  },

  // Parallax speed settings
  parallaxSpeed: 0.5,

  /**
   * Initialize scroll effects
   */
  init() {
    // Check for reduced motion preference
    if (this.prefersReducedMotion()) {
      this.enableNoMotionMode();
      return;
    }

    // Initialize scroll-triggered animations
    this.initScrollAnimations();

    // Initialize parallax effects
    this.initParallax();

    // Initialize navbar scroll behavior
    this.initNavbarScroll();

    // Initialize scroll-to-top button
    this.initScrollToTop();

    console.log('[ScrollEffects] Module initialized');
  },

  /**
   * Check for reduced motion preference
   * @returns {boolean}
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Enable no-motion mode (show all elements immediately)
   */
  enableNoMotionMode() {
    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      el.classList.add('visible');
    });
    console.log('[ScrollEffects] Reduced motion mode enabled');
  },

  /**
   * Initialize Intersection Observer for scroll animations
   */
  initScrollAnimations() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      this.enableNoMotionMode();
      return;
    }

    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
    );

    // Immediately show elements that are already in viewport
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });

    // Set up IntersectionObserver for elements that will scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    animatedElements.forEach(el => {
      observer.observe(el);
    });

    this.scrollObserver = observer;
  },

  /**
   * Initialize parallax scrolling effects
   */
  initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .parallax-element');

    if (parallaxElements.length === 0) return;

    // Use requestAnimationFrame for smooth parallax
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || this.parallaxSpeed;
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
          const yPos = -(scrolled * speed);
          el.style.transform = `translateY(${yPos}px)`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial update
    updateParallax();

    this.parallaxScrollHandler = onScroll;
  },

  /**
   * Initialize navbar scroll behavior
   */
  initNavbarScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    let ticking = false;

    const updateNav = () => {
      const currentScroll = window.pageYOffset;

      // Add/remove scrolled class
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check
    updateNav();

    this.navScrollHandler = onScroll;
  },

  /**
   * Initialize scroll-to-top button
   */
  initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;

    let ticking = false;

    const updateButton = () => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateButton);
        ticking = true;
      }
    };

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    this.scrollTopHandler = onScroll;
  },

  /**
   * Smooth scroll to element
   * @param {string} elementId - Element ID to scroll to
   * @param {number} offset - Offset from top (for fixed nav)
   */
  scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * Refresh all scroll effects (call after dynamic content changes)
   */
  refresh() {
    // Re-observe animated elements
    if (this.scrollObserver) {
      const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
      );

      animatedElements.forEach(el => {
        if (!el.classList.contains('visible')) {
          this.scrollObserver.observe(el);
        }
      });
    }
  },

  /**
   * Clean up event listeners
   */
  destroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    if (this.parallaxScrollHandler) {
      window.removeEventListener('scroll', this.parallaxScrollHandler);
    }

    if (this.navScrollHandler) {
      window.removeEventListener('scroll', this.navScrollHandler);
    }

    if (this.scrollTopHandler) {
      window.removeEventListener('scroll', this.scrollTopHandler);
    }
  }
};

// Listen for dynamic content changes
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        ScrollEffects.refresh();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Listen for language changes to refresh animations
window.addEventListener('languageChanged', () => {
  ScrollEffects.refresh();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollEffects;
}

// ES Module export
export { ScrollEffects };
