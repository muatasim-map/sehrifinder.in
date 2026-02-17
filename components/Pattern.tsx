
import React from 'react';

export type PatternVariant =
  | 'geometric'        // Header/Hero (Simple Squares/Diamonds)
  | 'arabesque'        // Bottom Nav (Floral Vine)
  | 'hexagonal'        // App Background (Honeycomb Interlace)
  | 'octagon-star-lattice' // Listing Card
  | 'muqarnas';        // Hero (Stalactite vaulting)

interface IslamicPatternProps {
  opacity?: number;
  className?: string;
  variant?: PatternVariant;
}

/**
 * COMPONENT NOTE:
 * This component renders complex SVG patterns using path data ('d' attributes).
 * These paths are mathematically precise coordinates. 
 */
export const IslamicPattern = ({
  opacity = 0.045,
  className = "",
  variant = 'geometric'
}: IslamicPatternProps) => {
  const patternId = `islamic-pattern-${variant}`;

  // Define dimensions based on variant
  let size = 60;
  if (variant === 'arabesque') size = 50;
  if (variant === 'hexagonal') size = 40;
  if (variant === 'octagon-star-lattice') size = 40;
  if (variant === 'muqarnas') size = 80;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
            {variant === 'geometric' && (
              <g>
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="25" y="25" width="10" height="10" transform="rotate(45 30 30)" fill="currentColor" opacity="0.4" />
                <circle cx="30" cy="30" r="2.5" fill="currentColor" />
                <circle cx="0" cy="30" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="60" cy="30" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="30" cy="0" r="2.5" fill="currentColor" opacity="0.6" />
                <circle cx="30" cy="60" r="2.5" fill="currentColor" opacity="0.6" />
              </g>
            )}

            {variant === 'octagon-star-lattice' && (
              <g>
                <path d="M20 0 L20 40 M0 20 L40 20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <path
                  d="M 20 5 L 14 14 L 5 20 L 14 26 L 20 35 L 26 26 L 35 20 L 26 14 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path d="M 20 0 L 20 5 M 40 20 L 35 20 M 20 40 L 20 35 M 0 20 L 5 20" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.8" />
              </g>
            )}

            {variant === 'arabesque' && (
              <g>
                <path d="M0 50 Q 12.5 37.5, 25 25 T 50 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M50 50 Q 37.5 37.5, 25 25 T 0 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M25 25 Q 30 15, 35 25 Q 30 35, 25 25" fill="currentColor" opacity="0.3" />
                <path d="M25 25 Q 15 30, 25 35 Q 35 30, 25 25" fill="currentColor" opacity="0.3" />
                <circle cx="25" cy="25" r="3" fill="currentColor" />
              </g>
            )}

            {variant === 'hexagonal' && (
              <g>
                <path d="M20 0 L40 11.5 L40 34.5 L20 46 L0 34.5 L0 11.5 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M20 10 L30 16 L30 30 L20 36 L10 30 L10 16 Z" fill="currentColor" opacity="0.08" />
                <circle cx="20" cy="23" r="2" fill="currentColor" opacity="0.5" />
              </g>
            )}

            {variant === 'muqarnas' && (
              <g>
                {/* Muqarnas-inspired tessellation (Scale-like arches) */}
                <path d="M0 40 Q 20 0, 40 40 Q 60 80, 80 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                <path d="M40 0 V 20 M40 60 V 80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <path d="M0 0 Q 20 40, 40 0" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                <path d="M40 80 Q 60 40, 80 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.4" />
                <circle cx="0" cy="40" r="2" fill="currentColor" opacity="0.3" />
                <circle cx="80" cy="40" r="2" fill="currentColor" opacity="0.3" />
              </g>
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} className="text-current" />
      </svg>
    </div>
  );
};

export const IslamicDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full flex items-center justify-center opacity-40 ${className}`}>
    <svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="none" className="text-current">
      <path d="M0 10 L400 10" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M20 10 L30 5 L40 10 L30 15 Z M60 10 L70 5 L80 10 L70 15 Z M100 10 L110 5 L120 10 L110 15 Z M140 10 L150 5 L160 10 L150 15 Z M180 10 L190 5 L200 10 L190 15 Z M220 10 L230 5 L240 10 L230 15 Z M260 10 L270 5 L280 10 L270 15 Z M300 10 L310 5 L320 10 L310 15 Z M340 10 L350 5 L360 10 L350 15 Z M380 10 L390 5 L400 10 L390 15 Z" fill="currentColor" />
    </svg>
  </div>
);

export const IslamicCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={`w-8 h-8 pointer-events-none ${className}`}>
    {/* 4-Point Geometric Motif Corner */}
    <path d="M2 2 L15 2 L15 6 L6 6 L6 15 L2 15 Z" fill="currentColor" />
    <path d="M6 6 L12 12" stroke="currentColor" strokeWidth="1" />
    <rect x="10" y="2" width="4" height="4" fill="currentColor" opacity="0.5" />
    <rect x="2" y="10" width="4" height="4" fill="currentColor" opacity="0.5" />
  </svg>
);

export const IslamicFiligree = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={`w-12 h-12 pointer-events-none ${className}`}>
    {/* Delicate Filigree / Arabesque Corner */}
    <path d="M5 5 C 10 5, 15 10, 15 20 C 15 30, 25 25, 30 20 C 35 15, 45 15, 45 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 5 C 5 10, 10 15, 20 15 C 30 15, 25 25, 20 30 C 15 35, 15 45, 5 45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="5" r="3" fill="currentColor" />
    <circle cx="45" cy="5" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="5" cy="45" r="2" fill="currentColor" opacity="0.6" />
    <path d="M15 15 L25 25" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

export const IslamicStar = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-8 h-8 pointer-events-none ${className}`}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
  </svg>
);
