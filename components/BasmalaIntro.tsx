
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BasmalaIntroProps {
    onComplete: () => void;
}

export const BasmalaIntro: React.FC<BasmalaIntroProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Allow exit animation to finish before unmounting parent
            setTimeout(onComplete, 1000);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="intro-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[9999] bg-[#0A2E23] flex items-center justify-center overflow-hidden"
                >
                    <div className="relative w-full max-w-lg px-8 text-center">

                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-antique/10 blur-[100px] rounded-full animate-pulse-slow"></div>

                        {/* Bismillah Calligraphy (SVG or Text) */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            <h1 className="font-arabic-calligraphy text-5xl md:text-7xl text-gold-lantern drop-shadow-lg leading-relaxed">
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </h1>
                            <p className="font-serif text-gold-light/60 mt-4 tracking-[0.2em] text-sm uppercase">
                                In the name of Allah, the Most Gracious, the Most Merciful
                            </p>
                        </motion.div>

                        {/* Branding */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-12 opacity-50"
                        >
                            <span className="font-brand text-xl text-emerald-sage tracking-widest">
                                SEHRI FINDER
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
