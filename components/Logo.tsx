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

    // Size mappings
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    const textSizeClasses = {
        sm: "text-lg",
        md: "text-xl md:text-2xl",
        lg: "text-3xl",
        xl: "text-4xl"
    };

    // Color mappings
    const colors = {
        light: {
            icon: "text-gold-lantern",
            text: "text-white",        // Sehri is White
            highlight: "text-gold-lantern" // Finder is Gold
        },
        dark: {
            icon: "text-gold-lantern",
            text: "text-emerald-midnight",
            highlight: "text-gold-lantern"
        },
        gold: {
            icon: "text-gold-lantern",
            text: "text-white",
            highlight: "text-gold-lantern"
        }
    };

    const currentColors = colors[variant];

    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            {/* GEOMETRIC LOGO MARK */}
            <div className={`relative flex items-center justify-center ${sizeClasses[size]} shrink-0`}>
                <svg viewBox="0 0 100 100" className={`fill-current ${currentColors.icon}`} xmlns="http://www.w3.org/2000/svg">
                    {/* Simple Golden Crescent */}
                    <path
                        d="M45,10 C58.8,10 70,21.2 70,35 C70,48.8 58.8,60 45,60 C35.2,60 26.7,54.4 22.4,46.2 C26.1,48.6 30.5,50 35,50 C48.8,50 60,38.8 60,25 C60,20.5 58.6,16.1 56.2,12.4 C64.4,16.7 70,25.2 70,35"
                        transform="scale(1.4) translate(-10, 10)"
                        fill="currentColor"
                        stroke="none"
                    />
                </svg>
            </div>
            {
                showText && (
                    <div className={`flex items-center gap-1.5 leading-none ${textSizeClasses[size]}`}>
                        <span className={`font-serif font-bold uppercase ${currentColors.text}`}>Sehri</span>
                        <span className={`font-serif font-bold uppercase tracking-tight ${currentColors.highlight}`}>Finder</span>
                    </div>
                )
            }
        </div>
    );
};
