export function initProjectVisibility() {
  const projectGrid = document.querySelector('[data-id="projects-grid"]');
  const projectItems = Array.from(projectGrid.children);
  const showMoreButton = document.getElementById('show-more-projects-btn');

  const initialProjectsToShow = 12; // Show the first 12 (top tier)
  const projectsPerLoad = 12;      // Load the rest on click
  let projectsShown = initialProjectsToShow;

  // Initialize: Hide all projects first, then show initial batch
  projectItems.forEach((item, index) => {
    if (index >= initialProjectsToShow) {
      item.classList.add('hidden');
    }
  });

  showMoreButton.addEventListener('click', () => {
    projectItems.forEach((item) => item.classList.remove('hidden'));
    showMoreButton.style.display = 'none'; // Hide button after showing all
  });
}
