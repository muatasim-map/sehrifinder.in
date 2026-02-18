import { useMemo } from 'react';
import { SehriSpot } from '../types';
import { FilterType } from '../components/FilterChips';

interface UseSpotFilterProps {
    allSpots: SehriSpot[];
    activeTab: 'home' | 'search' | 'saved';
    savedSpotIds: number[];
    selectedCity: string;
    searchTerm: string;
    selectedArea: string | null;
    selectedZone: string | null;
    activeFilters: FilterType[];
}

const KEYWORD_MAPPINGS: Record<string, string[]> = {
    'biryani': ['Restaurant', 'Paid'],
    'rice': ['Restaurant'],
    'meals': ['Restaurant', 'Hotel'],
    'free': ['Free', 'Masjid', 'Foundation'],
    'prayer': ['Masjid'],
    'namaz': ['Masjid'],
    'hotel': ['Restaurant'],
    'restaurant': ['Restaurant'],
    'masjid': ['Masjid'],
    'mosque': ['Masjid'],
};

export const useSpotFilter = ({
    allSpots,
    activeTab,
    savedSpotIds,
    selectedCity,
    searchTerm,
    selectedArea,
    selectedZone,
    activeFilters
}: UseSpotFilterProps) => {

    const filteredData = useMemo(() => {
        // 0. Base Data Source
        let data = allSpots;

        // 1. If Saved Tab is Active, filter ONLY saved spots first (ignores city initially)
        if (activeTab === 'saved') {
            data = data.filter(item => savedSpotIds.includes(item.id));
        } else {
            // Otherwise, filter by selected City
            data = data.filter(item => item.city === selectedCity);
        }

        // 2. Filter by Search Term (Global search or Local search)
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();

            // Smart Search: Check if term matches a category/type mapping
            // Allows users to find "Restaurants" by typing "Rice" or "Biryani"


            const smartCategories: string[] = [];
            Object.entries(KEYWORD_MAPPINGS).forEach(([key, values]) => {
                if (key.includes(lowerTerm) || lowerTerm.includes(key)) {
                    smartCategories.push(...values);
                }
            });
            const smartFilterActive = smartCategories.length > 0;

            data = data.filter((item) => {
                const matchesText = item.name.toLowerCase().includes(lowerTerm) ||
                    item.area.toLowerCase().includes(lowerTerm) ||
                    item.features.some(f => f.toLowerCase().includes(lowerTerm)) ||
                    item.specialNotes.toLowerCase().includes(lowerTerm) ||
                    (item.zone && item.zone.toLowerCase().includes(lowerTerm));

                // If smart keyword matched (e.g. "biryani"), also check if venueType or foodType matches
                const matchesSmart = smartFilterActive && (
                    smartCategories.includes(item.venueType) ||
                    smartCategories.includes(item.foodType)
                );

                return matchesText || matchesSmart;
            });
        }

        // 3. Filter by Area Selection
        if (selectedArea) {
            data = data.filter(item => item.area === selectedArea);
        }

        // 3.5. Filter by Zone (Direction)
        if (selectedZone) {
            data = data.filter(item => item.zone && item.zone.toLowerCase().includes(selectedZone.toLowerCase()));
        }

        // 4. Advanced Filters (Chips)
        if (activeFilters.length > 0) {
            if (activeFilters.includes('Verified')) {
                data = data.filter(item => item.verified);
            }
            if (activeFilters.includes('Free')) {
                data = data.filter(item => item.foodType === 'Free');
            }
            if (activeFilters.includes('Masjid')) {
                data = data.filter(item => item.venueType === 'Masjid');
            }
            if (activeFilters.includes('Women Friendly')) {
                data = data.filter(item =>
                    item.features.some(f => f.toLowerCase().includes('women') || f.toLowerCase().includes('families')) ||
                    item.targetAudience?.some(t => t.toLowerCase().includes('women') || t.toLowerCase().includes('families'))
                );
            }
            if (activeFilters.includes('Hospital')) {
                data = data.filter(item =>
                    item.name.toLowerCase().includes('hospital') ||
                    item.address.toLowerCase().includes('hospital') ||
                    item.specialNotes.toLowerCase().includes('hospital') ||
                    item.targetAudience?.some(t => t.toLowerCase().includes('patient') || t.toLowerCase().includes('hospital'))
                );
            }
        }

        return data;
    }, [searchTerm, selectedArea, selectedZone, selectedCity, allSpots, activeTab, savedSpotIds, activeFilters]);

    return filteredData;
};
