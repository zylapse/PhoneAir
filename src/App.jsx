import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import ProductSection from './components/ProductSection';
import FeaturesSection from './components/FeaturesSection';
import SpecsSection from './components/SpecsSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ReserveModal from './components/ReserveModal';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      <CustomCursor />
      <PageLoader onComplete={() => setLoaded(true)} />
      
      <ReserveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar onReserveClick={() => setIsModalOpen(true)} />

        <HeroSection />

        {/* Architecture & Details */}
        <ProductSection />
        <FeaturesSection />
        <SpecsSection />
        <TeamSection />

        {/* Epic Consolidated Footer */}
        <Footer onReserveClick={() => setIsModalOpen(true)} />
      </div>
    </>
  );
}
