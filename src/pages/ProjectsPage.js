import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '../components/SvgIcons';
import ProjectHeader from '../components/ProjectHeader';
import Contact from '../components/Contact';
import { projects, getAllCategories } from '../data/projects';

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('Visi');
  const [isLoaded, setIsLoaded] = useState(false);
  const categories = ['Visi', ...getAllCategories()];

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeFilter === 'Visi'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const vis = (delay = 0) => ({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 1s ease-out ${delay}ms, transform 1s ease-out ${delay}ms`,
  });

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ProjectHeader />

      {/* Hero */}
      <section style={{ paddingTop: '12rem', paddingBottom: '6rem' }} className="px-4 px-lg-5">
        <div className="container-fluid max-w-7xl">
          <h1
            className="tracking-tight mb-5"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', ...vis(0) }}
          >
            Darbai
          </h1>

          {/* Filteriai*/}
          <div className="d-flex flex-wrap gap-3" style={vis(200)}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projektai */}
      <section style={{ paddingBottom: '8rem' }} className="px-4 px-lg-5">
        <div className="container-fluid max-w-7xl">
          <div className="row g-4 g-lg-5">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}

function ProjectCard({ project, index, isLoaded }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const show = isVisible && isLoaded;
  const delay = (index % 2) * 150 + 300;

  return (
    <div className="col-md-6">
      <Link
        ref={cardRef}
        to={`/projects/${project.slug}`}
        className="project-card d-block"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(48px)',
          transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="project-card-image">
          <img
            src={project.image}
            alt={project.title}
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="project-card-overlay" style={{ opacity: isHovered ? 1 : 0 }}>
            <div className="project-card-overlay-text">
              <span>Žiūrėti projektą</span>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                style={{
                  transform: isHovered ? 'translate(4px, -4px)' : 'none',
                  transition: 'transform 0.3s',
                }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex align-items-start justify-content-between gap-3">
          <div>
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="section-label" style={{ letterSpacing: '0.15em' }}>
                {project.category}
              </span>
            </div>
            <h3 className="tracking-tight" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', opacity: isHovered ? 0.6 : 1, transition: 'opacity 0.3s' }}>
              {project.title}
            </h3>
          </div>
          <span className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
            {project.year}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ProjectsPage;
