import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Moon } from 'lucide-react';
import { useSehriCountdown } from '../hooks/useSehriCountdown';

interface SehriCountdownProps {
    /** Timing string from any visible spot — e.g. "03:00 - 04:30" */
    timing: string;
    city?: string;
}

const Digit: React.FC<{ val: string }> = ({ val }) => (
    <AnimatePresence mode="popLayout">
        <motion.span
            key={val}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="inline-block tabular-nums"
        >
            {val}
        </motion.span>
    </AnimatePresence>
);

const pad = (n: number) => String(n).padStart(2, '0');

export const SehriCountdown: React.FC<SehriCountdownProps> = ({ timing, city }) => {
    const { hours, minutes, seconds, isActive, isPast, endTimeStr } = useSehriCountdown(timing);

    if (!endTimeStr) return null;

    return (
        <div className="flex items-center gap-3 bg-emerald-sacred/20 backdrop-blur-md border border-emerald-sacred/30 rounded-2xl px-5 py-3 shadow-lg">
            <div className="flex items-center gap-1.5">
                {isActive ? (
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-lantern opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-lantern" />
                    </span>
                ) : (
                    <Moon className="w-4 h-4 text-gold-lantern/60" />
                )}
            </div>

            <div className="flex flex-col">
                {isActive ? (
                    <>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-lantern/70 leading-none mb-1">
                            Sehri ends in
                        </span>
                        <div className="flex items-center gap-0.5 text-white font-bold text-xl leading-none font-mono">
                            <Digit val={pad(hours)} />
                            <span className="text-gold-lantern/60 mx-0.5 pb-0.5">:</span>
                            <Digit val={pad(minutes)} />
                            <span className="text-gold-lantern/60 mx-0.5 pb-0.5">:</span>
                            <Digit val={pad(seconds)} />
                        </div>
                    </>
                ) : isPast ? (
                    <span className="text-sm font-medium text-white/60">
                        Sehri has ended · Fajr at {endTimeStr}
                    </span>
                ) : (
                    <span className="text-sm font-medium text-white/80">
                        <span className="text-gold-lantern font-bold">{city || 'Your city'}</span> · Sehri until {endTimeStr}
                    </span>
                )}
            </div>

            <Clock className="w-4 h-4 text-white/20 ml-auto shrink-0" />
        </div>
    );
};
