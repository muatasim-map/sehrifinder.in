import React from 'react';

interface SEOJsonLdProps {
    type: 'WebSite' | 'LocalBusiness' | 'ItemList' | 'BreadcrumbList';
    data: any;
}

export const SEOJsonLd: React.FC<SEOJsonLdProps> = ({ type, data }) => {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": type,
        ...data
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
        />
    );
};

// Helper to generate City Page Schema
export const getCitySchema = (cityName: string, description: string, url: string) => ({
    "name": `Sehri Spots in ${cityName}`,
    "description": description,
    "url": url,
    "areaServed": {
        "@type": "City",
        "name": cityName
    },
    "provider": {
        "@type": "Organization",
        "name": "Sehri Finder",
        "url": "https://www.sehrifinder.com"
    }
});

// Helper to generate Site Search Schema
export const getSearchSchema = () => ({
    "name": "Sehri Finder",
    "url": "https://www.sehrifinder.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.sehrifinder.com/find?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
});
