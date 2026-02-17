
import React from 'react';
import { Home, Search, Heart } from 'lucide-react';
import { IslamicPattern } from './Pattern';

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'saved';
  onTabChange: (tab: 'home' | 'search' | 'saved') => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount
}) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 overflow-hidden">
      {/* Subtle Pattern Background */}
      <IslamicPattern opacity={0.03} variant="arabesque" className="text-primary" />

      <div className="grid grid-cols-3 h-full relative z-10">

        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'search', icon: Search, label: 'Search' },
          { id: 'saved', icon: Heart, label: 'Saved', showBadge: true }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${activeTab === tab.id ? 'text-primary scale-105' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="relative">
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? (tab.id === 'saved' ? 'fill-primary stroke-primary' : 'fill-primary/10 stroke-[2.5px]') : ''}`} />
              {tab.showBadge && savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-red-500 rounded-full border border-white flex items-center justify-center text-[8px] text-white font-bold px-0.5 animate-scale-in">
                  {savedCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium ${activeTab === tab.id ? 'font-bold' : ''}`}>{tab.label}</span>
          </button>
        ))}

      </div>
    </div>
  );
};
