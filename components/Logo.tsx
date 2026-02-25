import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'light' | 'dark' | 'gold';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    className = '',
    variant = 'gold',
    size = 'md',
    showText = true
}) => {

    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-11 h-11",
        xl: "w-16 h-16"
    };

    const textSizeClasses = {
        sm: "text-base",
        md: "text-lg md:text-xl",
        lg: "text-2xl",
        xl: "text-4xl"
    };

    const colors = {
        light: {
            glow: 'rgba(212,175,55,0.25)',
            text: 'text-white/90',
            highlight: 'text-gold-lantern',
            sep: 'bg-white/20'
        },
        dark: {
            glow: 'rgba(212,175,55,0.20)',
            text: 'text-emerald-midnight/90',
            highlight: 'text-gold-lantern',
            sep: 'bg-emerald-midnight/20'
        },
        gold: {
            glow: 'rgba(212,175,55,0.30)',
            text: 'text-white/90',
            highlight: 'text-gold-lantern',
            sep: 'bg-white/20'
        }
    };

    const c = colors[variant];

    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            {/* LOGO MARK — crisp geometric crescent via two-circle overlap */}
            <div
                className={`relative flex items-center justify-center ${sizeClasses[size]} shrink-0`}
                style={{ filter: `drop-shadow(0 0 6px ${c.glow})` }}
            >
                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                    {/* Crescent: two circles clipped — crisp at any size */}
                    <defs>
                        <clipPath id="logo-clip">
                            {/* Outer circle — full disc */}
                            <circle cx="20" cy="22" r="16" />
                        </clipPath>
                    </defs>
                    {/* Outer disc */}
                    <circle cx="20" cy="22" r="16" fill="#D4AF37" />
                    {/* Cut-out circle offset to form crescent */}
                    <circle cx="27" cy="19" r="13.5" fill={variant === 'dark' ? '#faf8f3' : '#022c22'} />
                    {/* Tiny 5-pointed star in the crescent cheek */}
                    <g transform="translate(10.5,27) scale(0.55)">
                        <polygon
                            points="0,-5 1.18,-1.62 4.76,-1.62 1.90,0.62 2.94,4.05 0,2 -2.94,4.05 -1.90,0.62 -4.76,-1.62 -1.18,-1.62"
                            fill="#D4AF37"
                            opacity="0.9"
                        />
                    </g>
                </svg>
            </div>

            {showText && (
                <div className={`flex items-center leading-none ${textSizeClasses[size]}`}>
                    {/* "Sehri" — lighter, pearl */}
                    <span className={`font-brand font-semibold tracking-wide ${c.text}`}>
                        Sehri
                    </span>
                    {/* Separator dot */}
                    <span className={`mx-1.5 w-1 h-1 rounded-full inline-block ${c.sep}`} />
                    {/* "Finder" — bold, gold */}
                    <span className={`font-brand font-bold tracking-tight ${c.highlight}`}>
                        Finder
                    </span>
                </div>
            )}
        </div>
    );
};
