// Scroll animations and interactive effects
export function initScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        entry.target.classList.remove('animate-out');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '[data-id="projects-grid"] > *, [data-id="certificates-grid"] > *, [data-id="skills-section"] > *'
  );

  animatedElements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(el);
  });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .animate-out {
      opacity: 0 !important;
      transform: translateY(32px) !important;
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for background elements
  initParallax();
  
  // Navbar scroll effect
  initNavbarScrollEffect();
  
  // Smooth scroll progress indicator
  initScrollProgress();
}

// Parallax effect for floating background elements
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-id="bg-circles"] > *');
  
  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((el, index) => {
      const rate = scrolled * (0.5 + index * 0.1);
      el.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Navbar background effect on scroll
function initNavbarScrollEffect() {
  const navbar = document.querySelector('[data-id="main-navbar"]');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-slate-900/95');
      navbar.classList.remove('bg-slate-900/80');
    } else {
      navbar.classList.add('bg-slate-900/80');
      navbar.classList.remove('bg-slate-900/95');
    }
  });
}

// Scroll progress indicator
function initScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}

// Typing animation for hero text
export function initTypingAnimation() {
  const typingElement = document.querySelector('[data-id="hero-subtitle"]');
  if (!typingElement) return;

  const texts = [
    'Frontend Developer • Shopify Developer • UI/UX Enthusiast',
    'Creating Beautiful Web Experiences • Modern Technologies',
    'Passionate About Clean Code • Pixel Perfect Designs'
  ];

  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = texts[currentTextIndex];
    
    if (isDeleting) {
      typingElement.innerHTML = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typingElement.innerHTML = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
  }

  // Start typing animation after a delay
  setTimeout(typeText, 2000);
}

// Project card hover effects
export function initProjectCardEffects() {
  const projectCards = document.querySelectorAll('[data-id^="project-"]');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initTypingAnimation();
  initProjectCardEffects();
});