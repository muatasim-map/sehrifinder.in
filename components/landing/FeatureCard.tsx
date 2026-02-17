import React from 'react';
import { motion } from 'framer-motion';
import { IslamicCorner } from '../Pattern';
import { fadeInUp } from '../../config/animations';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    tag: string;
    delay?: number;
}

export const FeatureCard = React.memo(({ icon, title, desc, tag, delay = 0 }: FeatureCardProps) => (
    <motion.div
        variants={fadeInUp}
        className="group relative p-6 rounded-lg border border-gold-lantern/30 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold-lantern/60 transition-all duration-500 overflow-hidden"
    >
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"></div>

        {/* Decorative Corners for Features */}
        <div className="absolute top-2 right-2 text-gold-lantern/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <IslamicCorner className="w-5 h-5 rotate-90" />
        </div>
        <div className="absolute bottom-2 left-2 text-gold-lantern/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <IslamicCorner className="w-5 h-5 -rotate-90" />
        </div>

        <div className="relative h-full flex flex-col items-start z-10">
            <div className="w-12 h-12 rounded-full bg-gold-lantern/10 border border-gold-lantern/20 flex items-center justify-center text-gold-lantern mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                {icon}
            </div>

            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border border-gold-antique/20 bg-gold-antique/5 text-gold-antique text-[10px] font-bold uppercase tracking-widest mb-3">
                {tag}
            </div>

            <h3 className="font-landing-heading text-2xl text-neutral-pearl mb-2 group-hover:text-gold-highlight transition-colors text-glow">{title}</h3>
            <p className="font-landing-body text-neutral-ivory/60 text-sm leading-relaxed font-light">{desc}</p>
        </div>
    </motion.div>
));
