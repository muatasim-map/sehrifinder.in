import React, { MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';

interface HelpCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    action: string;
    onClick: () => void;
    delay?: number;
}

export const HelpCard = React.memo(({ icon, title, desc, action, onClick, delay }: HelpCardProps) => {
    // Comeau-style Spotlight Tracking
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className="reveal relative overflow-hidden flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Tactile Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block z-0"
                style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212,175,55,0.08), transparent 40%)`
                }}
            />

            <div className="relative z-10 w-14 h-14 rounded-full bg-emerald-50 text-emerald-sacred flex items-center justify-center mb-6 group-hover:bg-gold-lantern group-hover:text-emerald-midnight transition-colors duration-300">
                {icon}
            </div>
            <h3 className="relative z-10 font-serif text-xl text-emerald-midnight mb-3">{title}</h3>
            <p className="relative z-10 font-sans text-neutral-500 text-sm leading-relaxed mb-8 flex-1">
                {desc}
            </p>
            <button
                onClick={onClick}
                className="text-xs font-bold uppercase tracking-widest text-gold-antique group-hover:text-emerald-sacred flex items-center gap-2 transition-colors"
            >
                {action} <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
});
