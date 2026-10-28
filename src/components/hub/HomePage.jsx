import React, { useState, useRef } from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar.jsx';
import HeroSection from './HeroSection.jsx';
import ProjectGrid from './ProjectGrid.jsx';
import AboutModal from './AboutModal.jsx';
import Footer from './Footer.jsx';
import AdBanner from '../common/AdBanner.jsx';

export function HomePage() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const gridRef = useRef(null);

  const scrollToGrid = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Navbar
        onOpenAbout={() => setAboutOpen(true)}
        onScrollToProjects={scrollToGrid}
      />
      <HeroSection onExploreClick={scrollToGrid} />
      <ProjectGrid gridRef={gridRef} />

      {/* Monetization / Sponsor Banner */}
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <AdBanner />
      </Container>

      <Footer />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </Box>
  );
}

export default HomePage;
