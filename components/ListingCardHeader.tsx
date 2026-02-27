
import React from 'react';
import { CheckCircle2, AlertTriangle, CalendarDays, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
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
        <h3 className="text-xl font-serif font-bold text-primary-dark uppercase tracking-wide leading-tight">
          {name}
        </h3>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          {/* Save Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave();
            }}
            className={`p-1.5 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 ${isSaved
              ? 'bg-red-50 border-red-100 text-red-500 shadow-sm'
              : 'bg-white border-transparent hover:border-red-100 text-gray-300 hover:text-red-400 hover:bg-red-50/50'
              }`}
            title={isSaved ? t('saved') : t('save')}
          >
            <Heart size={16} className={isSaved ? "fill-current" : ""} />
          </button>

          {/* Open Now Badge */}
          {openNow && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-emerald-100 animate-in zoom-in duration-300"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Open Now
            </div>
          )}

          {/* Verification Badge */}
          {verified ? (
            <div
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-green-100 cursor-default hover:scale-105 hover:bg-[#f0fdf4] hover:shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all duration-300"
            >
              <div className="animate-pulse">
                <CheckCircle2 size={12} className="stroke-[3]" />
              </div>
              {t('verified')}
            </div>
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
