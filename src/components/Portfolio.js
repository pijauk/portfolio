import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from './SvgIcons';
import { getFeaturedProjects } from '../data/projects';

const featuredProjects = getFeaturedProjects();

function Portfolio() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const vis = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
  });

  return (
    <section id="portfolio" ref={sectionRef} className="portfolio-section">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-md-between gap-4 mb-5">
          <div style={vis(0)}>
            <span className="section-label d-block mb-3">( Darbai )</span>
            <h2 className="tracking-tight" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
              Išskirtiniai projektai
            </h2>
          </div>
          <div style={vis(200)}>
            <p className="text-muted text-balance" style={{ maxWidth: '28rem' }}>
              Kuratoriškai atrinkti projektai, pristatantys mano požiūrį į
              problemų sprendimą ir dizaino meistriškumą.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="row g-4 g-lg-5">
          {featuredProjects.map((project, index) => (
            <div className="col-md-6" key={project.id}>
              <Link
                to={`/projects/${project.slug}`}
                className="project-card d-block"
                style={vis((index + 2) * 100)}
                onMouseEnter={() => setHoveredProject(Number(project.id))}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* nuotraukos Container */}
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-card-overlay">
                    <div className="project-card-overlay-text">
                      <span>Žiūrėti projektą</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Projekto Info */}
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span className="section-label" style={{ letterSpacing: '0.15em' }}>
                        {project.category}
                      </span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {project.year}
                      </span>
                    </div>
                    <h3 className="tracking-tight mb-1" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}>
                      {project.title}
                    </h3>
                    <p className="text-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                      {project.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    style={{
                      flexShrink: 0,
                      marginTop: '0.25rem',
                      color: hoveredProject === Number(project.id) ? 'var(--fg)' : 'var(--muted)',
                      transform: hoveredProject === Number(project.id) ? 'translate(2px, -2px)' : 'none',
                      transition: 'all 0.3s',
                    }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Visi projektai */}
        <div className="d-flex justify-content-center mt-5" style={vis(700)}>
          <Link to="/projects" className="btn-primary-dark">
            <span>Visi projektai</span>
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
