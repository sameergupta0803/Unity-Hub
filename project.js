 // Sample projects data
 const projects = [
    {
      id: 1,
      title: "Metro Line Extension",
      department: "Transport",
      startDate: "2025-03-15",
      endDate: "2027-06-30",
      priority: "high",
      progress: 0,
      status: "upcoming"
    },
    {
      id: 2,
      title: "City Hospital Renovation",
      department: "Healthcare",
      startDate: "2024-10-05",
      endDate: "2025-08-20",
      priority: "medium",
      progress: 35,
      status: "ongoing"
    },
    {
      id: 3,
      title: "Public School Technology Update",
      department: "Education",
      startDate: "2024-09-01",
      endDate: "2025-05-15",
      priority: "medium",
      progress: 68,
      status: "ongoing"
    },
    {
      id: 4,
      title: "Highway Bridge Repair",
      department: "Infrastructure",
      startDate: "2024-06-10",
      endDate: "2025-01-15",
      priority: "high",
      progress: 100,
      status: "completed"
    },
    {
      id: 5,
      title: "Solar Power Plant",
      department: "Energy",
      startDate: "2024-11-20",
      endDate: "2026-07-30",
      priority: "high",
      progress: 15,
      status: "ongoing"
    },
    {
      id: 6,
      title: "Community Library Construction",
      department: "Education",
      startDate: "2025-04-01",
      endDate: "2026-02-28",
      priority: "low",
      progress: 0,
      status: "upcoming"
    },
    {
      id: 7,
      title: "Water Treatment Facility Upgrade",
      department: "Infrastructure",
      startDate: "2024-08-15",
      endDate: "2025-03-10",
      priority: "medium",
      progress: 78,
      status: "ongoing"
    },
    {
      id: 8,
      title: "Public Transit App Development",
      department: "Transport",
      startDate: "2024-07-01",
      endDate: "2024-12-15",
      priority: "low",
      progress: 100,
      status: "completed"
    },
    {
      id: 9,
      title: "Emergency Response Center",
      department: "Healthcare",
      startDate: "2025-02-01",
      endDate: "2026-05-30",
      priority: "high",
      progress: 0,
      status: "upcoming"
    },
    {
      id: 10,
      title: "Wind Farm Construction",
      department: "Energy",
      startDate: "2024-05-10",
      endDate: "2025-01-20",
      priority: "medium",
      progress: 92,
      status: "ongoing"
    },
    {
      id: 11,
      title: "City Park Renovation",
      department: "Infrastructure",
      startDate: "2024-04-15",
      endDate: "2024-11-30",
      priority: "low",
      progress: 100,
      status: "completed"
    },
    {
      id: 12,
      title: "Telemedicine System Implementation",
      department: "Healthcare",
      startDate: "2024-06-01",
      endDate: "2024-12-15",
      priority: "medium",
      progress: 100,
      status: "completed"
    }
  ];

  // Function to format date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Function to generate priority badge
  function getPriorityBadge(priority) {
    const colors = {
      low: "#10b981",
      medium: "#f59e0b",
      high: "#ef4444"
    };
    
    return `<span class="priority-badge" style="background-color: ${colors[priority]}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>`;
  }

  // Function to render projects
  function renderProjects(filteredProjects) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    if (filteredProjects.length === 0) {
      projectsGrid.innerHTML = '<div class="no-projects">No projects found matching your criteria.</div>';
      return;
    }
    
    filteredProjects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      
      card.innerHTML = `
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-department">${project.department} Department</p>
        </div>
        <div class="project-body">
          <div class="project-detail">
            <span class="detail-label">Start Date</span>
            <span class="detail-value">${formatDate(project.startDate)}</span>
          </div>
          <div class="project-detail">
            <span class="detail-label">End Date</span>
            <span class="detail-value">${formatDate(project.endDate)}</span>
          </div>
          <div class="project-detail">
            <span class="detail-label">Priority</span>
            <span class="detail-value">${getPriorityBadge(project.priority)}</span>
          </div>
          <div class="project-detail">
            <span class="detail-label">Status</span>
            <span class="detail-value">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
          </div>
          <div class="progress-container">
            <div class="project-detail">
              <span class="detail-label">Progress</span>
              <span class="detail-value">${project.progress}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill ${project.priority}-priority" style="width: ${project.progress}%"></div>
            </div>
          </div>
        </div>
      `;
      
      projectsGrid.appendChild(card);
    });
  }

  // Function to filter projects
  function filterProjects() {
    const activeTab = document.querySelector('.filter-tab.active');
    const statusFilter = activeTab.dataset.status;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const departmentFilter = document.getElementById('department-filter').value;
    
    let filteredProjects = projects;
    
    // Filter by status
    if (statusFilter !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.status === statusFilter);
    }
    
    // Filter by department
    if (departmentFilter !== 'all') {
      filteredProjects = filteredProjects.filter(project => 
        project.department.toLowerCase() === departmentFilter
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(searchQuery) || 
        project.department.toLowerCase().includes(searchQuery)
      );
    }
    
    renderProjects(filteredProjects);
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderProjects(projects);
    
    // Set up tab click events
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterProjects();
      });
    });
    
    // Set up search and department filter events
    document.getElementById('search-input').addEventListener('input', filterProjects);
    document.getElementById('department-filter').addEventListener('change', filterProjects);
  });