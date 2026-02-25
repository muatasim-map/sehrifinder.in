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
                    <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle fill="rgba(212, 175, 55, 0.4)" cx="2" cy="2" r="1.2"></circle>
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
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="url(#dots)"
                                    stroke="rgba(10, 46, 35, 1)"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "rgba(212, 175, 55, 0.8)", outline: "none", cursor: "pointer", transition: "all 0.3s ease" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {/* Markers */}
                    {markers.map(({ name, coordinates }) => (
                        <Marker key={name} coordinates={coordinates}>
                            <motion.circle
                                r={6}
                                fill="#D4AF37"
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
                            />
                            <motion.circle
                                r={15}
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth={2}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0.6, 0], scale: [0, 2.5] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: Math.random() // staggered pulses
                                }}
                            />
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};
