import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { ListingCard } from '../components/ListingCard';
import { BottomNav } from '../components/BottomNav';
import { Loader2, Heart } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { useSehri } from '../context/SehriContext';
import { COUNTRIES } from '../data/locations';
import { useSEO } from '../hooks/useSEO';

// Dynamically import MapView to drastically reduce initial JS load
const MapView = React.lazy(() => import('../components/MapView').then(module => ({ default: module.MapView })));
import { SEOJsonLd, getCitySchema } from '../components/SEOJsonLd';
import { SEO_DATA } from '../data/seoData';
import { CityIntro } from '../components/CityIntro';
import { toSlug, fromSlug } from '../utils/slug';
import { SehriCountdown } from '../components/SehriCountdown';

const AppPage: React.FC = () => {
    const navigate = useNavigate();
    const { city, category } = useParams<{ city?: string, category?: string }>();
    const [viewType, setViewType] = useState<'list' | 'map'>('list');

    const {
        isLoadingData,
        allSpots,
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

    // SEO Sync
    useSEO(selectedCity, category);

    // City Schema Data
    const citySEO = SEO_DATA[toSlug(selectedCity)];
    const citySchema = citySEO ? getCitySchema(
        citySEO.city,
        citySEO.shortDescription,
        window.location.href
    ) : null;

    const breadcrumbSchema = {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.sehrifinder.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Find Sehri",
                "item": "https://www.sehrifinder.com/find"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": citySEO?.city || selectedCity,
                "item": window.location.href
            }
        ]
    };

    // Sync route param with context city (URL -> State)
    useEffect(() => {
        const cityNameFromUrl = city ? fromSlug(city) : null;
        if (cityNameFromUrl && cityNameFromUrl.toLowerCase() !== selectedCity.toLowerCase()) {
            const supported = COUNTRIES.flatMap(c => c.cities.map(loc => loc.name));
            const match = supported.find(c => c.toLowerCase() === cityNameFromUrl.toLowerCase());
            if (match) setSelectedCity(match);
        }
    }, [city, selectedCity, setSelectedCity]);

    // Derived category spots based on intent slug
    const categorySpots = React.useMemo(() => {
        let result = filteredData;
        if (category) {
            const cat = category.toLowerCase();
            if (cat === 'free-community-meal' || cat === 'free') {
                result = result.filter(s => s.foodType === 'Free');
            } else if (cat === 'drive-thru') {
                result = result.filter(s => s.features?.some(f => f.toLowerCase().includes('drive')) || s.specialNotes.toLowerCase().includes('drive'));
            } else if (cat === 'buffet') {
                result = result.filter(s => s.features?.some(f => f.toLowerCase().includes('buffet')) || s.specialNotes.toLowerCase().includes('buffet'));
            } else if (cat === '24-hour' || cat === '24-hours') {
                result = result.filter(s => s.timing.includes('24') || s.features?.some(f => f.toLowerCase().includes('24')));
            } else if (cat === 'dessert' || cat === 'sweets') {
                result = result.filter(s => s.features?.some(f => f.toLowerCase().includes('dessert') || f.toLowerCase().includes('sweet')));
            } else if (cat === 'masjid' || cat === 'mosque') {
                result = result.filter(s => s.venueType === 'Masjid');
            }
        }
        return result;
    }, [filteredData, category]);

    // URL is the Single Source of Truth.
    // We only listen to URL changes to update state (above).
    // We do NOT automatically push state changes to URL to avoid loops.

    const handleCityChange = (newCity: string) => {
        // When user selects a city manually, we navigate.
        // This will trigger the URL -> State effect above.
        navigate(`/find/${toSlug(newCity)}`);
    };

    const handleCountryChange = (countryName: string) => {
        // Update country in context first
        setSelectedCountry(countryName);
        // Navigate to the first city of the new country so URL stays in sync.
        // The URL->State effect above will then update the city state correctly.
        const country = COUNTRIES.find(c => c.name === countryName);
        if (country && country.cities.length > 0) {
            navigate(`/find/${toSlug(country.cities[0].name)}`);
        }
    };

    // Handle Bottom Nav Tab Change
    // Tab change
    const handleTabChange = (tab: 'home' | 'search' | 'saved') => {
        setActiveTab(tab);
        if (tab === 'home') {
            setSearchTerm('');
            setSelectedArea(null);
        }
    };

    const hasResults = categorySpots.length > 0;

    // --- Virtualization Logic ---
    const [cols, setCols] = useState(1);

    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth >= 1280) setCols(4); // xl
            else if (window.innerWidth >= 1024) setCols(3); // lg
            else if (window.innerWidth >= 640) setCols(2); // sm
            else setCols(1);
        };
        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);

    const rowCount = Math.ceil(categorySpots.length / cols);

    const virtualizer = useWindowVirtualizer({
        count: rowCount,
        estimateSize: () => 380, // Estimated height of ListingCard + gap
        overscan: 3,
    });

    return (
        <div className="relative z-10 flex flex-col min-h-screen">
            {citySchema && <SEOJsonLd type="LocalBusiness" data={citySchema} />}
            {breadcrumbSchema && <SEOJsonLd type="BreadcrumbList" data={breadcrumbSchema} />}
            <Header onOpenSubmit={() => navigate('/submit')} />

            <Hero
                onSearch={setSearchTerm}
                onFilterChange={handleToggleFilter}
                onOpenSubmit={() => navigate('/submit')}
                viewType={viewType}
                onViewChange={setViewType}
                onNearMe={handleNearMe}
            />

            {/* Live Sehri Countdown — highest ROI widget */}
            {allSpots.length > 0 && allSpots[0].timing && (
                <div className="container mx-auto px-4 max-w-[1440px] -mt-4 mb-2 relative z-20">
                    <SehriCountdown timing={allSpots[0].timing} city={selectedCity} />
                </div>
            )}

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
                    totalSpots={categorySpots.length}
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
                                <div className="pb-24">
                                    <div
                                        style={{
                                            height: `${virtualizer.getTotalSize()}px`,
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        {virtualizer.getVirtualItems().map((virtualRow) => {
                                            const startIdx = virtualRow.index * cols;
                                            const rowSpots = categorySpots.slice(startIdx, startIdx + cols);

                                            return (
                                                <div
                                                    key={virtualRow.index}
                                                    data-index={virtualRow.index}
                                                    ref={virtualizer.measureElement}
                                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 absolute top-0 left-0 w-full"
                                                    style={{
                                                        transform: `translateY(${virtualRow.start}px)`,
                                                        paddingBottom: '1.5rem', // Match the gap-6 equivalent for rows
                                                    }}
                                                >
                                                    {rowSpots.map((spot) => (
                                                        <ListingCard
                                                            key={spot.id}
                                                            data={spot}
                                                            isSaved={savedSpotIds.includes(spot.id)}
                                                            onToggleSave={toggleSave}
                                                        />
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="pb-24">
                                <React.Suspense fallback={
                                    <div className="flex flex-col items-center justify-center p-20 opacity-70">
                                        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-2" />
                                        <p className="text-xs font-bold tracking-widest text-emerald-midnight">LOADING MAP...</p>
                                    </div>
                                }>
                                    <MapView spots={categorySpots} />
                                </React.Suspense>
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
                        <h2 className="font-serif font-bold text-lg">My Saved Spots</h2>
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
