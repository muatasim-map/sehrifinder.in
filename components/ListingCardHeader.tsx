
import React from 'react';
import { CheckCircle2, AlertTriangle, CalendarDays, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { isSpotOpenNow } from '../hooks/useSehriCountdown';

interface ListingCardHeaderProps {
  name: string;
  verified: boolean;
  foodType: string;
  lastVerified: string;
  isFree: boolean;
  isSaved: boolean;
  timing: string;
  onToggleSave: () => void;
}

/**
 * Displays the top section of the card: Name, Verified Badge, Food Type, and Save Button.
 */
export const ListingCardHeader: React.FC<ListingCardHeaderProps> = ({
  name, verified, foodType, lastVerified, isFree, isSaved, timing, onToggleSave
}) => {
  const { t } = useLanguage();
  const openNow = isSpotOpenNow(timing);

  return (
    <div className="flex justify-between items-start mb-2 mt-1 gap-2">
      <div className="flex-1">
        <h3 className="text-xl font-brand font-bold text-primary-dark uppercase tracking-wide leading-tight">
          {name}
        </h3>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            animate={isSaved ? { scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave();
            }}
            className={`p-1.5 rounded-full border transition-colors duration-300 ${isSaved
              ? 'bg-red-50 border-red-100 text-red-500 shadow-sm'
              : 'bg-white border-transparent hover:border-red-100 text-gray-300 hover:text-red-400 hover:bg-red-50/50'
              }`}
            title={isSaved ? t('saved') : t('save')}
          >
            <Heart size={16} className={isSaved ? "fill-current" : ""} />
          </motion.button>

          {/* Open Now Badge */}
          {openNow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-emerald-100"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Open Now
            </motion.div>
          )}

          {/* Verification Badge */}
          {verified ? (
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 12px rgba(34, 197, 94, 0.4)",
                backgroundColor: "#f0fdf4" // green-50
              }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-green-100 cursor-default"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <CheckCircle2 size={12} className="stroke-[3]" />
              </motion.div>
              {t('verified')}
            </motion.div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-orange-100">
              <AlertTriangle size={12} className="stroke-[3]" />
              {t('unverified')}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Food Type Badge */}
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${isFree ? 'bg-primary/5 text-primary border-primary/20' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
            {foodType === 'Partially Paid' ? t('partiallyPaid') : t(foodType.toLowerCase() as any)}
          </div>

          {/* Last Verified Date */}
          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-stone-400">
            <CalendarDays size={10} className="text-stone-300" />
            <span>{lastVerified}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
