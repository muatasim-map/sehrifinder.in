import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ListingCard } from './components/ListingCard';
import { BottomNav } from './components/BottomNav';
import { IslamicPattern } from './components/Pattern';
import { Search, Loader2, Heart } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { fetchSehriSpots } from './services/spotService';
import { getStoredCity, setStoredCity, getSavedSpots, setSavedSpots } from './utils/storage';
import { calculateDistance } from './utils/distance';
import { SehriSpot } from './types';
import { Toaster, toast } from 'sonner';
import { FilterType } from './components/FilterChips';
import { SubmitSpot } from './components/SubmitSpot';
import { ReloadPrompt } from './components/ReloadPrompt';

// Lazy load the Landing Page
const LandingPage = lazy(() => import('./components/LandingPage').then(module => ({ default: module.LandingPage })));
import { MapView } from './components/MapView';
import { EmptyState } from './components/EmptyState';
import { useSpotFilter } from './hooks/useSpotFilter';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SplashScreen } from './components/SplashScreen';

const SUPPORTED_CITIES = ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai'];

export default function App() {
  // SPLASH SCREEN STATE
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash only if not shown in this session
    return !sessionStorage.getItem('hasShownSplash');
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasShownSplash', 'true');
  };

  // PARALLAX BACKGROUND
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]); // Move up slightly as user scrolls down

  // State to control View Mode: 'landing', 'app', 'submit', 'admin-login', 'admin-dashboard'
  const [viewMode, setViewMode] = useState<'landing' | 'app' | 'submit' | 'admin-login' | 'admin-dashboard'>('landing');
  const [viewType, setViewType] = useState<'list' | 'map'>('list');

  // App Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'saved'>('home');

  // DATA STATE
  const [allSpots, setAllSpots] = useState<SehriSpot[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // USER PREFERENCE STATE
  const [savedSpotIds, setSavedSpotIds] = useState<number[]>([]);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  // Initialize City from Storage
  const [selectedCity, setSelectedCity] = useState<string>(() => getStoredCity('Chennai'));

  // Toast State Replaced by Sonner

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (type === 'success') toast.success(message);
    else if (type === 'error') toast.error(message);
    else toast.info(message);
  };

  // Secret Admin Access (Long press on logo or specific action could trigger this)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A to open Admin Login
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setViewMode('admin-login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // FETCH DATA ON MOUNT
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const data = await fetchSehriSpots();
        setAllSpots(data);
        // Load saved spots from local storage
        setSavedSpotIds(getSavedSpots());
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  // Persist city changes
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setStoredCity(city);
    setSelectedArea(null); // Clear area filter when switching cities
    if (activeTab === 'saved') setActiveTab('home'); // Switch back to home if filtered by city
  };

  // Toggle Saved Spot
  const toggleSave = (id: number) => {
    setSavedSpotIds(prev => {
      const isSaving = !prev.includes(id);
      const newSaved = isSaving
        ? [...prev, id]
        : prev.filter(savedId => savedId !== id);

      setSavedSpots(newSaved); // Persist

      // Trigger Toast
      const spotName = allSpots.find(s => s.id === id)?.name || 'Spot';
      showToast(
        isSaving ? `${spotName} saved to favorites` : `${spotName} removed from favorites`,
        'success'
      );

      return newSaved;
    });
  };

  // Handle Bottom Nav Tab Change
  const handleTabChange = (tab: 'home' | 'search' | 'saved') => {
    setActiveTab(tab);
    if (tab === 'home') {
      setSearchTerm('');
      setSelectedArea(null);
    }
  };

  const handleToggleFilter = (filter: FilterType) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Filter Logic - Extracted to Hook
  const filteredData = useSpotFilter({
    allSpots,
    activeTab,
    savedSpotIds,
    selectedCity,
    searchTerm,
    selectedArea,
    activeFilters
  });

  // --- GEOLOCATION & NEAR ME LOGIC ---
  const handleNearMe = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setIsLoadingData(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Calculate distance for ALL spots
        const spotsWithDistance = allSpots.map(spot => {
          let distanceStr = "N/A";
          let distanceVal = Infinity;

          if (spot.latitude && spot.longitude) {
            const dist = calculateDistance(latitude, longitude, spot.latitude, spot.longitude);
            distanceVal = dist;
            distanceStr = `${dist} km`;
          }

          return { ...spot, distance: distanceStr, _distanceVal: distanceVal };
        });

        // Convert the modified spots back to SehriSpot (removing the temporary _distanceVal for state)
        // But first, we need to SORT them.
        spotsWithDistance.sort((a, b) => a._distanceVal - b._distanceVal);

        // Update the state with the sorted spots
        const sortedSpots = spotsWithDistance.map(({ _distanceVal, ...spot }) => spot);
        setAllSpots(sortedSpots);

        showToast('Spots sorted by distance! 📍');
        setIsLoadingData(false);
      },
      (error) => {
        console.error("Error getting location", error);
        showToast('Unable to retrieve your location. Please allow access.', 'error');
        setIsLoadingData(false);
      }
    );
  };

  // Calculate unique areas available for the CURRENT view context
  const availableAreas = useMemo(() => {
    // If in saved tab, show areas from saved spots. If home, show areas from city.
    let sourceData = activeTab === 'saved'
      ? allSpots.filter(item => savedSpotIds.includes(item.id))
      : allSpots.filter(item => item.city === selectedCity);

    const uniqueAreas = Array.from(new Set(sourceData.map(d => d.area))).sort();
    return uniqueAreas;
  }, [selectedCity, allSpots, activeTab, savedSpotIds]);

  // Handle empty state
  const hasResults = filteredData.length > 0;
  const isCitySupported = SUPPORTED_CITIES.includes(selectedCity);

  const handleClearFilters = () => {
    if (activeTab === 'saved') {
      setActiveTab('home');
    } else {
      setSearchTerm('');
      setSelectedArea(null);
      setActiveFilters([]); // Clear filters too
      if (!isCitySupported) handleCityChange('Chennai');
    }
  };

  // --- PAGE TRANSITION VARIANTS ---
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zillij font-sans relative overflow-x-hidden">
        {/* Global Background Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <IslamicPattern opacity={0.06} variant="hexagonal" className="text-primary-dark" />
        </div>

        {/* Global Toast Notification */}
        <Toaster position="top-center" richColors />

        <ReloadPrompt />

        {/* Splash Screen */}
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}

        <AnimatePresence mode="wait">
          {viewMode === 'landing' && (
            <motion.div
              key="landing"
              {...pageVariants}
              className="absolute inset-0 z-20"
            >
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-emerald-midnight text-gold-lantern">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span className="font-brand tracking-widest text-sm">LOADING SEHRI FINDER</span>
                  </div>
                </div>
              }>
                <LandingPage
                  onEnterApp={() => setViewMode('app')}
                  onOpenSubmit={() => setViewMode('submit')}
                />
              </Suspense>
            </motion.div>
          )}

          {viewMode === 'submit' && (
            <motion.div
              key="submit"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 z-30 bg-white"
            >
              <SubmitSpot onBack={() => setViewMode('app')} />
            </motion.div>
          )}

          {viewMode === 'app' && (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col min-h-screen"
            >
              <Header onOpenSubmit={() => setViewMode('submit')} />

              <Hero
                onSearch={setSearchTerm}
                onFilterChange={handleToggleFilter}
                onOpenSubmit={() => setViewMode('submit')}
                viewType={viewType}
                onViewChange={setViewType}
                onNearMe={handleNearMe}
              />

              <main className="flex-1 container mx-auto px-4 py-8 max-w-[1440px] relative z-10 -mt-8">
                <FilterBar
                  selectedCity={selectedCity}
                  onSelectCity={handleCityChange}
                  selectedArea={selectedArea}
                  onSelectArea={setSelectedArea}
                  activeFilters={activeFilters}
                  onToggleFilter={handleToggleFilter}
                  areas={availableAreas}
                  totalSpots={filteredData.length}
                />

                {isLoadingData ? (
                  <div className="flex flex-col items-center justify-center py-20 opacity-70">
                    <Loader2 className="w-10 h-10 animate-spin text-gold-lantern mb-2" />
                    <p className="text-xs font-bold tracking-widest text-primary-dark">FETCHING SPOTS...</p>
                  </div>
                ) : (
                  <>
                    {viewType === 'list' ? (
                      !hasResults ? (
                        <EmptyState
                          activeTab={activeTab}
                          selectedCity={selectedCity}
                          isCitySupported={isCitySupported}
                          hasFilters={activeFilters.length > 0}
                          onClear={handleClearFilters}
                        />
                      ) : (
                        <motion.div
                          layout
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24"
                        >
                          <AnimatePresence mode='popLayout'>
                            {filteredData.map((spot) => (
                              <motion.div
                                layout
                                key={spot.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ListingCard
                                  data={spot}
                                  isSaved={savedSpotIds.includes(spot.id)}
                                  onToggleSave={toggleSave}
                                />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      )
                    ) : (
                      <div className="pb-24">
                        <MapView spots={filteredData} />
                      </div>
                    )}
                  </>
                )}
              </main>

              {/* Active Tab Indicator (Mobile/Desktop Visual Cue) */}
              {activeTab === 'saved' && (
                <div className="container mx-auto px-4 mt-6 mb-2">
                  <div className="flex items-center gap-2 text-primary-dark border-b border-gray-200 pb-2">
                    <Heart className="fill-primary text-primary w-5 h-5" />
                    <h2 className="font-brand font-bold text-lg">My Saved Spots</h2>
                  </div>
                </div>
              )}

              <BottomNav
                activeTab={activeTab}
                onTabChange={handleTabChange}
                savedCount={savedSpotIds.length}
              />
            </motion.div>
          )}

          {viewMode === 'admin-login' && (
            <motion.div
              key="admin-login"
              className="absolute inset-0 z-50 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminLogin
                onLoginSuccess={() => setViewMode('admin-dashboard')}
                onBack={() => setViewMode('app')}
              />
            </motion.div>
          )}

          {viewMode === 'admin-dashboard' && (
            <motion.div
              key="admin-dashboard"
              className="absolute inset-0 z-50 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard
                onLogout={() => setViewMode('app')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
