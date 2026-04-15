/* ========================================
   i18n.js - Internationalization Module
   ======================================== */

const I18n = {
  currentLang: 'zh',
  translations: {
    common: {},
    products: {}
  },
  supportedLanguages: ['zh', 'en', 'ru', 'ar', 'uz', 'fa', 'tr', 'la'],
  rtlLanguages: ['ar', 'fa'],

  /**
   * Initialize i18n system
   */
  async init() {
    // Get stored language preference or use browser language
    const storedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.slice(0, 2);
    const defaultLang = storedLang || (this.supportedLanguages.includes(browserLang) ? browserLang : 'zh');

    // Load default language
    await this.loadLocale(defaultLang);

    // Update UI
    this.updateActiveLanguage();
    this.setDirection(defaultLang);

    // Set up language switcher event listeners
    this.initLanguageSwitcher();

    console.log(`[i18n] Initialized with language: ${defaultLang}`);
  },

  /**
   * Load locale file for a given language code
   * @param {string} langCode - Language code (e.g., 'zh', 'en', 'ar')
   */
  async loadLocale(langCode) {
    if (!this.supportedLanguages.includes(langCode)) {
      console.warn(`[i18n] Unsupported language: ${langCode}, falling back to 'zh'`);
      langCode = 'zh';
    }

    try {
      // Determine relative path based on current page location
      const path = window.location.pathname;
      const isInProductsDir = path.includes('/products/');
      const isInBlogArticlesDir = path.includes('/blog/articles/');
      const isInBlogDir = path.includes('/blog/');

      let basePath;
      if (isInProductsDir) {
        basePath = '../';
      } else if (isInBlogArticlesDir) {
        basePath = '../../';
      } else if (isInBlogDir) {
        basePath = '../';
      } else {
        basePath = './';
      }

      // Load common translations (use relative path)
      const commonResponse = await fetch(`${basePath}locales/${langCode}/common.json`);
      if (!commonResponse.ok) throw new Error(`Failed to load common.json for ${langCode}`);
      this.translations.common = await commonResponse.json();

      // Load product translations
      const productsResponse = await fetch(`${basePath}locales/${langCode}/products.json`);
      if (!productsResponse.ok) throw new Error(`Failed to load products.json for ${langCode}`);
      this.translations.products = await productsResponse.json();

      this.currentLang = langCode;

      // Update page with translations
      this.updatePage();

      // Store preference
      localStorage.setItem('preferredLanguage', langCode);

      console.log(`[i18n] Loaded locale: ${langCode}`);
    } catch (error) {
      console.error(`[i18n] Error loading locale ${langCode}:`, error);

      // Fallback to Chinese if loading fails
      if (langCode !== 'zh') {
        await this.loadLocale('zh');
      }
    }
  },

  /**
   * Switch to a different language
   * @param {string} langCode - Language code to switch to
   */
  async switchLanguage(langCode) {
    if (langCode === this.currentLang) return;

    console.log(`[i18n] Switching to language: ${langCode}`);

    // Show loading state
    document.body.classList.add('loading');

    await this.loadLocale(langCode);
    this.setDirection(langCode);
    this.updateActiveLanguage();

    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang: langCode }
    }));

    document.body.classList.remove('loading');
    console.log(`[i18n] Language switch complete. Current lang: ${this.currentLang}`);
  },

  /**
   * Set document direction (LTR/RTL)
   * @param {string} langCode - Language code
   */
  setDirection(langCode) {
    const html = document.documentElement;
    const isRTL = this.rtlLanguages.includes(langCode);

    html.lang = langCode;
    html.dir = isRTL ? 'rtl' : 'ltr';

    console.log(`[i18n] Direction set to: ${isRTL ? 'RTL' : 'LTR'}`);
  },

  /**
   * Update all elements with data-i18n attributes
   */
  updatePage() {
    // Update text content - preserve original if no translation
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        el.textContent = translation;
      }
      // If no translation found, leave original text unchanged
    });

    // Update placeholders - preserve original if no translation
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    // Update alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const translation = this.getTranslation(key);
      if (translation) {
        el.alt = translation;
      }
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translation = this.getTranslation(key);
      if (translation) {
        el.setAttribute('aria-label', translation);
      }
    });

    // Update meta tags (og:title, og:description, twitter:title, twitter:description, etc.)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.tagName === 'META') {
        const key = el.getAttribute('data-i18n');
        const translation = this.getTranslation(key);
        if (translation) {
          el.setAttribute('content', translation);
        }
      }
    });

    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.getTranslation(key);
      if (translation) {
        el.title = translation;
      }
    });

    console.log('[i18n] Page updated with translations');
  },

  /**
   * Get translation by key (supports nested keys with dot notation)
   * @param {string} key - Translation key (e.g., 'nav.home', 'products.imu.title')
   * @returns {string|null} - Translation text or null if not found
   */
  getTranslation(key) {
    const keys = key.split('.');
    let value = null;

    // Try common translations first
    value = this.getNestedValue(this.translations.common, keys);

    // Then try products translations
    if (value === undefined) {
      value = this.getNestedValue(this.translations.products, keys);
    }

    return value !== undefined ? value : null;
  },

  /**
   * Get nested value from object using dot notation keys
   * @param {object} obj - Object to search
   * @param {string[]} keys - Array of keys
   * @returns {*} - Value or undefined
   */
  getNestedValue(obj, keys) {
    return keys.reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  },

  /**
   * Initialize language switcher UI
   */
  initLanguageSwitcher() {
    const switcherBtns = document.querySelectorAll('.lang-switcher-btn');
    const dropdowns = document.querySelectorAll('.lang-dropdown');
    const options = document.querySelectorAll('.lang-option');

    // Add click handlers for dropdown toggle
    switcherBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const switcher = btn.closest('.lang-switcher');
        const dropdown = switcher.querySelector('.lang-dropdown');
        dropdown.classList.toggle('active');

        // Close on click outside
        const closeHandler = (event) => {
          if (!switcher.contains(event.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeHandler);
          }
        };
        setTimeout(() => document.addEventListener('click', closeHandler), 0);
      });
    });

    // Add click handlers for language options
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const langCode = option.dataset.lang;
        if (langCode && langCode !== this.currentLang) {
          this.switchLanguage(langCode);
        }

        // Close dropdown
        dropdowns.forEach(d => d.classList.remove('active'));
      });
    });
  },

  /**
   * Update active state in language switcher UI
   */
  updateActiveLanguage() {
    const options = document.querySelectorAll('.lang-option');
    const currentLangDisplay = document.querySelector('.lang-current');

    options.forEach(option => {
      if (option.dataset.lang === this.currentLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });

    // Update current language display
    if (currentLangDisplay) {
      const langNames = {
        'zh': '中文',
        'en': 'English',
        'ru': 'Русский',
        'ar': 'العربية',
        'uz': 'O\'zbek',
        'fa': 'فارسی',
        'tr': 'Türkçe',
        'la': 'Latina'
      };
      currentLangDisplay.textContent = langNames[this.currentLang] || this.currentLang;
    }
  },

  /**
   * Get current language code
   * @returns {string} - Current language code
   */
  getCurrentLang() {
    return this.currentLang;
  },

  /**
   * Check if current language is RTL
   * @returns {boolean} - True if RTL
   */
  isRTL() {
    return this.rtlLanguages.includes(this.currentLang);
  },

  /**
   * Restore language preference from localStorage
   */
  restorePreference() {
    const stored = localStorage.getItem('preferredLanguage');
    if (stored && stored !== this.currentLang) {
      this.switchLanguage(stored);
    }
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}

// ES Module export
export { I18n };
