import React from 'react';
import { Heart, Search } from 'lucide-react';

interface EmptyStateProps {
    activeTab: 'home' | 'search' | 'saved';
    selectedCity: string;
    isCitySupported: boolean;
    hasFilters: boolean;
    onClear: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    activeTab,
    selectedCity,
    isCitySupported,
    hasFilters,
    onClear
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60 animate-scale-in">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                {activeTab === 'saved' ? (
                    <Heart className="w-10 h-10 text-gray-400 fill-gray-200" />
                ) : (
                    <Search className="w-10 h-10 text-gray-400" />
                )}
            </div>

            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                {activeTab === 'saved'
                    ? 'No Saved Spots Yet'
                    : !isCitySupported
                        ? `No spots in ${selectedCity} yet`
                        : 'No Sehri spots found'}
            </h3>

            <p className="text-gray-500 max-w-xs mx-auto">
                {activeTab === 'saved'
                    ? "Tap the heart icon on any spot to save it here for quick access."
                    : !isCitySupported
                        ? `We are currently live in 12 cities across India, UK, USA, Canada, and Malaysia.`
                        : hasFilters
                            ? "No spots match your selected filters. Try unchecking some."
                            : "Try adjusting your filters or searching for a different area."}
            </p>

            <button
                onClick={onClear}
                className="mt-6 text-primary font-bold hover:underline"
            >
                {activeTab === 'saved'
                    ? 'Browse All Spots'
                    : !isCitySupported ? 'Switch to Chennai' : 'Clear All Filters'}
            </button>
        </div>
    );
};
