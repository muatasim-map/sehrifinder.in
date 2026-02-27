import React, { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../config/animations';

interface CityCardProps {
    name: string;
    status: string;
    desc: string;
    delay?: number;
    onClick?: () => void;
}

export const CityCard = ({ name, status, desc, delay = 0, onClick }: CityCardProps) => {
    // Comeau-style Spotlight Tracking
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            variants={fadeInUp}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden flex items-center justify-between p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group ${onClick ? 'cursor-pointer' : ''}`}
        >
            {/* Tactile Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block z-0"
                style={{
                    background: `radial-gradient(300px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(10, 46, 35, 0.04), transparent 40%)`
                }}
            />
            <div className="relative z-10 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors"></div>
            </div>
        </motion.div>
    );
};
