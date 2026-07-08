import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import ARCPage from './pages/ARCPage';
import AssamRiflesPage from './pages/AssamRiflesPage';
import ArunachalScoutsPage from './pages/ArunachalScoutsPage';
import RashtriyaRiflesPage from './pages/RashtriyaRiflesPage';
import TerritorialArmyPage from './pages/TerritorialArmyPage';
import HomeScreen from './pages/HomeScreen';

// ARC Sub-Pages
import ARCHistoryPage from './pages/arc/ARCHistoryPage';
import ARCAwardsPage from './pages/arc/ARCAwardsPage';
import ARCGaonBurasPage from './pages/arc/ARCGaonBurasPage';
import ARCGalleryPage from './pages/arc/ARCGalleryPage';
import ARCVideosPage from './pages/arc/ARCVideosPage';

// Assam Units Unit Pages
import AssamRiflesUnitPage from './pages/assam-rifles/AssamRiflesUnitPage';
import AssamRiflesUnitHistoryPage from './pages/assam-rifles/AssamRiflesUnitHistoryPage';
import AssamRiflesUnitAwardsPage from './pages/assam-rifles/AssamRiflesUnitAwardsPage';
import AssamRiflesUnitGaonBurasPage from './pages/assam-rifles/AssamRiflesUnitGaonBurasPage';
import AssamRiflesUnitGalleryPage from './pages/assam-rifles/AssamRiflesUnitGalleryPage';
import AssamRiflesUnitVideosPage from './pages/assam-rifles/AssamRiflesUnitVideosPage';

// Arunachal Scouts Unit Pages
import ArunachalScoutsUnitPage from './pages/arunachal-scouts/ArunachalScoutsUnitPage';
import ArunachalScoutsUnitHistoryPage from './pages/arunachal-scouts/ArunachalScoutsUnitHistoryPage';
import ArunachalScoutsUnitAwardsPage from './pages/arunachal-scouts/ArunachalScoutsUnitAwardsPage';
import ArunachalScoutsUnitGaonBurasPage from './pages/arunachal-scouts/ArunachalScoutsUnitGaonBurasPage';
import ArunachalScoutsUnitGalleryPage from './pages/arunachal-scouts/ArunachalScoutsUnitGalleryPage';
import ArunachalScoutsUnitVideosPage from './pages/arunachal-scouts/ArunachalScoutsUnitVideosPage';

// Rashtriya Rifles Unit Pages
import RashtriyaRiflesUnitPage from './pages/rashtriya-rifles/RashtriyaRiflesUnitPage';
import RashtriyaRiflesUnitHistoryPage from './pages/rashtriya-rifles/RashtriyaRiflesUnitHistoryPage';
import RashtriyaRiflesUnitAwardsPage from './pages/rashtriya-rifles/RashtriyaRiflesUnitAwardsPage';
import RashtriyaRiflesUnitGaonBurasPage from './pages/rashtriya-rifles/RashtriyaRiflesUnitGaonBurasPage';
import RashtriyaRiflesUnitGalleryPage from './pages/rashtriya-rifles/RashtriyaRiflesUnitGalleryPage';
import RashtriyaRiflesUnitVideosPage from './pages/rashtriya-rifles/RashtriyaRiflesUnitVideosPage';

// Territorial Army Unit Pages
import TerritorialArmyUnitPage from './pages/territorial-army/TerritorialArmyUnitPage';
import TerritorialArmyUnitHistoryPage from './pages/territorial-army/TerritorialArmyUnitHistoryPage';
import TerritorialArmyUnitAwardsPage from './pages/territorial-army/TerritorialArmyUnitAwardsPage';
import TerritorialArmyUnitGaonBurasPage from './pages/territorial-army/TerritorialArmyUnitGaonBurasPage';
import TerritorialArmyUnitGalleryPage from './pages/territorial-army/TerritorialArmyUnitGalleryPage';
import TerritorialArmyUnitVideosPage from './pages/territorial-army/TerritorialArmyUnitVideosPage';

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

              {/* ARC Sub-exhibits */}
              <Route path="/arc/history" element={<ARCHistoryPage />} />
              <Route path="/arc/awards" element={<ARCAwardsPage />} />
              <Route path="/arc/gaon-buras" element={<ARCGaonBurasPage />} />
              <Route path="/arc/gallery" element={<ARCGalleryPage />} />
              <Route path="/arc/videos" element={<ARCVideosPage />} />

              {/* Assam Units and Unit Selector */}
              <Route path="/assam-rifles" element={<AssamRiflesPage />} />
              <Route path="/assam-rifles/:unitId" element={<AssamRiflesUnitPage />} />
              <Route path="/assam-rifles/:unitId/history" element={<AssamRiflesUnitHistoryPage />} />
              <Route path="/assam-rifles/:unitId/awards" element={<AssamRiflesUnitAwardsPage />} />
              <Route path="/assam-rifles/:unitId/gaon-buras" element={<AssamRiflesUnitGaonBurasPage />} />
              <Route path="/assam-rifles/:unitId/gallery" element={<AssamRiflesUnitGalleryPage />} />
              <Route path="/assam-rifles/:unitId/videos" element={<AssamRiflesUnitVideosPage />} />

              {/* Arunachal Scouts and Unit Selector */}
              <Route path="/arunachal-scouts" element={<ArunachalScoutsPage />} />
              <Route path="/arunachal-scouts/:unitId" element={<ArunachalScoutsUnitPage />} />
              <Route path="/arunachal-scouts/:unitId/history" element={<ArunachalScoutsUnitHistoryPage />} />
              <Route path="/arunachal-scouts/:unitId/awards" element={<ArunachalScoutsUnitAwardsPage />} />
              <Route path="/arunachal-scouts/:unitId/gaon-buras" element={<ArunachalScoutsUnitGaonBurasPage />} />
              <Route path="/arunachal-scouts/:unitId/gallery" element={<ArunachalScoutsUnitGalleryPage />} />
              <Route path="/arunachal-scouts/:unitId/videos" element={<ArunachalScoutsUnitVideosPage />} />

              {/* Rashtriya Rifles and Unit Selector */}
              <Route path="/rashtriya-rifles" element={<RashtriyaRiflesPage />} />
              <Route path="/rashtriya-rifles/:unitId" element={<RashtriyaRiflesUnitPage />} />
              <Route path="/rashtriya-rifles/:unitId/history" element={<RashtriyaRiflesUnitHistoryPage />} />
              <Route path="/rashtriya-rifles/:unitId/awards" element={<RashtriyaRiflesUnitAwardsPage />} />
              <Route path="/rashtriya-rifles/:unitId/gaon-buras" element={<RashtriyaRiflesUnitGaonBurasPage />} />
              <Route path="/rashtriya-rifles/:unitId/gallery" element={<RashtriyaRiflesUnitGalleryPage />} />
              <Route path="/rashtriya-rifles/:unitId/videos" element={<RashtriyaRiflesUnitVideosPage />} />

              {/* Territorial Army and Unit Selector */}
              <Route path="/territorial-army" element={<TerritorialArmyPage />} />
              <Route path="/territorial-army/:unitId" element={<TerritorialArmyUnitPage />} />
              <Route path="/territorial-army/:unitId/history" element={<TerritorialArmyUnitHistoryPage />} />
              <Route path="/territorial-army/:unitId/awards" element={<TerritorialArmyUnitAwardsPage />} />
              <Route path="/territorial-army/:unitId/gaon-buras" element={<TerritorialArmyUnitGaonBurasPage />} />
              <Route path="/territorial-army/:unitId/gallery" element={<TerritorialArmyUnitGalleryPage />} />
              <Route path="/territorial-army/:unitId/videos" element={<TerritorialArmyUnitVideosPage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </HelmetProvider>
  );
}
