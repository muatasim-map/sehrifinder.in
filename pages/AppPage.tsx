import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { ListingCard } from '../components/ListingCard';
import { BottomNav } from '../components/BottomNav';
import { Loader2, Heart } from 'lucide-react';
import { MapView } from '../components/MapView';
import { EmptyState } from '../components/EmptyState';
import { useSehri } from '../context/SehriContext';
import { COUNTRIES } from '../data/locations';

const AppPage: React.FC = () => {
    const navigate = useNavigate();
    const { city } = useParams<{ city?: string }>();
    const [viewType, setViewType] = useState<'list' | 'map'>('list');

    const {
        isLoadingData,
        filteredData,
        savedSpotIds,
        selectedCountry,
        selectedCity,
        selectedArea,
        selectedZone,
        activeFilters,
        availableAreas,
        availableZones,
        isCitySupported,
        setSelectedCountry,
        setSelectedCity,
        setSelectedArea,
        setSelectedZone,
        handleToggleFilter,
        toggleSave,
        handleNearMe,
        handleClearFilters,
        activeTab,
        setActiveTab,
        setSearchTerm
    } = useSehri();

    // Sync route param with context city (URL -> State)
    useEffect(() => {
        if (city && city.toLowerCase() !== selectedCity.toLowerCase()) {
            const supported = COUNTRIES.flatMap(c => c.cities);
            const match = supported.find(c => c.toLowerCase() === city.toLowerCase());
            if (match) setSelectedCity(match);
        }
    }, [city, selectedCity, setSelectedCity]);

    // URL is the Single Source of Truth.
    // We only listen to URL changes to update state (above).
    // We do NOT automatically push state changes to URL to avoid loops.

    const handleCityChange = (newCity: string) => {
        // When user selects a city manually, we navigate.
        // This will trigger the URL -> State effect above.
        navigate(`/find/${newCity.toLowerCase()}`);
    };

    const handleCountryChange = (countryName: string) => {
        // Update country in context first
        setSelectedCountry(countryName);
        // Navigate to the first city of the new country so URL stays in sync.
        // The URL->State effect above will then update the city state correctly.
        const country = COUNTRIES.find(c => c.name === countryName);
        if (country && country.cities.length > 0) {
            navigate(`/find/${country.cities[0].toLowerCase()}`);
        }
    };

    // Handle Bottom Nav Tab Change
    const handleTabChange = (tab: 'home' | 'search' | 'saved') => {
        setActiveTab(tab);
        if (tab === 'home') {
            setSearchTerm('');
            setSelectedArea(null);
        }
    };

    const hasResults = filteredData.length > 0;

    return (
        <div className="relative z-10 flex flex-col min-h-screen">
            <Header onOpenSubmit={() => navigate('/submit')} />

            <Hero
                onSearch={setSearchTerm}
                onFilterChange={handleToggleFilter}
                onOpenSubmit={() => navigate('/submit')}
                viewType={viewType}
                onViewChange={setViewType}
                onNearMe={handleNearMe}
            />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-[1440px] relative z-10 -mt-2 md:-mt-8">
                <FilterBar
                    selectedCity={selectedCity}
                    onSelectCity={handleCityChange}
                    selectedCountry={selectedCountry}
                    onSelectCountry={handleCountryChange}
                    selectedArea={selectedArea}
                    onSelectArea={setSelectedArea}
                    selectedZone={selectedZone}
                    onSelectZone={setSelectedZone}
                    activeFilters={activeFilters}
                    onToggleFilter={handleToggleFilter}
                    areas={availableAreas}
                    zones={availableZones}
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

            {/* Active Tab Indicator */}
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
        </div>
    );
};

export default AppPage;
