import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from './SvgIcons';
import { useNarrowHeaderBreakpoint } from '../hooks/useNarrowHeaderBreakpoint';

function ProjectHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isNarrow = useNarrowHeaderBreakpoint();
  const menuOpenCompact = isMenuOpen && isNarrow;

  const isProjectDetailPage = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit',
          hour12: true, timeZone: 'Europe/Vilnius',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Pagrindinis' },
    { href: '/#about', label: 'Apie' },
    { href: '/projects', label: 'Darbai' },
    { href: '/#contact', label: 'Kontaktai' },
  ];

  const bgColor = scrolled ? 'rgba(0,0,0,0.9)' : 'transparent';

  const headerNav = (
    <div className="site-header-nav">
      <div className="site-header-slot-left">
        {isProjectDetailPage ? (
          <Link
            to="/projects"
            className="d-flex align-items-center gap-2"
            style={{ fontSize: '0.875rem', letterSpacing: '0.05em', transition: 'opacity 0.3s' }}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="d-none d-sm-inline">Visi projektai</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle"
            style={{ 
              color: isMenuOpen ? 'white' : 'var(--fg)',
              visibility: (isMenuOpen && !isNarrow) ? 'hidden' : 'visible'
            }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className={`menu-toggle-inner ${isMenuOpen ? 'open' : ''}`}>
              <span className="menu-toggle-bar" />
              <span className="menu-toggle-bar" />
            </div>
          </button>
        )}
      </div>

      <Link to="/" className="site-header-logo">
        Pi Jan
      </Link>

      <div className="site-header-slot-right">
        <div className="site-header-meta">
          <span className="d-block">Lietuva, Vilnius</span>
          <span className="d-block site-header-meta-time">{currentTime}</span>
        </div>
      </div>
    </div>
  );

  const menuBody = (
    <>
      <span className="menu-label">Meniu</span>
      <nav className="mb-3">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="menu-nav-link"
            style={{ transitionDelay: isMenuOpen ? `${(index + 1) * 50}ms` : '0ms' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-lg-between gap-4"
        style={{
          transition: 'all 0.5s',
          transitionDelay: isMenuOpen ? '300ms' : '0ms',
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <div>
          {['Instagram', 'LinkedIn'].map((label) => (
            <a key={label} href="#" className="menu-secondary-link d-block mb-1">{label}</a>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
          <a href="mailto:hello@pijan.design" className="menu-secondary-link d-block">
            hello@pijan.design
          </a>
        </div>
      </div>

      <Link
        to="/#contact"
        onClick={() => setIsMenuOpen(false)}
        className="menu-cta"
        style={{
          transitionDelay: isMenuOpen ? '350ms' : '0ms',
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <ArrowUpRight size={16} strokeWidth={1.5} />
        <span>Susisiekite</span>
      </Link>
    </>
  );

  return (
    <>
      {!(isNarrow && isMenuOpen) && (
        <header
          className={`site-header ${isMenuOpen ? 'menu-open' : ''}`}
          style={{
            background: isMenuOpen ? 'transparent' : bgColor,
            backdropFilter: isMenuOpen ? 'none' : (scrolled ? 'blur(12px)' : 'none'),
            color: isMenuOpen ? 'white' : 'var(--fg)',
          }}
        >
          <nav>{headerNav}</nav>
        </header>
      )}

      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />

        {menuOpenCompact ? (
          <div className="menu-stack">
            <div className="menu-card">
              <div className="menu-card-header">
                <nav aria-label="Primary">{headerNav}</nav>
              </div>
              <div className="menu-card-body">
                {menuBody}
              </div>
            </div>
          </div>
        ) : (
          <div className="menu-panel">
            <div className="menu-panel-header">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="menu-toggle"
                style={{ color: 'white' }}
              >
                <div className="menu-toggle-inner open">
                  <span className="menu-toggle-bar" />
                  <span className="menu-toggle-bar" />
                </div>
              </button>
            </div>
            {menuBody}
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectHeader;
