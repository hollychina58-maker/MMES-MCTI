/* ========================================
   form.js - Form Handling with EmailJS
   ======================================== */

const Form = {
  // EmailJS Configuration
  config: {
    serviceId: 'service_vhu373e',
    inquiryTemplateId: 'template_iilwwbl',
    contactTemplateId: 'template_iilwwbl',
    publicKey: '1fc_ahNtmel779a6Z',
    recipientEmail: 'hollychina58@gmail.com'
  },

  // Form validation rules
  validationRules: {
    name: {
      required: true,
      minLength: 2,
      message: 'name_error'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'email_error'
    },
    product: {
      required: true,
      message: 'product_error'
    },
    message: {
      required: true,
      minLength: 10,
      message: 'message_error'
    },
    company: {
      required: false,
      minLength: 0,
      message: 'company_error'
    },
    phone: {
      required: false,
      minLength: 0,
      message: 'phone_error'
    }
  },

  /**
   * Initialize form handling
   */
  init() {
    this.attachFormHandlers();
    this.autoFillProduct();
    console.log('[Form] Module initialized');
  },

  /**
   * Attach form submit handlers
   */
  attachFormHandlers() {
    // Handle inquiry forms
    const inquiryForms = document.querySelectorAll('.inquiry-form form');
    inquiryForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleInquirySubmit(form);
      });
      this.addValidationListeners(form);
    });

    // Handle contact forms
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmit(form);
      });
      this.addValidationListeners(form);
    });
  },

  /**
   * Add validation event listeners to form inputs
   */
  addValidationListeners(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        // Clear error on input
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const errorEl = input.parentElement.querySelector('.form-error');
          if (errorEl) errorEl.remove();
        }
      });
    });
  },

  /**
   * Auto-fill product field based on current page
   */
  autoFillProduct() {
    const productSelect = document.getElementById('product');
    if (!productSelect) return;

    // Check URL or page for product identifier
    const pageUrl = window.location.pathname;
    const productMap = {
      'ahrs': 'PA-AHRS01',
      'imu': 'PA-IMU-01D / PA-IMU-01G / PA-IMU-02D03D',
      'arg': 'PA-ARG-A / PA-ARG-D / PA-3ARG-A / PA-3ARG-D',
      'gs': 'PA-GS / PA-GS01 / PA-GS02 / PA-GSAUTO / PA-GSFA1',
      'vg': 'PA-VG11',
      'las-lam': 'PA-LASI-A / PA-LASIII-A',
      'c3000': 'PM-C3000 / PM-TS-VG'
    };

    for (const [key, value] of Object.entries(productMap)) {
      if (pageUrl.includes(key)) {
        const option = Array.from(productSelect.options).find(
          opt => opt.value === value || opt.textContent.includes(key.toUpperCase())
        );
        if (option) {
          productSelect.value = option.value;
        }
        break;
      }
    }

    // Also check for data-product attribute
    const productNameEl = document.querySelector('[data-product-name]');
    if (productNameEl && productSelect) {
      const productName = productNameEl.dataset.productName;
      const option = Array.from(productSelect.options).find(
        opt => opt.value === productName || opt.textContent.includes(productName)
      );
      if (option) {
        productSelect.value = option.value;
      }
    }
  },

  /**
   * Handle inquiry form submission
   * @param {HTMLFormElement} form - Form element
   */
  async handleInquirySubmit(form) {
    // Validate all fields
    if (!this.validateForm(form)) {
      this.showMessage('inquiry.validation_failed', 'error', form);
      return;
    }

    const formData = this.getFormData(form);
    this.setLoadingState(form, true);

    try {
      if (typeof emailjs !== 'undefined') {
        await this.sendInquiryEmail(formData);
      } else {
        await this.sendDemoEmail(formData, 'inquiry');
      }

      this.showMessage('inquiry.submit_success', 'success', form);
      this.resetForm(form);
    } catch (error) {
      console.error('[Form] Submission error:', error);
      this.showMessage('inquiry.submit_failed', 'error', form);
    } finally {
      this.setLoadingState(form, false);
    }
  },

  /**
   * Handle contact form submission
   * @param {HTMLFormElement} form - Form element
   */
  async handleContactSubmit(form) {
    // Validate required fields for contact form
    const contactValidationRules = {
      name: this.validationRules.name,
      email: this.validationRules.email,
      message: this.validationRules.message
    };

    if (!this.validateFormWithRules(form, contactValidationRules)) {
      this.showMessage('contact.validation_failed', 'error', form);
      return;
    }

    const formData = this.getFormData(form);
    this.setLoadingState(form, true);

    try {
      if (typeof emailjs !== 'undefined') {
        await this.sendContactEmail(formData);
      } else {
        await this.sendDemoEmail(formData, 'contact');
      }

      this.showMessage('contact.successMessage', 'success', form);
      this.resetForm(form);
    } catch (error) {
      console.error('[Form] Contact submission error:', error);
      this.showMessage('contact.errorMessage', 'error', form);
    } finally {
      this.setLoadingState(form, false);
    }
  },

  /**
   * Send inquiry email using EmailJS
   * @param {object} formData - Form data
   */
  async sendInquiryEmail(formData) {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      product: formData.product || 'General Inquiry',
      message: formData.message,
      to_email: this.config.recipientEmail
    };

    await emailjs.send(
      this.config.serviceId,
      this.config.inquiryTemplateId,
      templateParams,
      this.config.publicKey
    );
  },

  /**
   * Send contact email using EmailJS
   * @param {object} formData - Form data
   */
  async sendContactEmail(formData) {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'N/A',
      phone: formData.phone || 'N/A',
      message: formData.message,
      to_email: this.config.recipientEmail
    };

    await emailjs.send(
      this.config.serviceId,
      this.config.contactTemplateId,
      templateParams,
      this.config.publicKey
    );
  },

  /**
   * Demo mode email sending
   * @param {object} formData - Form data
   * @param {string} formType - Form type (inquiry or contact)
   */
  async sendDemoEmail(formData, formType) {
    console.log('[Form] Demo mode - Email would be sent to:', this.config.recipientEmail);
    console.log('[Form] Form type:', formType);
    console.log('[Form] Form data:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  },

  /**
   * Validate form with specific rules
   * @param {HTMLFormElement} form - Form element
   * @param {object} rules - Validation rules to use
   * @returns {boolean} - Validation result
   */
  validateFormWithRules(form, rules) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      const inputRules = rules[input.name];
      if (inputRules && !this.validateFieldWithRules(input, inputRules)) {
        isValid = false;
      }
    });

    return isValid;
  },

  /**
   * Validate entire form
   * @param {HTMLFormElement} form - Form element
   * @returns {boolean} - Validation result
   */
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  },

  /**
   * Validate a single field
   * @param {HTMLElement} input - Input element
   * @returns {boolean} - Validation result
   */
  validateField(input) {
    const rules = this.validationRules[input.name];
    if (!rules) return true;
    return this.validateFieldWithRules(input, rules);
  },

  /**
   * Validate a field with specific rules
   * @param {HTMLElement} input - Input element
   * @param {object} rules - Validation rules
   * @returns {boolean} - Validation result
   */
  validateFieldWithRules(input, rules) {
    const value = input.value.trim();

    // Clear previous error
    input.classList.remove('error');
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) existingError.remove();

    // Check required
    if (rules.required && !value) {
      this.showFieldError(input, rules.message);
      return false;
    }

    // Check minLength
    if (rules.minLength && value.length < rules.minLength && value.length > 0) {
      this.showFieldError(input, rules.message);
      return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value) && value) {
      this.showFieldError(input, rules.message);
      return false;
    }

    return true;
  },

  /**
   * Show field validation error
   * @param {HTMLElement} input - Input element
   * @param {string} messageKey - Error message key for i18n
   */
  showFieldError(input, messageKey) {
    input.classList.add('error');

    let message = messageKey;
    if (typeof I18n !== 'undefined' && I18n.getTranslation) {
      const translated = I18n.getTranslation(messageKey);
      if (translated) message = translated;
    }

    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    input.parentElement.appendChild(errorEl);
  },

  /**
   * Get form data as object
   * @param {HTMLFormElement} form - Form element
   * @returns {object} - Form data
   */
  getFormData(form) {
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    return data;
  },

  /**
   * Set form loading state
   * @param {HTMLFormElement} form - Form element
   * @param {boolean} isLoading - Loading state
   */
  setLoadingState(form, isLoading) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      const originalText = submitBtn.textContent;
      submitBtn.dataset.originalText = originalText;
      submitBtn.textContent = submitBtn.dataset.loadingText || 'Sending...';
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      if (submitBtn.dataset.originalText) {
        submitBtn.textContent = submitBtn.dataset.originalText;
      }
    }
  },

  /**
   * Show success/error message
   * @param {string} messageKey - Message key for i18n
   * @param {string} type - Message type (success, error)
   * @param {HTMLFormElement} form - Form element
   */
  showMessage(messageKey, type, form) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-success, .form-error-message');
    existingMessages.forEach(el => el.remove());

    // Get translated message
    let message = messageKey;
    if (typeof I18n !== 'undefined' && I18n.getTranslation) {
      let translated = I18n.getTranslation(messageKey);
      if (translated) {
        message = translated;
      } else if (messageKey.includes('.')) {
        const shortKey = messageKey.split('.')[1];
        translated = I18n.getTranslation(shortKey);
        if (translated) message = translated;
      }
    }

    // Fallback messages
    const fallbackMessages = {
      'inquiry.submit_success': 'Thank you for your inquiry! We will contact you soon.',
      'inquiry.submit_failed': 'Failed to send your inquiry. Please try again later.',
      'inquiry.validation_failed': 'Please fill in all required fields correctly.',
      'contact.successMessage': 'Message sent successfully!',
      'contact.errorMessage': 'Failed to send message. Please try again.',
      'contact.validation_failed': 'Please fill in all required fields correctly.'
    };
    message = fallbackMessages[messageKey] || message;

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = type === 'success' ? 'form-success' : 'form-error-message';
    messageEl.textContent = message;

    // Insert after form
    if (form && form.parentElement) {
      form.parentElement.insertBefore(messageEl, form.nextSibling);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  },

  /**
   * Reset form to initial state
   * @param {HTMLFormElement} form - Form element
   */
  resetForm(form) {
    form.reset();

    // Clear any error states
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.classList.remove('error');
      const errorEl = input.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.remove();
    });

    // Re-auto-fill product
    this.autoFillProduct();
  }
};

// Listen for language changes to update form
window.addEventListener('languageChanged', () => {
  Form.autoFillProduct();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Form;
}

// ES Module export
export { Form };
