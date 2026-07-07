import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import ARCPage from './pages/ARCPage';
import AssamRiflesPage from './pages/AssamRiflesPage';
import ArunachalScoutsPage from './pages/ArunachalScoutsPage';
import RashtriyaRiflesPage from './pages/RashtriyaRiflesPage';
import TerritorialArmyPage from './pages/TerritorialArmyPage';
import HomeScreen from './pages/HomeScreen';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <div className="min-h-screen" style={{ background: '#0a0c08' }}>
        {location.pathname !== '/' && <ScrollProgress />}
        <Navbar />
        <ScrollToTop />
        <main>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/arc" element={<ARCPage />} />
              <Route path="/assam-rifles" element={<AssamRiflesPage />} />
              <Route path="/arunachal-scouts" element={<ArunachalScoutsPage />} />
              <Route path="/rashtriya-rifles" element={<RashtriyaRiflesPage />} />
              <Route path="/territorial-army" element={<TerritorialArmyPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        {location.pathname !== '/' && <Footer />}
      </div>
    </HelmetProvider>
  );
}
