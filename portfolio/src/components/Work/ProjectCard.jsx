import React from "react";
import "./ProjectCard.css";

function ProjectCard({ project, isEven }) {
  return (
    <div className={`project-card ${isEven ? "reverse" : ""}`}>
      {/* Left Section - Text */}
      <div className="project-info">
        <p className="project-tag">Featured Project</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-item">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>
    </div>
  );
}

export default ProjectCard;