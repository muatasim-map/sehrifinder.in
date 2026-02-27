import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { CitySEOData, FAQItem } from '../data/seoData';
import { COUNTRIES } from '../data/locations';
import { toSlug } from '../utils/slug';

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
    // Top intent categories
    const topCategories = [
        { label: 'Free Community Meals', slug: 'free-community-meal' },
        { label: 'Drive-Thrus', slug: 'drive-thru' },
        { label: 'Sehri Buffets', slug: 'buffet' },
        { label: '24-Hour Spots', slug: '24-hour' },
    ];

    const currentSlug = toSlug(data.city);

    // Find nearby cities (cities in same country)
    let nearbyCities: { name: string; slug: string }[] = [];
    for (const country of COUNTRIES) {
        const cityNames = country.cities.map(c => c.name);
        if (cityNames.includes(data.city)) {
            nearbyCities = cityNames
                .filter(name => name !== data.city)
                .slice(0, 5)
                .map(name => ({ name, slug: toSlug(name) }));
            break;
        }
    }

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

                {data.featuredSpots && data.featuredSpots.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-gold-antique" />
                            <span className="text-xs uppercase tracking-widest font-bold text-white/30">
                                Famous Verified Spots
                            </span>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {data.featuredSpots.map((spot, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-white/70 italic"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-antique/40" />
                                    {spot}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Internal Linking: Programmatic Categories & Nearby Cities */}
                <div className="flex flex-col md:flex-row gap-6 mb-8 border-t border-white/10 pt-8 mt-2">
                    {/* Top Categories */}
                    <div className="flex-1">
                        <h3 className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-bold mb-3 flex items-center gap-2">
                            Browse by Category
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {topCategories.map(cat => (
                                <a
                                    key={cat.slug}
                                    href={`/find/${currentSlug}/${cat.slug}`}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-gold-antique/20 hover:text-gold-antique text-white/70 text-xs font-medium transition-all border border-white/5 hover:border-gold-antique/30"
                                >
                                    {cat.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nearby Cities */}
                    {nearbyCities.length > 0 && (
                        <div className="flex-1">
                            <h3 className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-bold mb-3 flex items-center gap-2">
                                Nearby Region
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {nearbyCities.map(city => (
                                    <a
                                        key={city.slug}
                                        href={`/find/${city.slug}`}
                                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-gold-antique/20 hover:text-gold-antique text-white/70 text-xs font-medium transition-all border border-white/5 hover:border-gold-antique/30"
                                    >
                                        Sehri in {city.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

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
                {/* From the Creators */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4">
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.25em] font-bold whitespace-nowrap">From the creators of</span>
                    <a href="https://dev.quranlingo.in" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform" title="Learn 85% of Quranic Arabic">
                        <img src="/quranlingo-logo.png" alt="QurAnLingo" width="100" height="36" className="h-9 object-contain opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
                    </a>
                    <span className="w-px h-4 bg-white/10"></span>
                    <span className="font-serif text-sm text-white/30">Deen<span className="text-gold-antique/50">Flix</span></span>
                </div>
            </div>
        </motion.article>
    );
};
