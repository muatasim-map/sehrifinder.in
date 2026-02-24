import React, { useState } from 'react';
import { Search, MapPin, Filter, AlertCircle, PlusCircle } from 'lucide-react';
import { IslamicPattern } from './Pattern';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FilterType } from './FilterChips';

interface HeroProps {
  onSearch: (term: string) => void;
  onFilterChange: (filterType: FilterType) => void;
  onOpenSubmit: () => void;
  viewType: 'list' | 'map';
  onViewChange: (type: 'list' | 'map') => void;
  onNearMe: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onFilterChange,
  onOpenSubmit,
  viewType,
  onViewChange,
  onNearMe
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const { t, language } = useLanguage();

  // Parallax Configuration
  const SCROLL_RANGE_BG = [0, 500];
  const SCROLL_RANGE_TEXT = [0, 300];
  const Y_OFFSET_BG = [0, 100];
  const Y_OFFSET_TEXT = [0, 60];

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, SCROLL_RANGE_BG, Y_OFFSET_BG);
  const yText = useTransform(scrollY, SCROLL_RANGE_TEXT, Y_OFFSET_TEXT);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    onSearch(val);
  };

  return (
    <div className="relative bg-geometric-grid text-white min-h-[450px] md:min-h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Overlay for better text contrast if needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-midnight via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Parallax Background Layer - Pattern is now handled by CSS class on parent, but let's add parallax container */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        {/* We can add additional parallax elements here if desired, but the grid is static CSS */}
      </motion.div>

      <motion.div
        className="relative z-10 container mx-auto text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Text with Parallax */}
        <motion.div className="mb-6 md:mb-10" variants={itemVariants} style={{ y: yText }}>

          <div className="flex items-center justify-center gap-4 mb-2 md:mb-4 opacity-90">
            <span className="h-[1px] w-12 md:w-20 bg-gold-lantern/40"></span>
            <h3 className={`text-gold-lantern text-3xl md:text-7xl leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${language === 'ur' ? 'font-urdu' : 'font-script'}`}>
              {t('ramadanKareem')}
            </h3>
            <span className="h-[1px] w-12 md:w-20 bg-gold-lantern/40"></span>
          </div>

          <h2 className={`text-3xl md:text-6xl text-white font-serif leading-tight drop-shadow-lg mt-1 md:mt-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {language === 'en' ? (
              <>
                Find Your <span className="text-gold-lantern italic font-serif px-2 align-baseline relative">Sehri</span>
              </>
            ) : t('findSehri')}
            <br />
            <span className="text-xl md:text-5xl block mt-2 md:mt-3 text-white/90 font-light tracking-wide">{t('distributionPoints')}</span>
          </h2>
        </motion.div>

        {/* Disclaimer Banner - Glassmorphic */}
        <motion.div
          className="max-w-2xl mx-auto mb-8 bg-emerald-sacred/20 backdrop-blur-md rounded-xl p-4 border border-emerald-sacred/30 flex items-start gap-3 text-left shadow-lg"
          variants={itemVariants}
        >
          <AlertCircle className="shrink-0 text-gold-amber mt-0.5" size={20} />
          <p className="text-sm text-white/90 leading-relaxed font-sans">
            {t('disclaimer')}
          </p>
        </motion.div>

        {/* Search Bar - Glassmorphic Pill */}
        <motion.div className="max-w-2xl mx-auto mb-8" variants={itemVariants}>
          <div className="relative group">
            <input
              type="text"
              value={localSearch}
              onChange={handleSearch}
              placeholder={t('searchPlaceholder')}
              className={`w-full bg-emerald-sacred/20 backdrop-blur-md border border-emerald-sacred/30 text-white placeholder-white/50 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:bg-emerald-sacred/30 focus:border-gold-lantern/30 transition-all text-lg shadow-xl hover:shadow-2xl ${language === 'ur' ? 'text-right pr-14 pl-4' : ''}`}
            />
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gold-lantern w-6 h-6 group-focus-within:text-white transition-colors ${language === 'ur' ? 'right-5' : 'left-5'}`} />
          </div>

          {/* Buttons Row - Actions */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            {/* Near Me */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(22, 163, 74, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onNearMe}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium bg-emerald-sacred/20 hover:bg-emerald-sacred/30 px-6 py-3 rounded-full border border-emerald-sacred/30 hover:border-gold-lantern/30 backdrop-blur-md shadow-lg"
            >
              <MapPin size={18} className="text-gold-lantern" />
              <span>{t('nearMe')}</span>
            </motion.button>

            {/* Filters */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('filters-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium bg-emerald-sacred/20 hover:bg-emerald-sacred/30 px-6 py-3 rounded-full border border-emerald-sacred/30 hover:border-gold-lantern/30 backdrop-blur-md shadow-lg"
            >
              <Filter size={18} className="text-gold-lantern" />
              <span>{t('filters')}</span>
            </motion.button>

            {/* Map/List Toggle */}
            <div className="bg-emerald-sacred/20 backdrop-blur-md p-1 rounded-full border border-emerald-sacred/30 flex shadow-lg">
              <button
                onClick={() => onViewChange('list')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${viewType === 'list'
                  ? 'bg-gold-lantern text-emerald-midnight shadow-md'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                <Filter size={14} />
                {t('listView')}
              </button>
              <button
                onClick={() => onViewChange('map')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${viewType === 'map'
                  ? 'bg-gold-lantern text-emerald-midnight shadow-md'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                <MapPin size={14} />
                {t('mapView')}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-2 text-gold-lantern hover:text-gold-bright transition-colors text-sm font-bold border-b border-gold-lantern/30 pb-1"
            >
              <PlusCircle size={18} />
              {t('submitSpot')}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
