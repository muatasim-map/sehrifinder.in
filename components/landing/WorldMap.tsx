import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';
import { COUNTRIES } from '../../data/locations';
import { toSlug } from '../../utils/slug';

interface WorldMapProps {
    onSelectCity: (city: string) => void;
}

// Simplified World Path (Equirectangular)
// Source: https://github.com/djaiss/mapsicon/blob/master/all/world/vector.svg (MIT)
const WORLD_PATH = "M156.4,339.5c-4,0.3-6.1,1.8-6.1,4.4s2.1,4,6.1,4.4c3,0.3,13,0.5,13,0.5s13.4-0.1,15.7-0.1 c0.2,0,0.5,0,0.7,0.1c0,0,0.5,0.3,5.9,0.5c5.4,0.3,11.5,0,13.8,0s4.1,3,4.1,6.8c0,3.7,1.8,6.8,4.1,6.8c1,0,3.4,0,4.7,0 c1.4,0,2.5,0.1,2.5,0.4c0,0.2-1.1,0.4-2.5,0.4c-1.4,0-2.5,0.2-2.5,0.4c0,0.2,1.1,0.4,2.5,0.4c2.8,0,5-0.3,5-0.7c0-0.4,1.4-1.3,3.1-2.1 c1.7-0.7,3.1-1.7,3.1-2.2c0-0.5,1.4-1,3.1-1c2.1,0,3.1-1,3.1-3.1s1-3.1,3.1-3.1c1.7,0,3.1-1.4,3.1-3.1s1.4-3.1,3.1-3.1 c1.4,0,2.1-0.7,1.6-1.6c-1-1.6,2.1-15.6,3.6-15.6h3.6l10.8,4.1h20.1l7.3-3.6l1.3-13.6h2.2l3.6-7.3l2.8-5.3l17.4-5.3l7.9,1.3l8.8-1.3 l9.4-4.7l6.5,4.7l13-4.7H414l6.5-6.5l23.5-6.5l8.1-14.5l-4.5-9.3l1.3-10.4l10.4-1.3l21.3,1.3l2.2,9.3l16.1,6.7l5.2,5.2l-2.6,3.1 l1.3,10.4l7.8,2.6l3.9,7.8l6.5-1.3l2.6,3.1l2.6,18.8l32.5,11.2l6.5,11.2l-5.2,5.2l1.3,11.3l13.9,5.2l20.4-0.5l-5.6,13.9l12.1,3.3 l6.5,2.6l3.1,7.2l12.7,4.3l37,2l19.5,10.4l11.7,7.8l5.2,6.5h10.4l19.5,13l13-4.7l11.2-11.2l4.7,0h17l19.5,11.2l13-13l32.5,1.3 l6.5-13V434l-11.2-11.2l4.2-31.2l10.4-3.1l6.5-13l6.5-1.3l11.2,11.2l13,6.5l6.5,13h10.4l13,11.2l13,4.7l19.5,4.7l6.5,13l13,1.3l6.5,4.7 l43.2-11.2l2.3-25.2l12.7-18.2l-0.3-44.5L953,307l21.4-35l-2.6-32.5l-21.3-35.1l-24.7-6.5l-19.5-32.5l2.6-43.2h-17V101l-14.7-17l-13-13 h-13l-13-13l-34.9,2.6l-63.1,43.2H719l-43.2,19.5l-12.2,14.5l6.5,12.7l-9.3,2.7l-10-8.2l-14,0.5l-16-16l-1.3-16.1l11.2-11.2l-4.7-20 l-4.7-6.5L608.6,88l-6.5-6.5l-13-1.3L563.1,67l-26,1.4l-16.1,16.1l1.3,11.2l-16.1,1.3l-5.6,5.6l-20.4,1.3V140l-26,1.3l-13-26l-32.5-4.7 l-13,13l-11.2,11.2l-6.5,13l-3.3,12.4l-12.7,4.1l-16.1-9.3l-13-6.5l-32.5,1.3l-3.4-3.4l-6.5-1.3l-13-6.5l-6.5-1.3L301,114l-13-13 l-6.5,1.3l-6.5-1.3l-4.7-4.7l-13-1.3h-19.5l-19.5,13l-13-1.3H193l-3.1-3.1l-10,3.1h-13l-19.5-1.3h-13l-1.3,10.4L114,120.4v26l-3.1,3.1 l-11.2,4.7l-1.3,21.3l-10.4,1.3l-4.7,6.5l9.3,2.2l19.5,1.3h11.2l-1.3,6.5l-6.5,13l-13-1.3H90.1l-22,6.5l-1.3,13l21.3,1.3l11.2,4.7h26 l6.5,4.7h20.4l16-6.1l4.4-4.4l11.2,6.1l13,6.5l1.3,13h-21.3l1.3,13l21.3,4.1h20.4l1.3,13l6.5,1.3l8,8l22.7,1.3h10.4L188,300l1,19.5 l6.5,6.5l-6.5,6.5l1.3,6.5L156.4,339.5z";

export const WorldMap: React.FC<WorldMapProps> = ({ onSelectCity }) => {
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    // Map Projection helper lat/lng to x/y
    // ViewBox is 1000 x 500 (approx world map ratio)
    const project = (lat: number, lng: number) => {
        const x = ((lng + 180) * (1000 / 360));
        const y = ((90 - lat) * (500 / 180));
        return { x, y };
    };

    return (
        <div className="w-full relative py-8 overflow-hidden">
            {/* Background Map SVG */}
            <div className="relative aspect-[2/1] w-full max-w-5xl mx-auto">
                <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(2, 44, 34, 0.4))' }}
                >
                    {/* World Base */}
                    <path
                        d={WORLD_PATH}
                        fill="#022c22"
                        className="transition-colors duration-700"
                        style={{ opacity: 0.95 }}
                    />

                    {/* World Glow / Subtle Grid Alternative */}
                    <path
                        d={WORLD_PATH}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.5"
                        strokeOpacity="0.1"
                    />

                    {/* City Pins */}
                    {COUNTRIES.flatMap(country =>
                        country.cities.map(city => {
                            const { x, y } = project(city.lat, city.lng);
                            const isHovered = hoveredCity === city.name;

                            return (
                                <g
                                    key={city.name}
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectCity(city.name);
                                    }}
                                    onMouseEnter={() => setHoveredCity(city.name)}
                                    onMouseLeave={() => setHoveredCity(null)}
                                >
                                    {/* Pulse Animation */}
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        initial={{ r: 4, opacity: 0 }}
                                        animate={{
                                            r: [4, 12, 4],
                                            opacity: [0.1, 0.3, 0.1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        fill="#D4AF37"
                                    />

                                    {/* Main Pin */}
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        r={isHovered ? 5 : 3.5}
                                        fill={isHovered ? "#B8860B" : "#D4AF37"}
                                        stroke="#022c22"
                                        strokeWidth="1"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.5 }}
                                        className="transition-all duration-300"
                                        style={{ filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.8))' }}
                                    />

                                    {/* Floating Label (Tooltip) */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.g
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: -12 }}
                                                exit={{ opacity: 0, y: -5 }}
                                            >
                                                <rect
                                                    x={x - 45}
                                                    y={y - 35}
                                                    width={90}
                                                    height={22}
                                                    rx={4}
                                                    fill="#022c22"
                                                    stroke="#D4AF37"
                                                    strokeWidth="0.5"
                                                    style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
                                                />
                                                <text
                                                    x={x}
                                                    y={y - 20}
                                                    textAnchor="middle"
                                                    fill="#D4AF37"
                                                    fontSize="10"
                                                    fontWeight="bold"
                                                    className="font-sans tracking-tight"
                                                >
                                                    {city.name}
                                                </text>
                                            </motion.g>
                                        )}
                                    </AnimatePresence>
                                </g>
                            );
                        })
                    )}
                </svg>

                {/* Mobile Hint */}
                <div className="md:hidden mt-4 flex items-center justify-center gap-2 text-emerald-midnight/40 italic text-[10px] tracking-widest uppercase">
                    <Globe className="w-3 h-3 animate-spin-slow" />
                    Interactive Map • Tap Pins
                </div>
            </div>

            {/* Static Legend (Optional but good for ROI) */}
            <div className="mt-12 max-w-4xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4">
                {COUNTRIES.map(country => (
                    <div key={country.code} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-antique shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                        <span className="text-[10px] font-bold text-emerald-midnight/40 uppercase tracking-[0.2em]">
                            {country.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
