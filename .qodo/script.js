// DOM Elements
const header = document.getElementById("header");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const menuOverlay = document.getElementById("menuOverlay");
const backToTop = document.getElementById("backToTop");
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const testimonialTrack = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const contactForm = document.getElementById("contactForm");

// Scroll Event
window.addEventListener("scroll", () => {
  // Header Scroll Effect
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Back to Top Button
  if (window.scrollY > 500) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }

  // Fade In Animation
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuOverlay.classList.toggle("active");

  // Toggle menu icon
  const isOpen = navLinks.classList.contains("active");
  mobileMenuBtn.innerHTML = isOpen
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
});

// Close mobile menu when clicking outside
menuOverlay.addEventListener("click", () => {
  navLinks.classList.remove("active");
  menuOverlay.classList.remove("active");
  mobileMenuBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuOverlay.classList.remove("active");
    mobileMenuBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  });
});

// Back to Top Button Click
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Portfolio Filter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Testimonial Slider
let currentSlide = 0;
const slideCount = testimonialTrack.children.length;

function goToSlide(index) {
  if (index < 0) index = slideCount - 1;
  if (index >= slideCount) index = 0;

  currentSlide = index;
  testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
});

// Auto slide testimonials
setInterval(() => {
  goToSlide(currentSlide + 1);
}, 5000);

// Contact Form Submission (Demo)
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const formElements = contactForm.elements;
  const name = formElements[0].value;
  const email = formElements[1].value;
  const subject = formElements[2].value;
  const message = formElements[3].value;

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Show success message (in a real application, you would send this data to a server)
  alert("Thank you for your message! I will get back to you soon.");

  // Reset form
  contactForm.reset();
});

// Initialize fade-in animation on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }, 100);
});

// Portfolio Item Click (Demo Modal)
portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector(".portfolio-title").textContent;
    const category = item.querySelector(".portfolio-category").textContent;

    alert(
      `You clicked on "${title}" (${category}). In a complete portfolio, this would open a detailed project view.`
    );
  });
});
