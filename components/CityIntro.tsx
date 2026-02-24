import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CitySEOData, FAQItem } from '../data/seoData';

interface CityIntroProps {
    data: CitySEOData;
}

const FAQAccordion: React.FC<{ item: FAQItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left hover:text-gold-antique transition-colors group"
            >
                <span className="text-sm md:text-base font-medium text-white/90 group-hover:text-gold-antique">
                    {item.q}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gold-antique flex-shrink-0" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-white/20 group-hover:text-gold-antique flex-shrink-0" />
                )}
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <p className="pb-4 text-sm text-white/50 leading-relaxed italic">
                    {item.a}
                </p>
            </motion.div>
        </div>
    );
};

export const CityIntro: React.FC<CityIntroProps> = ({ data }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm"
            itemScope
            itemType="https://schema.org/ItemPage"
        >
            <div className="max-w-3xl">
                <header>
                    <h1 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight" itemProp="name">
                        {data.h1}
                    </h1>
                    <h2 className="text-gold-antique font-medium text-lg md:text-xl mb-4 italic">
                        {data.h2}
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
                            Published: <time dateTime="2026-02-24" itemProp="datePublished">Feb 2026</time>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
                            Verified for Ramadan 1447H
                        </span>
                    </div>
                </header>

                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8" itemProp="description">
                    {data.introText}
                </p>

                {data.faqItems.length > 0 && (
                    <section className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <HelpCircle className="w-4 h-4 text-gold-antique" />
                            <span className="text-xs uppercase tracking-widest font-bold text-white/30">
                                Frequently Asked Questions
                            </span>
                        </div>
                        <div className="space-y-1">
                            {data.faqItems.map((item, idx) => (
                                <FAQAccordion key={idx} item={item} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </motion.article>
    );
};
