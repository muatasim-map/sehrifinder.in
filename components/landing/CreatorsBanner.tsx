import React from 'react';
import { motion } from 'framer-motion';

/**
 * A cinematic, atmospheric full-width strip that lives between page sections.
 * On-brand with SehriFinder's dark emerald + gold aesthetic.
 * Subtly communicates the creator ecosystem without feeling like an advertisement.
 */
export const CreatorsStrip: React.FC = () => (
    <div className="relative bg-emerald-midnight border-y border-gold-lantern/10 py-4 overflow-hidden">
        {/* Subtle animated scanline */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_3px)] bg-[size:100%_4px]"></div>
        {/* Gold edge glows */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gold-lantern/5 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gold-lantern/5 to-transparent pointer-events-none"></div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6"
        >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                <span className="text-neutral-ivory/30 text-[10px] uppercase tracking-[0.35em] font-landing-accent whitespace-nowrap shrink-0">
                    From the creators of
                </span>

                <div className="flex items-center gap-5 sm:gap-6">
                    {/* QurAnLingo */}
                    <a
                        href="https://dev.quranlingo.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                        title="Learn 85% of Quranic Arabic"
                    >
                        <img
                            src="/quranlingo-logo.png"
                            alt="QurAnLingo"
                            className="h-6 sm:h-7 object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300 brightness-0 invert"
                            loading="lazy"
                        />
                    </a>

                    {/* Divider dot */}
                    <span className="w-1 h-1 rounded-full bg-gold-lantern/20 shrink-0"></span>

                    {/* DeenFlix */}
                    <div className="flex items-center gap-2 opacity-30 cursor-default" title="Coming Soon">
                        <span className="font-brand text-sm sm:text-base text-neutral-pearl tracking-wide">
                            Deen<span className="text-gold-antique">Flix</span>
                        </span>
                        <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-gold-antique/60 border border-gold-antique/20 px-1.5 py-0.5 rounded-full font-landing-accent">
                            Soon
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
);
