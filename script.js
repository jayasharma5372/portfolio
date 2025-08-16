document.addEventListener("DOMContentLoaded", () => {
    
    // --- THEME TOGGLE (DARK/LIGHT MODE) ---
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const currentTheme = localStorage.getItem("theme");

    // Apply saved theme on load
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggle.addEventListener("click", () => {
        const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDarkMode) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.removeItem("theme");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }
    });

    // --- MOBILE NAVIGATION ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {
        let current = "home"; // Default to home
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // Adjusted offset for fixed header
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // --- "SHOW MORE" PROJECTS ---
    const showMoreCard = document.getElementById("show-more-card");
    const hiddenProjects = document.querySelectorAll(".hidden-project");

    if (showMoreCard) {
        showMoreCard.addEventListener("click", () => {
            hiddenProjects.forEach(project => {
                project.style.display = "flex"; 
                project.classList.add('fade-in-project');
            });
            showMoreCard.style.display = "none";
        });
    }

});
