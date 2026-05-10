import React, { useState, useEffect, useRef } from 'react';

function Preloader({ onComplete, logoSlotRef }) {
  const [phase, setPhase] = useState('pulse'); // pulsas, keliauja, baigta
  const logoRef = useRef(null);

  // 1.2s veikia pirma animacija, tada keliauja
  useEffect(() => {
    const t = setTimeout(() => setPhase('travel'), 1200);
    return () => clearTimeout(t);
  }, []);

  //Kai ijungia keliavimasi, matuojam kur turi atsidurti
  useEffect(() => {
    if (phase !== 'travel') return;
    if (!logoRef.current || !logoSlotRef.current) return;

    const slot = logoSlotRef.current.getBoundingClientRect();
    const logo = logoRef.current;

    const targetLeft = slot.left + slot.width / 2;
    const targetTop = slot.top + slot.height / 2;

    logo.style.left = `${targetLeft}px`;
    logo.style.top = `${targetTop}px`;
    logo.style.fontSize = window.getComputedStyle(logoSlotRef.current).fontSize;

    const t = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 750);
    return () => clearTimeout(t);
  }, [phase, logoSlotRef, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      {/* Fonas issilieja kai logotipas keliauja */}
      <div
        className="preloader-overlay"
        style={{
          opacity: phase === 'travel' ? 0 : 1,
          transitionDelay: phase === 'travel' ? '200ms' : '0ms',
        }}
      />

      {/* Vientisas animuotas logotipas */}
      <div
        ref={logoRef}
        className="preloader-logo"
        style={{
          transition: phase === 'travel'
            ? 'left 700ms cubic-bezier(0.22,1,0.36,1), top 700ms cubic-bezier(0.22,1,0.36,1), font-size 700ms cubic-bezier(0.22,1,0.36,1)'
            : 'none',
          animation: phase === 'pulse' ? 'logo-pulse 1.4s ease-in-out infinite' : 'none',
        }}
      >
        Pi Jan
      </div>
    </>
  );
}

export default Preloader;
