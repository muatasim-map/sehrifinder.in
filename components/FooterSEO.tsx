import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_DATA, CitySEOData } from '../data/seoData';

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
                            "url": `https://www.sehrifinder.com/find/${city.city.toLowerCase()}`
                        }))
                    })}
                </script>
            </Helmet>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center border-t border-white/5 pt-8">
                    <p className="text-white/40 text-sm">
                        Sehri Finder connects communities during Ramadan through verified, user-sourced dining locations.
                    </p>
                </div>
            </div>
        </footer>
    );
};
