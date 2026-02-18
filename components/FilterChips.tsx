import React from 'react';
import { Check, Star, Users, Home, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export type FilterType = 'Verified' | 'Free' | 'Masjid' | 'Women Friendly' | 'Hospital';

interface FilterChipsProps {
  activeFilters: FilterType[];
  onToggleFilter: (filter: FilterType) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ activeFilters, onToggleFilter }) => {
  const { t } = useLanguage();

  const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
    { id: 'Verified', label: t('verified'), icon: <Check size={14} className="stroke-[3]" /> },
    { id: 'Free', label: t('free'), icon: <Star size={14} className="fill-current" /> },
    { id: 'Masjid', label: t('masjid'), icon: <Home size={14} /> },
    { id: 'Women Friendly', label: t('ladiesSection'), icon: <Users size={14} /> },
    { id: 'Hospital', label: 'Near Hospital', icon: <div className="text-red-500 font-bold text-xs"><Plus size={14} strokeWidth={4} /></div> },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2 px-1">
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleFilter(filter.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 border
              ${isActive
                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                : 'bg-white text-gray-500 border-gray-200 hover:border-primary/30 hover:text-primary-dark'}
            `}
          >
            {filter.icon}
            {filter.label}
          </motion.button>
        );
      })}
    </div>
  );
};
