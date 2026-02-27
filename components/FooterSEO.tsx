import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_DATA, CitySEOData } from '../data/seoData';
import { COUNTRIES } from '../data/locations';
import { toSlug } from '../utils/slug';

export const FooterSEO: React.FC = () => {
    // Convert object to array
    const cities = Object.values(SEO_DATA) as CitySEOData[];

    return (
        <footer className="w-full bg-emerald-midnight border-t border-white/5 pt-12 pb-24 md:pb-12 mt-auto">
            {/* 
              Headless SEO Approach:
              Instead of rendering a cluster of links that look spammy or hurt UX,
              we map out the site's top-level architecture entirely in JSON-LD.
              Google parses this invisibly and uses it to understand the relationship
              between the home page and the programmatic city pages.
            */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": cities.map((city, index) => ({
                            "@type": "SiteNavigationElement",
                            "position": index + 1,
                            "name": `Sehri Locations in ${city.city}`,
                            "description": city.shortDescription,
                            "url": `https://www.sehrifinder.com/find/${toSlug(city.city)}`
                        }))
                    })}
                </script>
            </Helmet>

            <div className="container mx-auto px-6 max-w-6xl">
                {/* 
                  Internal Link Grid (SEO Booster)
                  Google weights <a> tags much higher than JSON-LD alone.
                  This grid provides crawlable paths to all programmatic pages.
                */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16">
                    {COUNTRIES.map((country) => (
                        <div key={country.code} className="flex flex-col gap-3">
                            <h3 className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
                                {country.name}
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {country.cities.map((city) => (
                                    <li key={city.name}>
                                        <a
                                            href={`/find/${toSlug(city.name)}`}
                                            className="text-white/50 hover:text-gold-antique text-sm transition-colors"
                                        >
                                            Sehri in {city.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
                            Information
                        </h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="/about" className="text-white/40 hover:text-gold-antique text-sm transition-colors">
                                    About & Verification
                                </a>
                            </li>
                            <li>
                                <a href="/submit" className="text-white/40 hover:text-gold-antique text-sm transition-colors">
                                    Submit a Spot
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
                            Popular Areas
                        </h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="/find/chennai/triplicane" className="text-white/40 hover:text-gold-antique text-sm transition-colors">
                                    Sehri in Triplicane
                                </a>
                            </li>
                            <li>
                                <a href="/find/chennai/royapettah" className="text-white/40 hover:text-gold-antique text-sm transition-colors">
                                    Sehri in Royapettah
                                </a>
                            </li>
                            <li>
                                <a href="/find/mumbai/mohammed-ali-road" className="text-white/40 hover:text-gold-antique text-sm transition-colors">
                                    Suhoor on Mohammed Ali Road
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center border-t border-white/5 pt-8">
                    <p className="text-white/40 text-sm italic">
                        "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous." — Surah Al-Baqarah 2:183
                    </p>
                    <p className="text-white/20 text-[11px] mt-4 uppercase tracking-widest">
                        Sehri Finder connects communities during Ramadan through verified, user-sourced dining locations.
                    </p>
                </div>
            </div>
        </footer>
    );
};
