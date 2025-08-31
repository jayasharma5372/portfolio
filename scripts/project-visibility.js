// scripts/project-visibility.js

export function initProjectVisibility() {
  const projectGrid = document.querySelector('[data-id="projects-grid"]');
  const projectItems = Array.from(projectGrid.children).filter(el => el.getAttribute('data-id') && el.getAttribute('data-id').startsWith('project-'));
  const showMoreButton = document.getElementById('show-more-projects-btn');

  const initialProjectsToShow = 5;
  const projectsPerLoad = 6;
  let projectsShown = 0;

  function showProjects() {
    for (let i = projectsShown; i < projectsShown + projectsPerLoad && i < projectItems.length; i++) {
      projectItems[i].classList.remove('hidden');
    }
    projectsShown += projectsPerLoad;

    if (projectsShown >= projectItems.length) {
      showMoreButton.classList.add('hidden'); // Hide button if all projects are shown
    }
  }

  // Hide all projects initially
  projectItems.forEach(item => item.classList.add('hidden'));

  // Show the initial set of projects
  for (let i = 0; i < initialProjectsToShow; i++) {
    if (projectItems[i]) {
      projectItems[i].classList.remove('hidden');
    }
  }
  projectsShown = initialProjectsToShow;

  // If there are more projects than initial, show the button
  if (projectItems.length > initialProjectsToShow) {
    showMoreButton.classList.remove('hidden');
  } else {
    showMoreButton.classList.add('hidden');
  }

  showMoreButton.addEventListener('click', () => {
    showProjects();
  });
}