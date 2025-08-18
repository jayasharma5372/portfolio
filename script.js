document.addEventListener("DOMContentLoaded", () => {
    
    // --- THEME TOGGLE (DARK/LIGHT MODE) ---
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const currentTheme = localStorage.getItem("theme");

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
        let current = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) {
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

    // --- SLIDER INITIALIZATION (SWIPER.JS) ---
    const skillsSwiper = new Swiper('.skills-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 576px
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 769px - Disable swiper
            769: {
                slidesPerView: 3,
                spaceBetween: 24,
                allowTouchMove: false, // Disable touch move on desktop
                loop: false, // Disable loop on desktop
                pagination: { // Disable pagination on desktop
                    el: null
                }
            }
        }
    });

    const projectsSwiper = new Swiper('.projects-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 32,
                allowTouchMove: false,
                loop: false,
                pagination: {
                    el: null
                }
            }
        }
    });

    // --- CONTACT FORM FUNCTIONALITY (WEB3FORMS) ---
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        result.innerHTML = "Sending...";
        result.style.display = "block";
        result.style.backgroundColor = "#f0f0f0";
        result.style.color = "#555";


        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Message sent successfully!";
                    result.style.backgroundColor = "#d4edda";
                    result.style.color = "#155724";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.style.backgroundColor = "#f8d7da";
                    result.style.color = "#721c24";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                 result.style.backgroundColor = "#f8d7da";
                 result.style.color = "#721c24";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 4000);
            });
    });

});
