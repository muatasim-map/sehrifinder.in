import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface SplashScreenProps {
    onComplete: () => void;
}

// --- Cinematic Particle System (Gold Dust) ---
const GoldParticles = () => {
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, -60],
                        x: [0, Math.random() * 20 - 10],
                        opacity: [0, 0.8, 0],
                        scale: [1, 1.5, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// --- Refined Ramadan Background (Arabesque & Crescent) ---
const RamadanBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Elegant Arabesque Lattice Pattern */}
        <motion.div
            className="absolute inset-0 opacity-[0.04]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="arabesque" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M40 0 L45 15 L60 20 L45 25 L40 40 L35 25 L20 20 L35 15 Z M0 40 L5 55 L20 60 L5 65 L0 80 L-5 65 L-20 60 L-5 55 Z M80 40 L85 55 L100 60 L85 65 L80 80 L75 65 L60 60 L75 55 Z M40 80 L45 95 L60 100 L45 105 L40 120 L35 105 L20 100 L35 95 Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                        <circle cx="40" cy="40" r="22" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                        <circle cx="0" cy="0" r="22" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                        <circle cx="80" cy="0" r="22" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                        <circle cx="0" cy="80" r="22" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                        <circle cx="80" cy="80" r="22" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#arabesque)" />
            </svg>
        </motion.div>

        {/* Cinematic Glowing Crescent Moon */}
        <motion.div
            className="absolute right-[5%] top-[10%] md:right-[15%] md:top-[12%] opacity-100 mix-blend-normal"
            animate={{
                rotate: [0, 3, -3, 0],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg width="200" height="200" viewBox="0 0 200 200" className="md:w-[300px] md:h-[300px]">
                <defs>
                    <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" /> {/* Bright Gold */}
                        <stop offset="100%" stopColor="#B8860B" /> {/* Dark Gold */}
                    </linearGradient>
                    <filter id="goldenGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Perfect Crescent Path */}
                <path d="M 140 20 A 100 100 0 1 1 20 140 A 110 110 0 0 0 140 20 Z" fill="url(#moonGlow)" filter="url(#goldenGlow)" stroke="#FFD700" strokeWidth="1" />
            </svg>
        </motion.div>
    </div>
);

// --- SplashScreen Component ---
export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Reduced duration for faster load (4.5s total)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000);
        }, 4500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#001A13] overflow-hidden px-6 md:px-0" // Deep Premium Emerald
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)", transition: { duration: 1.2, ease: "easeInOut" } }}
                >
                    {/* Importer for the elegant Arabic font */}
                    <style>
                        {`
                            @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
                            .font-arabic { font-family: 'Amiri', serif; }
                            
                            @keyframes shimmer {
                                0% { background-position: 200% center; }
                                100% { background-position: -200% center; }
                            }
                            .animate-shimmer {
                                background-size: 200% auto;
                                animation: shimmer 4s linear infinite;
                            }
                        `}
                    </style>

                    {/* Dark Vignette Overlay - Tinted to blend with Emerald */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,26,19,0)_0%,rgba(0,10,5,0.8)_100%)] z-10 pointer-events-none" />

                    <RamadanBackground />
                    <GoldParticles />

                    <div className="relative z-20 w-full max-w-5xl flex flex-col items-center justify-center mt-4 md:mt-8">

                        {/* --- LAYER 1: BISMILLAH (Top) --- */}
                        <div className="relative text-2xl md:text-5xl lg:text-6xl font-arabic w-full text-center mb-6 md:mb-10 opacity-100 max-w-[90%] mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1.0, ease: "easeOut" }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF8DC] to-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] leading-relaxed py-2" // Brighter Gold for contrast
                                dir="rtl"
                            >
                                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                            </motion.div>
                        </div>

                        {/* --- LAYER 2: RAMADAN KAREEM (Centerpiece) --- */}
                        <div className="relative text-5xl md:text-8xl lg:text-9xl font-arabic w-full text-center mb-10 md:mb-16 leading-tight">
                            {/* Glow Behind */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.5, scale: 1 }}
                                transition={{ delay: 1.0, duration: 1.5 }}
                                className="absolute inset-0 text-[#FFD700] blur-[30px] md:blur-[40px]"
                                dir="rtl"
                            >
                                رَمَضَان كَرِيم
                            </motion.div>

                            {/* Main Text with Shimmer */}
                            <motion.div
                                initial={{ clipPath: "inset(0 50% 0 50%)", filter: "blur(10px)", scale: 0.9 }} // Reveal from center
                                animate={{ clipPath: "inset(0 0% 0 0%)", filter: "blur(0px)", scale: 1 }}
                                transition={{ delay: 1.2, duration: 1.8, ease: "easeOut" }}
                                className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFFFF0] to-[#DAA520] drop-shadow-[0_4px_20px_rgba(255,215,0,0.7)] animate-shimmer py-4"
                                dir="rtl"
                            >
                                رَمَضَان كَرِيم
                            </motion.div>
                        </div>

                        {/* --- LAYER 3: ENGLISH SUBTITLES --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, duration: 1.0, ease: "easeOut" }}
                            className="flex flex-col items-center gap-4 md:gap-6 px-4 text-center"
                        >
                            <div className="flex items-center gap-2 md:gap-4 justify-center w-full">
                                <div className="h-[2px] w-8 md:w-32 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
                                <p className="text-[#TOP-GOLD] text-[#FFD700] font-serif text-xs md:text-xl tracking-[0.2em] md:tracking-[0.4em] uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
                                    Ramadan Kareem
                                </p>
                                <div className="h-[2px] w-8 md:w-32 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
                            </div>

                            <p className="text-[#FFD700]/90 font-serif text-[10px] md:text-sm tracking-[0.1em] md:tracking-[0.2em] italic max-w-md leading-relaxed drop-shadow-sm">
                                "O you who have believed, decreed upon you is fasting... that you may become righteous."
                            </p>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
