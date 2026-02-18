import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SehriSpot } from '../types';
import { fetchSehriSpots } from '../services/spotService';
import { getStoredCity, setStoredCity, getSavedSpots, setSavedSpots } from '../utils/storage';
import { calculateDistance } from '../utils/distance';
import { toast } from 'sonner';
import { FilterType } from '../components/FilterChips';
import { useSpotFilter } from '../hooks/useSpotFilter';

interface SehriContextType {
    allSpots: SehriSpot[];
    isLoadingData: boolean;
    savedSpotIds: number[];
    selectedCity: string;
    searchTerm: string;
    selectedArea: string | null;
    selectedZone: string | null;
    activeFilters: FilterType[];
    filteredData: SehriSpot[];
    availableAreas: string[];
    isCitySupported: boolean;
    setSearchTerm: (term: string) => void;
    setSelectedArea: (area: string | null) => void;
    setSelectedZone: (zone: string | null) => void;
    setSelectedCity: (city: string) => void;
    toggleSave: (id: number) => void;
    handleToggleFilter: (filter: FilterType) => void;
    handleNearMe: () => void;
    handleClearFilters: () => void;
    activeTab: 'home' | 'search' | 'saved';
    setActiveTab: (tab: 'home' | 'search' | 'saved') => void;
}

const SehriContext = createContext<SehriContextType | undefined>(undefined);

const SUPPORTED_CITIES = ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai'];


export const SehriProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allSpots, setAllSpots] = useState<SehriSpot[]>([]);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
    const [savedSpotIds, setSavedSpotIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>(() => getStoredCity('Chennai'));
    const [activeTab, setActiveTab] = useState<'home' | 'search' | 'saved'>('home');

    useEffect(() => {
        const loadData = async () => {
            setIsLoadingData(true);
            try {
                const data = await fetchSehriSpots();
                setAllSpots(data);
                setSavedSpotIds(getSavedSpots());
            } catch (error) {
                console.error("Error loading data", error);
            } finally {
                setIsLoadingData(false);
            }
        };
        loadData();
    }, []);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        setStoredCity(city);
        setSelectedArea(null);
        setSelectedZone(null);
        if (activeTab === 'saved') setActiveTab('home');
    };

    const toggleSave = (id: number) => {
        setSavedSpotIds(prev => {
            const isSaving = !prev.includes(id);
            const newSaved = isSaving
                ? [...prev, id]
                : prev.filter(savedId => savedId !== id);
            setSavedSpots(newSaved);
            const spotName = allSpots.find(s => s.id === id)?.name || 'Spot';
            if (isSaving) toast.success(`${spotName} saved to favorites`);
            else toast.info(`${spotName} removed from favorites`);
            return newSaved;
        });
    };

    const handleToggleFilter = (filter: FilterType) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const filteredData = useSpotFilter({
        allSpots,
        activeTab,
        savedSpotIds,
        selectedCity,
        searchTerm,
        selectedArea,
        selectedZone,
        activeFilters
    });

    const handleNearMe = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }
        setIsLoadingData(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const spotsWithDistance = allSpots.map(spot => {
                    let distanceVal = Infinity;
                    if (spot.latitude && spot.longitude) {
                        distanceVal = calculateDistance(latitude, longitude, spot.latitude, spot.longitude);
                    }
                    return { ...spot, distance: distanceVal === Infinity ? "N/A" : `${distanceVal} km`, _distanceVal: distanceVal };
                });
                spotsWithDistance.sort((a, b) => a._distanceVal - b._distanceVal);
                const sortedSpots = spotsWithDistance.map(({ _distanceVal, ...spot }) => spot);
                setAllSpots(sortedSpots);
                toast.success('Spots sorted by distance! 📍');
                setIsLoadingData(false);
            },
            (error) => {
                console.error("Error getting location", error);
                toast.error('Unable to retrieve your location. Please allow access.');
                setIsLoadingData(false);
            }
        );
    };

    const availableAreas = useMemo(() => {
        let sourceData = activeTab === 'saved'
            ? allSpots.filter(item => savedSpotIds.includes(item.id))
            : allSpots.filter(item => item.city === selectedCity);
        return Array.from(new Set(sourceData.map(d => d.area))).sort();
    }, [selectedCity, allSpots, activeTab, savedSpotIds]);

    const isCitySupported = SUPPORTED_CITIES.includes(selectedCity);

    const handleClearFilters = () => {
        if (activeTab === 'saved') {
            setActiveTab('home');
        } else {
            setSearchTerm('');
            setSelectedArea(null);
            setSelectedZone(null);
            setActiveFilters([]);
            if (!isCitySupported) handleCityChange('Chennai');
        }
    };

    return (
        <SehriContext.Provider value={{
            allSpots, isLoadingData, savedSpotIds, selectedCity, searchTerm, selectedArea, selectedZone,
            activeFilters, filteredData, availableAreas, isCitySupported,
            setSearchTerm, setSelectedArea, setSelectedZone, setSelectedCity: handleCityChange,
            toggleSave, handleToggleFilter, handleNearMe, handleClearFilters,
            activeTab, setActiveTab
        }}>
            {children}
        </SehriContext.Provider>
    );
};

export const useSehri = () => {
    const context = useContext(SehriContext);
    if (context === undefined) {
        throw new Error('useSehri must be used within a SehriProvider');
    }
    return context;
};
