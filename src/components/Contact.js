import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from './SvgIcons';

function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'Behance', href: '#' },
  ];

  const vis = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
  });

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl">
        {/* Main */}
        <div className="row g-4 g-lg-5">
          {/* Kaire */}
          <div className="col-lg-6">
            <div style={vis(0)}>
              <span className="section-label d-block mb-3">( Susisiekite )</span>
              <h2 className="contact-heading tracking-tight mb-4 text-balance">
                Sukurkime kažką nuostabaus kartu.
              </h2>
              <p className="text-muted leading-relaxed" style={{ maxWidth: '28rem', fontSize: '1.125rem' }}>
                Turite projektą mintyse? Mielai apie tai išgirsčiau. Parašykite
                žinutę ir kartu patyrinėkime galimybes.
              </p>
            </div>

            <div style={vis(200)} className="mt-5">
              <a
                href="mailto:hello@pijan.design"
                style={{ fontSize: '1.25rem', transition: 'opacity 0.3s' }}
                className="d-block mb-2"
              >
                hello@pijan.design
              </a>
              <p className="text-muted">Lietuva, Vilnius</p>
            </div>
          </div>

          {/* Desine forma */}
          <div className="col-lg-6" style={vis(300)}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <label htmlFor="name" className="form-label">Vardas</label>
                  <input type="text" id="name" className="form-input" placeholder="Jūsų vardas" />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="email" className="form-label">El. paštas</label>
                  <input type="email" id="email" className="form-input" placeholder="jusu@elpastas.lt" />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="project" className="form-label">Projekto tipas</label>
                <select id="project" className="form-input" style={{ appearance: 'none' }}>
                  <option value="">Pasirinkite projekto tipą</option>
                  <option value="product-design">Produkto dizainas</option>
                  <option value="brand-identity">Prekės ženklo identitetas</option>
                  <option value="ux-audit">UX auditas</option>
                  <option value="consulting">Dizaino konsultacijos</option>
                  <option value="other">Kita</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label">Žinutė</label>
                <textarea
                  id="message"
                  rows={4}
                  className="form-input"
                  placeholder="Papasakokite apie savo projektą..."
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn-primary-dark mt-2">
                <span>Siųsti žinutę</span>
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-5 pt-4"
          style={{ borderTop: '1px solid var(--border-color)', ...vis(500) }}
        >
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-4">
            <div className="d-flex align-items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted"
                  style={{ fontSize: '0.875rem', transition: 'color 0.3s' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="text-muted" style={{ fontSize: '0.875rem' }}>
              &copy; 2026 Pijus Jankauskas.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
