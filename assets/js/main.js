// Main interactions for TradePiGloball V12
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Update year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu && nav) {
      navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', (!expanded).toString());
        
        if (!expanded) {
          nav.setAttribute('open', '');
        } else {
          nav.removeAttribute('open');
        }
      });

      // Close nav when clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && nav.hasAttribute('open')) {
          nav.removeAttribute('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Category scroller with buttons
    const scroller = document.getElementById('categoryScroller');
    const scrollBtns = document.querySelectorAll('.cat-scroll');
    
    if (scroller && scrollBtns.length) {
      scrollBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = btn.getAttribute('data-dir');
          const scrollAmount = dir === 'left' ? -280 : 280;
          scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      });

      // Keyboard navigation for categories
      scroller.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          scroller.scrollBy({ left: 200, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          scroller.scrollBy({ left: -200, behavior: 'smooth' });
        }
      });
    }

    // Modal functionality
    const modalBtns = document.querySelectorAll('.btn-modal');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Open modal
    modalBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Focus on modal for accessibility
          modal.focus();
          
          // Trap focus in modal
          trapFocus(modal);
        }
      });
    });

    // Close modal
    modalCloses.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      });
    });

    // Close modal on outside click
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          closeModal(activeModal);
        }
      }
    });

    function closeModal(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    function trapFocus(element) {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Close mobile nav if open
          if (nav && nav.hasAttribute('open')) {
            nav.removeAttribute('open');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          }
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add animation on scroll for elements
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

    // Observe cards and steps for animation
    document.querySelectorAll('.card, .step').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  });
})();

