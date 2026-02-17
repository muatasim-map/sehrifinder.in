import React from 'react';
import { motion } from 'framer-motion';

// High-Fidelity SVG Lantern - UPDATED WITH MORE GEOMETRY
export const LanternSVG = React.memo(({
    className,
    variant = 'royal',
    glowColor = "#FFD700",
    flickerIntensity = 'medium'
}: {
    className?: string,
    variant?: 'royal' | 'geometric' | 'simple',
    glowColor?: string,
    flickerIntensity?: 'high' | 'medium' | 'low'
}) => {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 160" className="w-full h-auto drop-shadow-2xl" style={{ overflow: 'visible' }}>
                <defs>
                    <radialGradient id={`glow-${variant}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
                        <stop offset="50%" stopColor={glowColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Glow Effect (Behind) */}
                <circle
                    cx="50"
                    cy={variant === 'simple' ? 65 : 80}
                    r={flickerIntensity === 'high' ? 55 : 40}
                    fill={`url(#glow-${variant})`}
                    className="animate-[flicker-candle_4s_infinite_ease-in-out] lantern-glow-core"
                />

                {/* === VARIANT 1: ROYAL (Foreground, Detailed) === */}
                {variant === 'royal' && (
                    <g stroke="currentColor" strokeWidth="1.5" fill="none">
                        {/* Top Loop & Cap */}
                        <circle cx="50" cy="15" r="5" strokeWidth="2" />
                        <path d="M50 20 L30 40 L70 40 Z" fill="currentColor" fillOpacity="0.2" />

                        {/* Main Hexagonal Body */}
                        <path d="M30 40 L20 80 L30 120 L50 135 L70 120 L80 80 L70 40 Z" fill="currentColor" fillOpacity="0.1" />

                        {/* Added: Intricate Inner Lattice Mesh */}
                        <path d="M30 40 L50 80 L70 40" strokeWidth="0.5" opacity="0.6" />
                        <path d="M30 120 L50 80 L70 120" strokeWidth="0.5" opacity="0.6" />
                        <line x1="20" y1="80" x2="80" y2="80" strokeWidth="0.5" opacity="0.6" />
                        <line x1="50" y1="20" x2="50" y2="135" strokeWidth="1" />

                        {/* New: Diamond accents on side panels */}
                        <path d="M25 60 L35 80 L25 100" strokeWidth="0.5" opacity="0.4" />
                        <path d="M75 60 L65 80 L75 100" strokeWidth="0.5" opacity="0.4" />

                        {/* Bottom Tassel */}
                        <path d="M50 135 L50 150" strokeWidth="2" />
                        <circle cx="50" cy="153" r="3" fill="currentColor" stroke="none" />
                    </g>
                )}

                {/* === VARIANT 2: GEOMETRIC (Sharp, Angular) === */}
                {variant === 'geometric' && (
                    <g stroke="currentColor" strokeWidth="1.5" fill="none">
                        <rect x="48" y="10" width="4" height="10" fill="currentColor" />
                        {/* Main Diamond Body */}
                        <path d="M50 20 L80 50 L50 110 L20 50 Z" fill="currentColor" fillOpacity="0.15" />

                        {/* Internal Star geometry - Enhanced */}
                        <path d="M50 20 L50 110" strokeWidth="0.5" opacity="0.5" />
                        <path d="M20 50 L80 50" strokeWidth="0.5" opacity="0.5" />
                        <path d="M35 35 L65 35 L50 65 Z" strokeWidth="0.5" opacity="0.5" />
                        {/* New: Lower facet detail */}
                        <path d="M35 80 L50 110 L65 80" strokeWidth="0.5" opacity="0.4" />

                        {/* Bottom Finial */}
                        <path d="M50 110 L50 140" strokeWidth="1.5" />
                        <path d="M50 140 L40 150 L60 150 Z" fill="currentColor" fillOpacity="0.5" />
                    </g>
                )}

                {/* === VARIANT 3: SIMPLE (Background, Softer) === */}
                {variant === 'simple' && (
                    <g stroke="currentColor" strokeWidth="1.5" fill="none">
                        <circle cx="50" cy="10" r="4" strokeWidth="2" />
                        <path d="M50 14 L35 30 L65 30 Z" fill="currentColor" fillOpacity="0.3" />
                        <rect x="35" y="30" width="30" height="70" rx="5" fill="currentColor" fillOpacity="0.1" />
                        <path d="M35 30 L50 100 L65 30" strokeWidth="0.5" opacity="0.4" />
                        <path d="M35 100 L50 30 L65 100" strokeWidth="0.5" opacity="0.4" />

                        {/* New: Middle band */}
                        <path d="M35 65 L65 65" strokeWidth="0.5" opacity="0.3" />

                        <path d="M35 100 L50 115 L65 100 Z" fill="currentColor" fillOpacity="0.3" />
                    </g>
                )}
            </svg>
        </div>
    );
});
