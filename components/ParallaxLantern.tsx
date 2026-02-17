import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { LanternConfig } from '../types';
import { LanternSVG } from './LanternSVG';

export const ParallaxLantern = ({ lantern, scrollY }: { lantern: LanternConfig, scrollY: any }) => {
    // Use a range that makes sense for the viewport
    const y = useTransform(scrollY, [0, 1000], [0, 1000 * lantern.parallaxSpeed]);

    return (
        <motion.div
            style={{ y, zIndex: lantern.zIndex }}
            className={`absolute ${lantern.positionClass} ${lantern.mobileHidden ? 'hidden md:flex' : 'flex'} flex-col items-center will-change-transform group`}
            aria-hidden="true"
        >
            <div className={`opacity-100 origin-top ${lantern.animationClass}`}>
                <div className={`w-[1px] md:w-[1.5px] ${lantern.lineHeight} mx-auto ${lantern.gradient ? 'bg-gradient-to-b from-white/20 via-gold-lantern/50 to-gold-lantern shadow-[0_0_10px_rgba(255,215,0,0.2)]' : 'bg-white/20'}`}></div>
                <LanternSVG
                    variant={lantern.variant}
                    className={lantern.sizeClass}
                    glowColor={lantern.glowColor}
                    flickerIntensity={lantern.flickerIntensity}
                />
            </div>
        </motion.div>
    );
};
