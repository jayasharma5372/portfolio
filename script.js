document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Function to apply theme and update RGB CSS variables
    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            // Set RGB variables for dark theme
            root.style.setProperty('--current-bg-rgb', '10, 10, 10'); // #0A0A0A
            root.style.setProperty('--current-primary-rgb', '100, 255, 218'); // #64ffda
            root.style.setProperty('--current-accent-rgb', '250, 204, 21'); // #FACC15
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            // Set RGB variables for light theme
            root.style.setProperty('--current-bg-rgb', '255, 255, 255'); // #FFFFFF
            root.style.setProperty('--current-primary-rgb', '79, 70, 229'); // #4F46E5
            root.style.setProperty('--current-accent-rgb', '236, 72, 153'); // #EC4899
        }
        // Trigger ECharts redraw if it exists
        if (window.educationChartInstance) {
            updateEChartsTheme(theme);
        }
    }

    applyTheme(currentTheme); // Apply initial theme

    themeToggle.addEventListener('click', () => {
        currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
    });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links .nav-link');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
    
    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('main > section');
    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === currentSectionId) {
                a.classList.add('active');
            }
        });
    });

    // Intersection Observer for Animations
    const animatedElements = document.querySelectorAll('.content-section, .skill-card, .project-card, .certificate-card, .hobby-card, .education-item-card, .skill-category-card');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    };
    const elementObserver = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => elementObserver.observe(el));

    // Footer Current Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ECharts Education Timeline
    const educationChartEl = document.getElementById('education-chart');
    if (educationChartEl && typeof echarts !== 'undefined') {
        window.educationChartInstance = echarts.init(educationChartEl);
        
        // =======================================================
        // --- MODIFIED ECHARTS CONFIGURATION TO SHOW FULL TIMELINE ---
        // =======================================================
        const educationData = [
            { name: "SSC", x: 100, y: 300, institution: "Gujarat Board", year: "2017", desc: "Percentage: 55%" },
            { name: "HSC", x: 300, y: 300, institution: "Gujarat Board", year: "2019", desc: "Percentage: 65.86%" },
            { name: "BCA", x: 500, y: 300, institution: "P D Pandya Institute of Computer Applications", year: "2019 – 2022", desc: "CGPA: 7.80. Gained foundational knowledge in computer science." },
            { name: "MCA", x: 700, y: 300, institution: "Shri Chimanbhai Patel PG Institute", year: "2022 – 2024", desc: "CGPA: 9.09. Focused on advanced software development." }
        ];

        function getEChartsOption(theme) {
            const isDark = theme === 'dark';
            const lineColor = isDark ? 'rgba(100, 255, 218, 0.7)' : 'rgba(79, 70, 229, 0.7)'; // Teal or Blue
            const nodeColor = isDark ? '#64ffda' : '#4F46E5';
            const textColor = isDark ? '#E5E7EB' : '#111827';

            return {
                animation: true,
                tooltip: {
                    trigger: "item",
                    formatter: function (params) {
                        const item = educationData.find(d => d.name === params.name);
                        if (!item) return '';
                        return `<div style="padding:10px; font-family: Inter, sans-serif; border-radius: 5px; background-color: ${isDark ? 'rgba(31,41,55,0.9)' : 'rgba(255,255,255,0.95)'}; color: ${textColor}; border: 1px solid ${isDark ? '#374151' : '#E5E7EB'}; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                    <strong style="color: ${nodeColor}; font-size: 1.1em;">${params.name}</strong><br/>
                                    <span style="font-weight: 600;">${item.institution}</span> (${item.year})<br/>
                                    <p style="margin-top: 5px; font-size: 0.9em; opacity: 0.9;">${item.desc}</p>
                                </div>`;
                    },
                    backgroundColor: 'transparent', // Handled by formatter
                    borderColor: 'transparent',
                    textStyle: { color: textColor }
                },
                series: [{
                    type: "graph",
                    layout: "none",
                    symbolSize: 35,
                    roam: false,
                    label: { show: true, position: 'bottom', color: textColor, fontSize: 13, fontWeight: '500' },
                    edgeSymbol: ["none", "arrow"],
                    edgeSymbolSize: [4, 12],
                    data: educationData.map(item => ({
                        name: item.name,
                        x: item.x,
                        y: item.y,
                        itemStyle: { color: nodeColor, borderWidth: 2, borderColor: isDark ? '#0A0A0A' : '#FFFFFF' },
                        label: { color: textColor }
                    })),
                    links: [
                        { source: "SSC", target: "HSC", lineStyle: { color: lineColor } },
                        { source: "HSC", target: "BCA", lineStyle: { color: lineColor } },
                        { source: "BCA", target: "MCA", lineStyle: { color: lineColor } }
                    ],
                    lineStyle: { opacity: 0.9, width: 2.5, curveness: 0 }
                }]
            };
        }
        
        window.educationChartInstance.setOption(getEChartsOption(currentTheme));
        
        window.updateEChartsTheme = function(newTheme) {
            if (window.educationChartInstance) {
                window.educationChartInstance.setOption(getEChartsOption(newTheme), true); // true for notMerge
            }
        }

        window.addEventListener("resize", () => {
            if (window.educationChartInstance) {
                window.educationChartInstance.resize();
            }
        });
    } else {
        console.warn("ECharts library not found or education chart element missing.");
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex'; // Or 'block' depending on your card layout
                    card.classList.remove('hidden-project'); // Ensure it's visible for animation
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden-project');
                }
            });
        });
    });

    // Project Modals
    const modalTriggers = document.querySelectorAll('.project-modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-project-id');
            const modal = document.getElementById(`project-modal-${projectId}`);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
            document.body.style.overflow = ''; // Restore scroll
        });
    });

    // Close modal if clicked outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Clicked on the modal backdrop
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Contact Form - Placeholder (Replace with actual submission logic)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const endpoint = this.action;
            if (!endpoint || endpoint.endsWith("#")) { // A more robust check for placeholder links
                 alert('Contact form is for demonstration. Please connect via LinkedIn or Email.');
                 return;
            }
            // If you have a real endpoint, your logic would go here.
        });
    }
});