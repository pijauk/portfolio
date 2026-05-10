import React, { useEffect, useRef, useState } from 'react';

function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skills = [
    'Produkto dizainas', 'UX strategija', 'UI dizainas', 'Dizaino sistemos',
    'Prekės ženklo identitetas', 'Prototipavimas', 'Vartotojų tyrimai', 'Judesio dizainas',
  ];

  const vis = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
  });

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl">
        {/* Label */}
        <div style={vis(0)} className="mb-5">
          <span className="section-label">( Apie )</span>
        </div>

        {/* Pagrindinis*/}
        <div style={vis(200)} className="mb-5">
          <h2 className="about-heading tracking-tight text-balance" style={{ maxWidth: '64rem' }}>
            Kuriu skaitmeninius produktus, kurie sujungia prekės ženklus su jų
            auditorijomis per apgalvotą, į žmogų orientuotą dizainą.
          </h2>
        </div>

        {/* Bio */}
        <div className="row g-4 g-lg-5 mt-4">
          <div className="col-lg-6" style={vis(400)}>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
              Turėdamas daugiau nei penkerių metų patirties dizaino srityje, specializuojuosi
              kuriant intuityvias skaitmenines patirtis, kurios skatina verslo
              rezultatus. Mano požiūris derina strateginį mąstymą su kruopščiu
              dėmesiu detalėms.
            </p>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
              Turėjau privilegiją dirbti su įvairiomis
              įmonėmis. Kiekvienas projektas yra galimybė
              peržengti kūrybines ribas sprendiant realias
              problemas.
            </p>
          </div>

          <div className="col-lg-6" style={vis(500)}>
            <h3 className="section-label mb-4">Kompetencijos</h3>
            <div className="d-flex flex-wrap">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
