import React from 'react';
import { ArrowUpRight } from './SvgIcons';

function Hero() {
  return (
    <section className="hero-section">
      {/* Background nuotrauka */}
      <div className="hero-bg" style={{ backgroundColor: '#1a1a1a' }}>
        <img
          src="/hero.png"
          alt="Dinamiška judesio vizualizacija, atspindinti kūrybinę energiją ir judėjimą į priekį"
        />
      </div>

      {/* Overlay */}
      <div className="hero-content">
        {/* Info */}
        <div className="hero-meta">
          <div className="hero-meta-inner">
            <span className="uppercase animate-fade-in delay-300">
              UI/UX dizainas
            </span>
            <span className="uppercase animate-fade-in delay-400 hero-meta-hide-sm">
              Fintech
            </span>
            <span className="animate-fade-in delay-500 hero-meta-hide-sm">
              ( 2026 )
            </span>
            <a
              href="/projects/fintech-dashboard"
              className="d-flex align-items-center gap-2 animate-fade-in delay-600"
              style={{ color: 'white', transition: 'opacity 0.3s' }}
            >
              <span className="uppercase">Žiūrėti projektą</span>
              <ArrowUpRight size={17} strokeWidth={2} className="arrow-hover" />
            </a>
          </div>
        </div>

        {/* Pagrindinis tekstas */}
        <div className="animate-fade-in-up delay-400">
          <h1 className="hero-title tracking-tight text-balance">
            Sėkmė prasideda čia.
            <br />
            Dizainas, kuris konvertuoja.
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
