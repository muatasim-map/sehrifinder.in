import React from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from 'react-simple-maps';
import { motion } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ACTIVE_COUNTRIES = [
    "India",
    "United Kingdom",
    "Canada",
    "United States of America", // In world-atlas 110m USA is named "United States of America"
    "Malaysia"
];

interface Globe2DProps {
    className?: string;
}

export const Globe2D: React.FC<Globe2DProps> = ({ className }) => {
    const markers = [
        // India (Chennai / Mumbai)
        { name: "Chennai", coordinates: [80.2707, 13.0827] as [number, number] },
        { name: "Mumbai", coordinates: [72.8777, 19.0760] as [number, number] },
        // UK (London)
        { name: "London", coordinates: [-0.1276, 51.5072] as [number, number] },
        // Canada (Toronto)
        { name: "Toronto", coordinates: [-79.3832, 43.6532] as [number, number] },
        // USA (New York)
        { name: "New York", coordinates: [-74.0060, 40.7128] as [number, number] },
        // Malaysia (Kuala Lumpur)
        { name: "Kuala Lumpur", coordinates: [101.6869, 3.1390] as [number, number] },
    ];

    return (
        <div className={`w-full relative ${className || ''}`} style={{ filter: 'drop-shadow(0px 0px 30px rgba(212, 175, 55, 0.05))' }}>

            {/* SVG Pattern Definitions for Dot Matrix Effect */}
            <svg width="0" height="0">
                <defs>
                    <pattern id="dots-base" x="0" y="0" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
                        <circle fill="rgba(102, 170, 120, 0.12)" cx="0.8" cy="0.8" r="0.6"></circle>
                    </pattern>
                    <pattern id="dots-active" x="0" y="0" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
                        <circle fill="rgba(212, 175, 55, 0.9)" cx="1" cy="1" r="0.8"></circle>
                    </pattern>
                </defs>
            </svg>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 130,
                    center: [15, 30] // Focuses the view primarily on the Northern Hemisphere/Asia/Europe/NA
                }}
                width={800}
                height={500}
                style={{ width: "100%", height: "auto" }}
            >
                <ZoomableGroup center={[15, 30]} zoom={1} minZoom={1} maxZoom={1}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isActive = ACTIVE_COUNTRIES.includes(geo.properties.name);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={isActive ? "url(#dots-active)" : "url(#dots-base)"}
                                        stroke="transparent"
                                        strokeWidth={0}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: isActive ? "url(#dots-active)" : "rgba(212, 175, 55, 0.3)", outline: "none", cursor: isActive ? "pointer" : "default", transition: "all 0.3s ease" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>

                    {/* Markers */}
                    {markers.map(({ name, coordinates }) => (
                        <Marker key={name} coordinates={coordinates}>
                            {/* Outer Atmospheric Glow */}
                            <circle
                                r={20}
                                fill="rgba(212, 175, 55, 0.15)"
                                style={{ filter: 'blur(12px)' }}
                            />
                            {/* Middle Glow */}
                            <circle
                                r={12}
                                fill="rgba(212, 175, 55, 0.3)"
                                style={{ filter: 'blur(6px)' }}
                            />
                            {/* Core Marker */}
                            <motion.circle
                                r={5.5}
                                fill="#FFD700"
                                stroke="#0A2E23"
                                strokeWidth={2}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: Math.random() * 0.5 + 0.5
                                }}
                                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' }}
                            />
                            {/* Pulse Effect */}
                            <motion.circle
                                r={18}
                                fill="none"
                                stroke="#FFD700"
                                strokeWidth={1}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 0.4, 0], scale: [0.5, 2.5] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: Math.random() * 2
                                }}
                            />
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};
