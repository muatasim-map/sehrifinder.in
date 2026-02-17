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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 }
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
  const Y_OFFSET_BG = [0, 150];
  const Y_OFFSET_TEXT = [0, 80];

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, SCROLL_RANGE_BG, Y_OFFSET_BG);
  const yText = useTransform(scrollY, SCROLL_RANGE_TEXT, Y_OFFSET_TEXT);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    onSearch(val);
  };

  return (
    <div className="relative bg-gradient-to-b from-primary to-primary-dark text-white pb-10 pt-12 px-4 overflow-hidden">
      {/* Parallax Background Layer */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        {/* Distinct Geometric pattern for Hero - Reduced Opacity to 0.13 */}
        <IslamicPattern opacity={0.13} variant="geometric" className="text-gold-bright" />
      </motion.div>

      <motion.div
        className="relative z-10 container mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Text with Parallax */}
        <motion.div className="mb-8" variants={itemVariants} style={{ y: yText }}>
          <div className="flex items-center justify-center gap-4 mb-2 opacity-100">
            <span className="h-[1px] w-16 md:w-24 bg-gold-lantern/60"></span>
            <span className={`text-gold-lantern text-5xl md:text-7xl leading-none pt-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] ${language === 'ur' ? 'font-urdu' : 'font-script'}`}>{t('ramadanKareem')}</span>
            <span className="h-[1px] w-16 md:w-24 bg-gold-lantern/60"></span>
          </div>
          <h2 className={`text-4xl md:text-6xl text-white leading-tight drop-shadow-sm font-semibold mt-2 ${language === 'ur' ? 'font-urdu' : 'font-serif'}`}>
            {language === 'en' ? (
              <>
                Find Your <span className="text-gold-lantern italic font-script px-2 text-5xl md:text-8xl align-middle drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">Sehri</span>
              </>
            ) : t('findSehri')} <br />
            <span className="text-2xl md:text-4xl block mt-2 opacity-90 font-normal">{t('distributionPoints')}</span>
          </h2>
        </motion.div>

        {/* Disclaimer Banner */}
        <motion.div
          className="max-w-xl mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 flex items-start gap-3 text-left shadow-lg"
          variants={itemVariants}
        >
          <AlertCircle className="shrink-0 text-gold-bright mt-0.5" size={18} />
          <p className="text-xs text-white/90 leading-relaxed">
            {t('disclaimer')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="max-w-2xl mx-auto mb-6" variants={itemVariants}>
          <div className="relative group">
            <input
              type="text"
              value={localSearch}
              onChange={handleSearch}
              placeholder={t('searchPlaceholder')}
              className={`w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/80 rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-bright focus:bg-white/20 transition-all text-lg shadow-xl hover:shadow-[0_0_25px_rgba(255,215,0,0.15)] ${language === 'ur' ? 'text-right pr-14 pl-4' : ''}`}
            />
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gold-bright w-6 h-6 group-focus-within:text-white transition-colors ${language === 'ur' ? 'right-5' : 'left-5'}`} />
          </div>

          {/* Quick Actions Row - Near Me */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {/* Near Me */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNearMe}
              className="flex items-center gap-2 text-white/80 hover:text-gold-bright transition-colors text-sm font-medium bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-full border border-white/10 hover:border-gold-bright/50 backdrop-blur-md shadow-lg group"
            >
              <MapPin size={16} className="text-gold-bright" />
              <span>{t('nearMe')}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Action Buttons: Submit & Map Toggle */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >

          <motion.button
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenSubmit}
            className="group relative px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-gold-bright/30 hover:border-gold-bright/60 shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold-bright/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
            <span className="relative z-10 flex items-center gap-2 text-gold-bright group-hover:text-white transition-colors">
              <PlusCircle className="w-5 h-5" />
              {t('submitSpot')}
            </span>
          </motion.button>

          {/* Map/List Toggle */}
          <div className="bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 flex shadow-lg">
            <button
              onClick={() => onViewChange('list')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewType === 'list'
                ? 'bg-white text-emerald-midnight shadow-md'
                : 'text-white hover:bg-white/10'
                }`}
            >
              <Filter size={14} />
              {t('listView')}
            </button>
            <button
              onClick={() => onViewChange('map')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewType === 'map'
                ? 'bg-white text-emerald-midnight shadow-md'
                : 'text-white hover:bg-white/10'
                }`}
            >
              <MapPin size={14} />
              {t('mapView')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
