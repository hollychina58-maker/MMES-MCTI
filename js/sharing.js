/* ========================================
   sharing.js - Social Media Sharing Module
   ======================================== */

const Sharing = {
  // Share URL base templates
  shareUrls: {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    twitter: 'https://twitter.com/intent/tweet?url={url}&text={title}',
    linkedin: 'https://www.linkedin.com/shareArticle?url={url}&title={title}',
    whatsapp: 'https://wa.me/?text={title}%20{url}',
    pinterest: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
    email: 'mailto:?subject={title}&body={url}',
    instagram: null // Instagram doesn't support web sharing like others
  },

  // Window dimensions for share popup
  popupWidth: 600,
  popupHeight: 400,

  /**
   * Initialize sharing functionality
   */
  init() {
    this.attachShareHandlers();
    console.log('[Sharing] Module initialized');
  },

  /**
   * Attach click handlers to share buttons
   */
  attachShareHandlers() {
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.dataset.share;
        const pageInfo = this.getPageInfo();

        if (platform === 'instagram') {
          this.shareToInstagram(pageInfo.title);
        } else if (platform && this.shareUrls[platform]) {
          this.shareTo(platform, pageInfo.url, pageInfo.title);
        }
      });
    });
  },

  /**
   * Share to a specific platform
   * @param {string} platform - Platform name (facebook, twitter, etc.)
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareTo(platform, url, title) {
    if (!this.shareUrls[platform]) {
      console.warn(`[Sharing] Platform ${platform} is not supported`);
      return;
    }

    const shareUrl = this.buildShareUrl(platform, url, title);

    if (platform === 'email') {
      // Email doesn't need a popup
      window.location.href = shareUrl;
    } else {
      this.openShareWindow(shareUrl);
    }
  },

  /**
   * Build the share URL for a platform
   * @param {string} platform - Platform name
   * @param {string} url - URL to share
   * @param {string} title - Title text
   * @returns {string} - Formatted share URL
   */
  buildShareUrl(platform, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return this.shareUrls[platform]
      .replace('{url}', encodedUrl)
      .replace('{title}', encodedTitle);
  },

  /**
   * Open share window with centered position
   * @param {string} url - URL to open
   */
  openShareWindow(url) {
    const left = (window.innerWidth - this.popupWidth) / 2;
    const top = (window.innerHeight - this.popupHeight) / 2;

    const windowFeatures = `
      width=${this.popupWidth},
      height=${this.popupHeight},
      left=${left},
      top=${top},
      toolbar=no,
      menubar=no,
      location=yes,
      resizable=yes,
      scrollbars=yes
    `;

    window.open(url, 'share_window', windowFeatures);
  },

  /**
   * Get current page information for sharing
   * @returns {object} - Page info with url and title
   */
  getPageInfo() {
    const pageUrl = window.location.href;

    // Get title from og:title meta tag (already translated by i18n.js)
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    let pageTitle = ogTitleMeta ? ogTitleMeta.getAttribute('content') : document.title;

    // Fallback: try to get product name if available
    const productNameEl = document.querySelector('[data-product-name]');
    if (productNameEl && pageTitle === document.title) {
      pageTitle = productNameEl.dataset.productName + ' - ' + pageTitle;
    }

    return {
      url: pageUrl,
      title: pageTitle
    };
  },

  /**
   * Share to Facebook
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareToFacebook(url, title) {
    this.shareTo('facebook', url, title);
  },

  /**
   * Share to Twitter/X
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareToTwitter(url, title) {
    this.shareTo('twitter', url, title);
  },

  /**
   * Share to LinkedIn
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareToLinkedIn(url, title) {
    this.shareTo('linkedin', url, title);
  },

  /**
   * Share to WhatsApp
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareToWhatsApp(url, title) {
    this.shareTo('whatsapp', url, title);
  },

  /**
   * Share to Pinterest
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareToPinterest(url, title) {
    this.shareTo('pinterest', url, title);
  },

  /**
   * Share via Email
   * @param {string} url - URL to share
   * @param {string} title - Title text
   */
  shareToEmail(url, title) {
    this.shareTo('email', url, title);
  },

  /**
   * Share to Instagram (shows message since Instagram doesn't support web sharing)
   * @param {string} title - Title text
   */
  shareToInstagram(title) {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // Try to open Instagram app
      const instagramAppUrl = 'instagram://app';
      const instagramWebUrl = 'https://www.instagram.com/';

      // Try to open Instagram app
      window.location.href = instagramAppUrl;

      // Show message after a short delay
      setTimeout(() => {
        // If still on same page, Instagram app is not installed
        this.showToast(this.getInstagramMessage(), 'info');
      }, 500);
    } else {
      // Desktop: show message
      this.showToast(this.getInstagramMessage(), 'info');
    }
  },

  /**
   * Get Instagram share message based on current language
   * @returns {string} - Instagram message
   */
  getInstagramMessage() {
    // Try to get message from i18n
    const messageEl = document.querySelector('[data-i18n="share.instagram_message"]');
    if (messageEl) {
      return messageEl.textContent;
    }
    // Default message
    return 'Instagram sharing requires the Instagram App';
  },

  /**
   * Copy current page URL to clipboard
   * @returns {Promise<boolean>} - Success status
   */
  async copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showToast('Link copied to clipboard!', 'success');
      return true;
    } catch (err) {
      console.error('[Sharing] Failed to copy link:', err);
      this.showToast('Failed to copy link', 'error');
      return false;
    }
  },

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error)
   */
  showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.share-toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `share-toast toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('visible'), 10);

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

// Listen for language changes to re-attach handlers
window.addEventListener('languageChanged', () => {
  Sharing.attachShareHandlers();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sharing;
}

// ES Module export
export { Sharing };
