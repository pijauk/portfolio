import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from './SvgIcons';
import { useNarrowHeaderBreakpoint } from '../hooks/useNarrowHeaderBreakpoint';

const Header = forwardRef(function Header({ logoVisible = true }, logoRef) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const isNarrow = useNarrowHeaderBreakpoint();
  const menuOpenCompact = isMenuOpen && isNarrow;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Europe/Vilnius',
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
    { href: '#about', label: 'Apie' },
    { href: '/projects', label: 'Darbai', isRoute: true },
    { href: '#contact', label: 'Kontaktai' },
  ];

  const iconColor = isMenuOpen ? 'white' : scrolled ? 'var(--fg)' : 'white';
  const textColor = isMenuOpen ? 'white' : scrolled ? 'var(--fg)' : 'white';

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const headerNav = (
    <div className="site-header-nav">
      <div className="site-header-slot-left">
        <button
          type="button"
          onClick={() => setIsMenuOpen((o) => !o)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="menu-toggle"
          style={{ 
            color: iconColor,
            visibility: (isMenuOpen && !isNarrow) ? 'hidden' : 'visible'
          }}
        >
          <div className={`menu-toggle-inner ${isMenuOpen ? 'open' : ''}`}>
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
          </div>
        </button>
      </div>

      <a
        ref={logoRef}
        href="/"
        className="site-header-logo"
        onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
        style={{
          color: textColor,
          opacity: logoVisible ? 1 : 0,
          pointerEvents: logoVisible ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }}
      >
        Pi Jan
      </a>

      <div className="site-header-slot-right">
        <div
          className="site-header-meta"
          style={{
            color: textColor,
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
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
          item.isRoute ? (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className="menu-nav-link"
              style={{ transitionDelay: isMenuOpen ? `${(index + 1) * 60}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="menu-nav-link"
              style={{ transitionDelay: isMenuOpen ? `${(index + 1) * 60}ms` : '0ms' }}
            >
              {item.label}
            </a>
          )
        ))}
      </nav>

      <div
        className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-lg-between gap-4"
        style={{
          transition: 'all 0.5s',
          transitionDelay: isMenuOpen ? '320ms' : '0ms',
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <div>
          {['Instagram', 'LinkedIn'].map((label) => (
            <a key={label} href="#" className="menu-secondary-link d-block mb-1">
              {label}
            </a>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
          <a href="mailto:hello@pijan.design" className="menu-secondary-link d-block">
            hello@pijan.design
          </a>
        </div>
      </div>

      <a
        href="#contact"
        onClick={() => setIsMenuOpen(false)}
        className="menu-cta"
        style={{
          transitionDelay: isMenuOpen ? '380ms' : '0ms',
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <ArrowUpRight size={16} strokeWidth={1.5} />
        <span>Susisiekite</span>
      </a>
    </>
  );

  return (
    <>
      {!(isNarrow && isMenuOpen) && (
        <header
          className={`site-header ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
          style={{ color: isMenuOpen ? 'white' : (scrolled ? 'var(--fg)' : 'white') }}
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
});

export default Header;
