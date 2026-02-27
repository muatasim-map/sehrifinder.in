import { useEffect } from 'react';
import { SEO_DATA } from '../data/seoData';

import { toSlug } from '../utils/slug';

export const useSEO = (city: string, category?: string) => {
    useEffect(() => {
        const slugCity = toSlug(city);
        const data = SEO_DATA[slugCity];

        const getCategoryName = (cat: string) => {
            if (cat === 'free-community-meal' || cat === 'free') return 'Free Community Meals';
            if (cat === 'drive-thru') return 'Drive-Thrus';
            if (cat === 'buffet') return 'Buffets';
            if (cat === '24-hour' || cat === '24-hours') return '24-Hour Spots';
            if (cat === 'dessert' || cat === 'sweets') return 'Desserts';
            if (cat === 'masjid' || cat === 'mosque') return 'Masjids';
            return cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        };

        const siteName = "Sehri Finder";
        const currentYear = new Date().getFullYear();

        let title = `${siteName} | Community Verified Ramadan Directory`;
        let description = "Find verified Sehri spots, Masjids, and community meals during Ramadan 2026.";

        if (data && category) {
            const catName = getCategoryName(category);
            title = `${catName} for Sehri in ${data.city} ${currentYear} | ${siteName}`;
            description = `Find the best ${catName.toLowerCase()} for Sehri and Suhoor in ${data.city}. Verified Ramadan 2026 timings and locations.`;
        } else if (data) {
            title = `Sehri Spots in ${data.city} ${currentYear} | ${siteName} — Ramadan Directory`;
            description = data.shortDescription;
        }

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
        let canonicalUrl = baseUrl;
        if (data && category) {
            canonicalUrl = `${baseUrl}/find/${slugCity}/${category}`;
        } else if (data) {
            canonicalUrl = `${baseUrl}/find/${slugCity}`;
        }

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

        // 6. JSON-LD Schema Management
        const cleanupSchema = (id: string) => {
            const el = document.getElementById(id);
            if (el) el.remove();
        };

        const injectSchema = (id: string, schema: object) => {
            cleanupSchema(id);
            const script = document.createElement('script');
            script.id = id;
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(schema);
            document.head.appendChild(script);
        };

        // FAQ Schema
        if (data && data.faqItems && data.faqItems.length > 0) {
            injectSchema('faq-schema', {
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
            });
        } else {
            cleanupSchema('faq-schema');
        }

        // Breadcrumb Schema
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
                ...(data ? [
                    { "@type": "ListItem", "position": 2, "name": "Find Sehri", "item": `${baseUrl}/find/chennai` }, // Proxy for list page
                    { "@type": "ListItem", "position": 3, "name": data.city, "item": `${baseUrl}/find/${slugCity}` }
                ] : [])
            ]
        };
        injectSchema('breadcrumb-schema', breadcrumbSchema);

        // LocalBusiness Schema (only for city pages)
        if (data) {
            injectSchema('local-business-schema', {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": `Sehri Finder - ${data.city}`,
                "description": data.shortDescription,
                "url": `${baseUrl}/find/${slugCity}`,
                "areaServed": {
                    "@type": "City",
                    "name": data.city
                },
                "provider": {
                    "@type": "Organization",
                    "name": "Sehri Finder",
                    "url": baseUrl
                }
            });
        } else {
            cleanupSchema('local-business-schema');
        }

    }, [city]);
};
