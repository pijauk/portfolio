import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Preloader from '../components/Preloader';

function Home() {
  const [logoVisible, setLogoVisible] = useState(false);
  const logoSlotRef = useRef(null);

  return (
    <main style={{ minHeight: '100vh' }}>
      <Preloader
        onComplete={() => setLogoVisible(true)}
        logoSlotRef={logoSlotRef}
      />
      <Header
        ref={logoSlotRef}
        logoVisible={logoVisible}
      />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
    </main>
  );
}

export default Home;
