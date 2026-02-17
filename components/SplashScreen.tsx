import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 3500); // Total display time

        return () => clearTimeout(timer);
    }, [onComplete]);

    // Bismillah Calligraphy Path (Simplified for demo)
    // Real usage would typically use a more complex SVG path
    const bismillahPath = "M50,150 Q100,50 150,150 T250,150 T350,150";

    // Using a more complex path to simulate calligraphy strokes
    // This is a placeholder for a real Bismillah vector
    const strokeVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2.5,
                ease: "easeInOut" as any,
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-emerald-midnight text-gold-lantern"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                >
                    <div className="relative w-64 h-32 md:w-96 md:h-48">
                        <svg
                            viewBox="0 0 400 200"
                            className="w-full h-full overflow-visible"
                        >
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#D4AF37" />
                                    <stop offset="50%" stopColor="#FFF7CC" />
                                    <stop offset="100%" stopColor="#D4AF37" />
                                </linearGradient>
                            </defs>

                            {/* Calligraphy Stroke Implementation */}
                            {/* Note: In a real app, this would be the actual SVG path of Bismillah */}
                            {/* Approximating the flow for visual effect */}

                            {/* Main Curve */}
                            <motion.path
                                d="M40,100 C100,20 180,180 360,60"
                                fill="none"
                                stroke="url(#goldGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                variants={strokeVariants}
                                initial="hidden"
                                animate="visible"
                            />

                            {/* Dots / Accents */}
                            <motion.circle
                                cx="180" cy="190" r="4"
                                fill="#D4AF37"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.3 }}
                            />
                            <motion.circle
                                cx="200" cy="185" r="4"
                                fill="#D4AF37"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.6, duration: 0.3 }}
                            />

                            <motion.text
                                x="200"
                                y="160"
                                textAnchor="middle"
                                className="fill-gold-lantern/80 font-serif text-sm tracking-[0.5em] uppercase"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2, duration: 0.8 }}
                            >
                                In the name of Allah
                            </motion.text>
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
