import React from 'react';
import { CheckCircle2, Moon } from 'lucide-react';

interface VerificationBadgeProps {
    venueName?: string;
    city?: string;
    variant?: 'compact' | 'full';
    theme?: 'light' | 'dark' | 'gold';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
    venueName,
    city,
    variant = 'full',
    theme = 'gold'
}) => {
    const isGold = theme === 'gold';
    const isDark = theme === 'dark';

    return (
        <div
            className={`
                inline-flex flex-col items-center justify-center p-4 rounded-3xl border transition-transform hover:scale-105
                ${isGold ? 'bg-emerald-midnight border-gold-antique/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : ''}
                ${isDark ? 'bg-primary-dark border-white/10 shadow-lg' : ''}
                ${theme === 'light' ? 'bg-white border-stone-200 shadow-sm' : ''}
            `}
            style={{ width: variant === 'compact' ? '120px' : '180px', height: variant === 'compact' ? '120px' : '180px' }}
        >
            <div className="relative mb-2">
                <div className={`
                    absolute inset-0 blur-xl opacity-20 rounded-full
                    ${isGold ? 'bg-gold-antique' : 'bg-primary'}
                `} />
                <div className={`
                    relative p-2 rounded-2xl border
                    ${isGold ? 'bg-gold-antique/10 border-gold-antique/20' : 'bg-primary/10 border-primary/20'}
                `}>
                    <Moon className={`w-8 h-8 ${isGold ? 'text-gold-antique' : 'text-primary'}`} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
            </div>

            <div className="text-center">
                <div className={`
                    text-[10px] uppercase tracking-[0.2em] font-bold mb-1
                    ${isGold ? 'text-gold-antique/60' : 'text-stone-400'}
                `}>
                    Verified 2026
                </div>
                <div className={`
                    font-serif font-bold leading-tight
                    ${variant === 'compact' ? 'text-xs' : 'text-sm'}
                    ${isGold || isDark ? 'text-white' : 'text-primary-dark'}
                `}>
                    {venueName || 'Sehri Finder'}
                </div>
                {city && variant !== 'compact' && (
                    <div className={`text-[10px] mt-1 ${isGold ? 'text-gold-antique/50' : 'text-stone-500'}`}>
                        {city}
                    </div>
                )}
            </div>

            <div className={`
                mt-3 font-serif text-[9px] uppercase tracking-widest
                ${isGold ? 'text-gold-antique/40' : 'text-stone-400'}
            `}>
                sehrifinder.com
            </div>
        </div>
    );
};
