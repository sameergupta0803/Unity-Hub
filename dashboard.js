    //sub menu pop up
    let subMenu = document.getElementById("subMenu");
    function toggleMenu() {
      subMenu.classList.toggle("open-menu");
    }
    // Auto-refresh projects every 5 minutes (300000 milliseconds)
    setInterval(loadProjects, 300000);
    // Fade in animations for project cards
    document.addEventListener("DOMContentLoaded", function () {
      // Set initial opacity for all project cards
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = 1;
        }, 100 * index);
      });

      // Animate progress bars on load
      const progressBars = document.querySelectorAll(".progress-bar");
      setTimeout(() => {
        progressBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
      }, 800);
    });

    // Project Progress Chart
    const progressCtx = document
      .getElementById("projectProgressChart")
      .getContext("2d");
    const progressChart = new Chart(progressCtx, {
      type: "bar",
      data: {
        labels: ["Completed", "Ongoing", "Upcoming"],
        datasets: [
          {
            label: "Projects",
            data: [11, 8, 5],
            backgroundColor: ["#276EF1", "#3498db", "#9b59b6"],
            borderColor: ["#276EF1", "#3498db", "#9b59b6"],
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
          easing: "easeOutQuart",
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              color: "#777",
              font: {
                family: "Poppins",
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#777",
              font: {
                family: "Poppins",
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleFont: {
              family: "Poppins",
              size: 14,
            },
            bodyFont: {
              family: "Poppins",
              size: 13,
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                return `Number of projects: ${context.raw}`;
              },
            },
          },
        },
      },
    });

    // Priority Donut Chart
    const priorityCtx = document
      .getElementById("priorityChart")
      .getContext("2d");
    const priorityChart = new Chart(priorityCtx, {
      type: "doughnut",
      data: {
        labels: ["High", "Medium", "Low"],
        datasets: [
          {
            data: [9, 10, 5],
            backgroundColor: ["#ff4c4c", "#ffb142", "#276EF1"],
            borderWidth: 0,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "90%",
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: "easeOutBounce",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleFont: {
              family: "Poppins",
              size: 16,
            },
            bodyFont: {
              family: "Poppins",
              size: 13,
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const total = context.dataset.data.reduce(
                  (acc, data) => acc + data,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label} Priority: ${value} projects (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    // Function to fetch and display projects
    function loadProjects() {
      fetch("get_projects.php")
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error loading projects:", data.error);
            return;
          }

          displayProjects(data);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }

    // Function to display projects in the dashboard
    function displayProjects(projects) {
      const projectContainer = document.getElementById("dashboard-projects");

      if (!projectContainer) {
        console.error("Project container not found");
        return;
      }

      // Clear the container
      projectContainer.innerHTML = "";

      if (projects.length === 0) {
        projectContainer.innerHTML = "<p>No projects found.</p>";
        return;
      }

      // Create project cards
      projects.forEach((project) => {
        const status =
          project.status.charAt(0).toUpperCase() + project.status.slice(1);
        const priority =
          project.priority.charAt(0).toUpperCase() +
          project.priority.slice(1);

        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <div class="project-info">
                <p><strong>Department:</strong> ${project.department_name}</p>
                <p><strong>Location:</strong> ${project.location}</p>
                <p><strong>Status:</strong> <span class="status status-${project.status
          }">${status}</span></p>
                <p><strong>Priority:</strong> <span class="priority priority-${project.priority
          }">${priority}</span></p>
                <p><strong>Progress:</strong> ${project.progress}%</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.progress
          }%"></div>
                </div>
                <p><strong>Start Date:</strong> ${new Date(
            project.start_date
          ).toLocaleDateString()}  <strong><br>Due Date:</strong> ${new Date(
            project.end_date
          ).toLocaleDateString()}</p>
            </div>
        `;

        projectContainer.appendChild(projectCard);
      });
    }

    // Load projects when the page loads
    document.addEventListener("DOMContentLoaded", loadProjects);

