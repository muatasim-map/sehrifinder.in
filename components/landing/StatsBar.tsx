import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Globe, MapPin, CheckCircle2, Heart } from 'lucide-react';

interface StatItemProps {
    label: string;
    value: number;
    suffix?: string;
    icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, suffix = "", icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const springValue = useSpring(0, {
        stiffness: 100,
        damping: 30,
        duration: 1500,
    });

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-2xl bg-gold-lantern/10 border border-gold-lantern/20 text-gold-lantern mb-2">
                {icon}
            </div>
            <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-landing-heading text-white flex items-baseline">
                    <motion.span>{displayValue}</motion.span>
                    <span>{suffix}</span>
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-lantern/60 mt-1 text-center">
                    {label}
                </div>
            </div>
        </div>
    );
};

export const StatsBar: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-6 bg-emerald-midnight/60 backdrop-blur-md rounded-3xl border border-gold-lantern/20 shadow-2xl relative overflow-hidden group">
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative z-10">
                <StatItem
                    label="Cities Served"
                    value={20}
                    suffix="+"
                    icon={<Globe className="w-6 h-6" />}
                />
                <StatItem
                    label="Countries"
                    value={5}
                    icon={<MapPin className="w-6 h-6" />}
                />
                <StatItem
                    label="Verified Spots"
                    value={500}
                    suffix="+"
                    icon={<CheckCircle2 className="w-6 h-6" />}
                />
                <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-2xl bg-gold-lantern/10 border border-gold-lantern/20 text-gold-lantern mb-2">
                        <Heart className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-landing-heading text-gold-lantern uppercase tracking-wider">
                            FREE
                        </div>
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-lantern/60 mt-1 text-center">
                            Trust & Community
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
