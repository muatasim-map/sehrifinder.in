
import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check, MapPin, Building2, Compass } from 'lucide-react';
import { FilterChips, FilterType } from './FilterChips';
import { useLanguage } from '../context/LanguageContext';

const CITIES = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

interface FilterBarProps {
  selectedArea: string | null;
  onSelectArea: (area: string | null) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  totalSpots: number;
  areas: string[];
  selectedZone: string | null;
  onSelectZone: (zone: string | null) => void;
  activeFilters: FilterType[];
  onToggleFilter: (filter: FilterType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedArea,
  onSelectArea,
  selectedCity,
  onSelectCity,
  totalSpots,

  areas,
  selectedZone,
  onSelectZone,
  activeFilters,
  onToggleFilter
}) => {
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isZoneOpen, setIsZoneOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <div id="filter-bar" className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Main Filters Row */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-3">

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* City Selector Dropdown */}
            <div className="relative w-full sm:w-56 z-50">
              <button
                onClick={() => { setIsCityOpen(!isCityOpen); setIsAreaOpen(false); setIsZoneOpen(false); }}
                className="w-full flex items-center justify-between bg-white border border-stone-200 text-stone-700 py-2.5 px-4 rounded-xl shadow-sm hover:border-gold/50 hover:shadow-md transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-1.5 rounded-full bg-cream group-hover:bg-gold/10 transition-colors">
                    <Building2 size={16} className="text-gold-bright" />
                  </div>
                  <div className={`flex flex-col items-start truncate ${language === 'ur' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{t('selectCity')}</span>
                    <span className="truncate font-serif font-bold text-lg leading-none text-primary-dark">
                      {selectedCity}
                    </span>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-gold-bright transition-transform duration-300 ${isCityOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* City Dropdown Menu */}
              {isCityOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsCityOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1.5 space-y-0.5">
                      {CITIES.map((city) => (
                        <button
                          key={city}
                          onClick={() => { onSelectCity(city); setIsCityOpen(false); }}
                          className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${selectedCity === city ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                        >
                          <span className="font-medium">{city}</span>
                          {selectedCity === city && <Check size={16} className="text-gold-bright" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Area Selector Dropdown */}
            <div className="relative w-full sm:w-72 z-40">
              <button
                onClick={() => { setIsAreaOpen(!isAreaOpen); setIsCityOpen(false); setIsZoneOpen(false); }}
                className="w-full flex items-center justify-between bg-white border border-stone-200 text-stone-700 py-2.5 px-4 rounded-xl shadow-sm hover:border-gold/50 hover:shadow-md transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-1.5 rounded-full bg-cream group-hover:bg-gold/10 transition-colors">
                    <MapPin size={16} className="text-gold-bright" />
                  </div>
                  <div className={`flex flex-col items-start truncate ${language === 'ur' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{t('selectArea')}</span>
                    <span className={`truncate font-serif font-bold text-lg leading-none ${selectedArea ? 'text-primary-dark' : 'text-gray-600'}`}>
                      {selectedArea || t('allAreas')}
                    </span>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-gold-bright transition-transform duration-300 ${isAreaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Area Dropdown Menu */}
              {isAreaOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsAreaOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-100 shadow-2xl max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1.5 space-y-0.5">
                      <button
                        onClick={() => { onSelectArea(null); setIsAreaOpen(false); }}
                        className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${!selectedArea ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                      >
                        <span className="font-medium">{t('allAreas')}</span>
                        {!selectedArea && <Check size={16} className="text-gold-bright" />}
                      </button>

                      {areas.map((area) => (
                        <button
                          key={area}
                          onClick={() => { onSelectArea(area); setIsAreaOpen(false); }}
                          className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${selectedArea === area ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                        >
                          <span className="font-medium">{area}</span>
                          {selectedArea === area && <Check size={16} className="text-gold-bright" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Zone Selector Dropdown */}
            <div className="relative w-full sm:w-48 z-30">
              <button
                onClick={() => { setIsZoneOpen(!isZoneOpen); setIsCityOpen(false); setIsAreaOpen(false); }}
                className="w-full flex items-center justify-between bg-white border border-stone-200 text-stone-700 py-2.5 px-4 rounded-xl shadow-sm hover:border-gold/50 hover:shadow-md transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-1.5 rounded-full bg-cream group-hover:bg-gold/10 transition-colors">
                    <Compass size={16} className="text-gold-bright" />
                  </div>
                  <div className={`flex flex-col items-start truncate ${language === 'ur' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{t('direction') || 'Direction'}</span>
                    <span className={`truncate font-serif font-bold text-lg leading-none ${selectedZone ? 'text-primary-dark' : 'text-gray-600'}`}>
                      {selectedZone || t('any') || 'Any'}
                    </span>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-gold-bright transition-transform duration-300 ${isZoneOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Zone Dropdown Menu */}
              {isZoneOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsZoneOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1.5 space-y-0.5">
                      <button
                        onClick={() => { onSelectZone(null); setIsZoneOpen(false); }}
                        className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${!selectedZone ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                      >
                        <span className="font-medium">{t('anyDirection') || 'Any Direction'}</span>
                        {!selectedZone && <Check size={16} className="text-gold-bright" />}
                      </button>

                      {['North', 'South', 'East', 'West', 'Central'].map((zone) => (
                        <button
                          key={zone}
                          onClick={() => { onSelectZone(zone); setIsZoneOpen(false); }}
                          className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${selectedZone === zone ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                        >
                          <span className="font-medium">{zone}</span>
                          {selectedZone === zone && <Check size={16} className="text-gold-bright" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats & Sort - Moved to inline on MD screens */}
          <div className="hidden md:flex items-center justify-end gap-3 text-sm text-gray-500">
            <div className={`flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full border border-stone-100 shadow-sm ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
              <span className="font-medium text-stone-600 whitespace-nowrap">
                {totalSpots} {t('spotsFound')}
              </span>
              <span className="h-4 w-px bg-stone-200"></span>
              <button className="flex items-center gap-1.5 hover:text-primary-dark transition-colors font-bold text-primary">
                <ArrowUpDown size={14} />
                <span>{t('filter')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filters Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <FilterChips activeFilters={activeFilters} onToggleFilter={onToggleFilter} />

          {/* Mobile Stats (Visible only on small screens) */}
          <div className="flex md:hidden w-full items-center justify-between text-xs text-gray-400 font-medium px-1">
            <span>{totalSpots} {t('spotsFound')}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
