// Modern UI Enhancements
class ModernUI {
  constructor() {
    this.init();
    this.setupAnimations();
    this.setupToasts();
    this.setupSaveJob();
  }

  init() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Header scroll effect
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Search enhancements
    this.setupSearch();
    
    // Modal handling
    this.setupModals();
  }

  handleScroll() {
    const header = document.querySelector('.modern-header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
      header.style.background = 'rgba(15, 23, 42, 0.8)';
    }
  }

  setupSearch() {
    const searchInput = document.querySelector('input[name="q"]');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });
  }

  performSearch(query) {
    if (query.length < 2) return;
    
    // Add loading state
    const container = document.getElementById('jobsContainer');
    container.classList.add('loading');
    
    // Simulate API call (replace with actual fetch)
    setTimeout(() => {
      container.classList.remove('loading');
    }, 500);
  }

  setupModals() {
    // Enhanced modal handling
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-open]');
      if (openBtn) {
        const modalId = openBtn.dataset.open;
        const modal = document.querySelector(modalId);
        if (modal) {
          this.showModal(modal);
        }
      }

      const closeBtn = e.target.closest('[data-close]');
      if (closeBtn) {
        const modal = closeBtn.closest('dialog');
        if (modal) {
          this.hideModal(modal);
        }
      }
    });
  }

  showModal(modal) {
    modal.showModal();
    modal.style.animation = 'modalSlideIn 0.3s ease';
  }

  hideModal(modal) {
    modal.style.animation = 'modalSlideOut 0.3s ease';
    setTimeout(() => {
      modal.close();
    }, 300);
  }

  setupAnimations() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
      });
    });

    document.querySelectorAll('.job-card-modern, .feature-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      observer.observe(card);
    });
  }

  setupToasts() {
    window.showToast = (message, type = 'success') => {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <div class="toast-content">
          <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
          <span>${message}</span>
        </div>
      `;
      
      const container = document.getElementById('toast-container');
      container.appendChild(toast);
      
      setTimeout(() => toast.classList.add('show'), 100);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => container.removeChild(toast), 300);
      }, 3000);
    };
  }

  setupSaveJob() {
    window.toggleSaveJob = (jobId) => {
      const btn = document.querySelector(`[data-job-id="${jobId}"] .save-job-btn`);
      const icon = btn.querySelector('i');
      
      if (btn.classList.contains('saved')) {
        btn.classList.remove('saved');
        icon.className = 'far fa-heart';
        showToast('Job removed from saved', 'success');
      } else {
        btn.classList.add('saved');
        icon.className = 'fas fa-heart';
        showToast('Job saved successfully', 'success');
      }
    };
  }
}

// Enhanced delete confirmation
window.confirmDelete = (jobId) => {
  const modal = document.createElement('div');
  modal.className = 'delete-modal';
  modal.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Delete Job Listing</h3>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this job listing? This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeDeleteModal()">Cancel</button>
          <a href="/jobs/${jobId}/delete" class="btn btn-danger">Delete</a>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
};

window.closeDeleteModal = () => {
  const modal = document.querySelector('.delete-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => document.body.removeChild(modal), 300);
  }
};

// Dropdown toggle
window.toggleDropdown = () => {
  const dropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('show');
};

// Mobile menu toggle
window.toggleMobileMenu = () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show-mobile');
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ModernUI();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes modalSlideOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
`;
document.head.appendChild(style);
