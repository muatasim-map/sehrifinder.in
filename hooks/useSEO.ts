import { useEffect } from 'react';
import { SEO_DATA } from '../data/seoData';

import { toSlug } from '../utils/slug';

export const useSEO = (city: string) => {
    useEffect(() => {
        const slugCity = toSlug(city);
        const data = SEO_DATA[slugCity];

        // Base title and description
        const siteName = "Sehri Finder";
        const currentYear = new Date().getFullYear();
        const title = data
            ? `Sehri Spots in ${data.city} ${currentYear} | ${siteName} — Ramadan Directory`
            : `${siteName} | Community Verified Ramadan Directory`;

        const description = data
            ? data.shortDescription
            : "Find verified Sehri spots, Masjids, and community meals during Ramadan 2026.";

        const keywords = data?.keywords?.join(', ') || "sehri, suhoor, ramadan, sehri finder, masjid, community meals";

        // 1. Update Document Title
        document.title = title;

        // 2. Update Meta Description & Keywords
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords);

        // 3. Update OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', window.location.href);

        // 4. Update Twitter Tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', title);

        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute('content', description);

        // 5. Update Canonical
        const baseUrl = "https://www.sehrifinder.com";
        const canonicalUrl = data
            ? `${baseUrl}/find/${slugCity}`
            : baseUrl;

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

        // 6. FAQ Schema (JSON-LD)
        const existingFaq = document.getElementById('faq-schema');
        if (existingFaq) existingFaq.remove();

        if (data && data.faqItems && data.faqItems.length > 0) {
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": data.faqItems.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.a
                    }
                }))
            };
            const script = document.createElement('script');
            script.id = 'faq-schema';
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(faqSchema);
            document.head.appendChild(script);
        }

    }, [city]);
};
