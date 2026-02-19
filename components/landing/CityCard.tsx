import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../config/animations';

interface CityCardProps {
    name: string;
    status: string;
    desc: string;
    delay?: number;
    onClick?: () => void;
}

export const CityCard = ({ name, status, desc, delay = 0, onClick }: CityCardProps) => (
    <motion.div
        variants={fadeInUp}
        onClick={onClick}
        className={`flex items-center justify-between p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group ${onClick ? 'cursor-pointer' : ''}`}
    >
        <div>
            <div className="flex items-center gap-3 mb-1">
                <h3 className="font-landing-heading text-2xl text-emerald-midnight">{name}</h3>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase tracking-widest font-bold rounded-full">{status}</span>
            </div>
            <p className="text-gray-400 text-xs font-landing-body">{desc}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors"></div>
        </div>
    </motion.div>
);
