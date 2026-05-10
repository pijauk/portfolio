import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from '../components/SvgIcons';
import ProjectHeader from '../components/ProjectHeader';
import { getProjectBySlug, projects } from '../data/projects';
import Contact from '../components/Contact';

function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <h2>Projektas nerastas</h2>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const vis = (delay = 0) => ({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
  });

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ProjectHeader />

      {/* Hero Section */}
      <section style={{ paddingTop: '8rem', paddingBottom: '2rem' }} className="px-4 px-lg-5">
        <div className="container-fluid max-w-7xl">
          <div className="d-flex flex-wrap align-items-center gap-3 mb-4" style={vis(0)}>
            <span className="section-label mb-0">{project.category}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--muted)' }} />
            <span className="section-label mb-0">{project.year}</span>
          </div>

          <h1 className="tracking-tight text-balance mb-4" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', maxWidth: '56rem', ...vis(100) }}>
            {project.title}
          </h1>

          <p className="text-muted mb-5" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', maxWidth: '42rem', ...vis(200) }}>
            {project.description}
          </p>
        </div>
      </section>

      {/* pagrindine nuotrauka */}
      <section className="px-4 px-lg-5 mb-5 pb-5" style={{ ...vis(300), transitionDuration: '1s' }}>
        <div className="container-fluid max-w-7xl">
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Projekto detalės */}
      <section className="px-4 px-lg-5 mb-5 pb-5">
        <div className="container-fluid max-w-7xl">
          <div className="row g-5">
            {/*Šoninė juosta*/}
            <div className="col-lg-4">
              <ProjectDetailItem label="Klientas" value={project.client} />
              <ProjectDetailItem label="Rolė" value={project.role} />
              <ProjectDetailItem label="Trukmė" value={project.duration} />
              <ProjectDetailItem label="Metai" value={project.year} />

              <div className="mt-5">
                <span className="section-label d-block mb-3">Paslaugos</span>
                <div className="d-flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* turinys */}
            <div className="col-lg-8">
              <AnimatedSection>
                <h2 className="tracking-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}>Apžvalga</h2>
                <p className="text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
                  {project.longDescription}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Iššūkis & Sprendimas */}
      <section className="px-4 px-lg-5 mb-5 pb-5 pt-5" style={{ background: 'var(--secondary-bg)' }}>
        <div className="container-fluid max-w-7xl" style={{ padding: '6rem 0' }}>
          <div className="row g-5">
            <div className="col-md-6">
              <AnimatedSection>
                <span className="section-label d-block mb-4">( Iššūkis )</span>
                <p className="leading-relaxed" style={{ fontSize: '1.125rem' }}>{project.challenge}</p>
              </AnimatedSection>
            </div>
            <div className="col-md-6">
              <AnimatedSection delay={150}>
                <span className="section-label d-block mb-4">( Sprendimas )</span>
                <p className="leading-relaxed" style={{ fontSize: '1.125rem' }}>{project.solution}</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Kitas projektas */}
      <section>
        <Link to={`/projects/${nextProject.slug}`} className="next-project-link px-4 px-lg-5">
          <div className="container-fluid max-w-7xl">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-4">
              <div>
                <span className="section-label d-block mb-3">Kitas projektas</span>
                <h2 className="tracking-tight mb-0" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
                  {nextProject.title}
                </h2>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="section-label mb-0" style={{ color: 'var(--muted)' }}>Žiūrėti projektą</span>
                <div className="next-project-arrow">
                  <ArrowRight size={20} strokeWidth={1.5} className="arrow-hover" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <Contact />
    </main>
  );
}

function ProjectDetailItem({ label, value }) {
  return (
    <div className="project-detail-item">
      <span className="section-label d-block mb-1">{label}</span>
      <span style={{ fontSize: '1rem' }}>{value}</span>
    </div>
  );
}

function AnimatedSection({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function GalleryImage({ src, alt, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="gallery-image"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease-out ${index * 100}ms, transform 0.7s ease-out ${index * 100}ms`,
      }}
    >
      <img src={src} alt={alt} />
    </div>
  );
}

function ResultCard({ result, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="result-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease-out ${index * 100}ms, transform 0.7s ease-out ${index * 100}ms`,
      }}
    >
      <span className="result-number d-block">
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </span>
      <p className="text-muted leading-relaxed mb-0" style={{ fontSize: '0.875rem' }}>{result}</p>
    </div>

  );
}

export default ProjectDetail;
