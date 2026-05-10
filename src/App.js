import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';

// Perkeliama į anchor pradinio įkelimo arba keičiant maršrutą
function ScrollToAnchor() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      //Šiek tiek uždelsiama, kad komponentas būtų įkeltas
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash, pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
