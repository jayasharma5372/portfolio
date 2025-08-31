// Component loader utility
export async function loadComponent(selector, filePath) {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
      return;
    }

    // Get file path from data-source attribute if not provided
    const sourceFile = filePath || element.getAttribute('data-source');
    if (!sourceFile) {
      console.warn(`No source file specified for ${selector}`);
      return;
    }

    // Use the correct base URL for the preview environment
    const baseUrl = window.location.origin + '/api/preview-68ab179d8b427e2380d8f1c4/';
    const response = await fetch(baseUrl + sourceFile);
    
    if (!response.ok) {
      throw new Error(`Failed to load ${sourceFile}: ${response.statusText}`);
    }

    const html = await response.text();
    element.innerHTML = html;

    // Re-initialize Lucide icons for the new content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Initialize mobile menu functionality if navbar was loaded
    if (sourceFile.includes('navbar')) {
      initMobileMenu();
    }

  } catch (error) {
    console.error('Error loading component:', error);
    // Fallback content
    if (selector.includes('navbar')) {
      element.innerHTML = `
        <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
          <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="index.html" class="text-2xl font-bold text-white">AC</a>
          </div>
        </nav>
      `;
    }
  }
}

// Initialize mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      // Toggle menu icon
      const icon = mobileMenuButton.querySelector('i');
      if (icon) {
        const isOpen = !mobileMenu.classList.contains('hidden');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }
      });
    });
  }
}