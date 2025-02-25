class ProjectManager {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.modal = document.getElementById('projectModal');
        this.form = document.getElementById('projectForm');
        this.projectList = document.getElementById('projectList');
        this.sortSelect = document.getElementById('sortType');

        this.init();
    }

    init() {
        // Modal controls
        document.getElementById('createProjectBtn').addEventListener('click', () => this.openModal());
        document.querySelector('.close-button').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.sortSelect.addEventListener('change', () => this.renderProjects());
        this.renderProjects();
    }

    openModal() {
        this.modal.style.display = 'flex';
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.form.reset();
    }

    handleSubmit(e) {
        e.preventDefault();

        const project = {
            id: Date.now(),
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDescription').value,
            date: document.getElementById('projectDate').value,
            priority: document.getElementById('projectPriority').value
        };

        this.projects.push(project);
        this.saveProjects();
        this.renderProjects();
        this.closeModal();
    }

    async deleteProject(id) {
        const projectElement = document.querySelector(`[data-id="${id}"]`);
        projectElement.style.animation = 'slideUp 0.5s ease reverse';

        await new Promise(resolve => setTimeout(resolve, 500));

        this.projects = this.projects.filter(project => project.id !== id);
        this.saveProjects();
        this.renderProjects();
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    sortProjects() {
        const sortType = this.sortSelect.value;

        if (sortType === 'priority') {
            return [...this.projects].sort((a, b) => {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                if (priorityDiff === 0) {
                    return new Date(a.date) - new Date(b.date);
                }
                return priorityDiff;
            });
        } else {
            return [...this.projects].sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    }

    renderProjects() {
        this.projectList.innerHTML = '';

        const sortedProjects = this.sortProjects();

        sortedProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = `project-item ${project.priority}-priority`;
            projectElement.setAttribute('data-id', project.id);
            projectElement.innerHTML = `
                <div class="project-info">
                    <div class="project-priority priority-${project.priority}">
                        ${project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                    </div>
                    <h3>${project.name}</h3>
                    <div class="project-description">${project.description}</div>
                    <div class="project-date">Due: ${this.formatDate(project.date)}</div>
                    <button class="btn-delete" onclick="projectManager.deleteProject(${project.id})">
                        Delete
                    </button>
                </div>
            `;
            this.projectList.appendChild(projectElement);
        });
    }
}

const projectManager = new ProjectManager();