/**
 * This file is used to force Tailwind CSS to include these classes in the build.
 * These are dynamically used in the codebase but might not be detected by the scanner.
 */
export const SAFELIST = [
    // Dynamic Animations
    'animate-fade-in',
    'animate-slide-up',
    'animate-pulse-slow',
    'animate-shimmer',
    'animate-float',
    'animate-scale-in',
    'animate-shine',

    // Dynamic Colors
    'text-gold',
    'text-primary',
    'bg-primary',
    'bg-gold'
];
