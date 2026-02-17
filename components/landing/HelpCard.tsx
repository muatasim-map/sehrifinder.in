import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HelpCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    action: string;
    onClick: () => void;
    delay?: number;
}

export const HelpCard = React.memo(({ icon, title, desc, action, onClick, delay }: HelpCardProps) => (
    <div
        className="reveal flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
        style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-sacred flex items-center justify-center mb-6 group-hover:bg-gold-lantern group-hover:text-emerald-midnight transition-colors duration-300">
            {icon}
        </div>
        <h3 className="font-landing-heading text-xl text-emerald-midnight mb-3">{title}</h3>
        <p className="font-landing-body text-neutral-500 text-sm leading-relaxed mb-8 flex-1">
            {desc}
        </p>
        <button
            onClick={onClick}
            className="text-xs font-bold uppercase tracking-widest text-gold-antique group-hover:text-emerald-sacred flex items-center gap-2 transition-colors"
        >
            {action} <ArrowRight className="w-4 h-4" />
        </button>
    </div>
));
