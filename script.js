console.log("Portfolio site loaded.");

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Load projects dynamically
document.addEventListener("DOMContentLoaded", () => {
    fetch('project.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const projectList = document.querySelector('.project-list');
            if (projectList) {
                data.projects.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.classList.add('project-item');

                    projectItem.innerHTML = `
                        <h3>
                            <div class="project-logos">
                                ${project.name} |
                                <img src="images/java.png" alt="Java Logo">
                                <img src="images/eclipse.png" alt="Eclipse Logo">
                                <img src="images/vscode.png" alt="VS Code Logo">
                                <img src="images/github.png" alt="GitHub Logo">
                            </div>
                        </h3>
                        <ul>
                            ${project.description.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    `;
                    projectList.appendChild(projectItem);
                });
            } else {
                console.error('No project list container found!');
            }
        })
        .catch(error => console.error("Error loading projects:", error));
});
