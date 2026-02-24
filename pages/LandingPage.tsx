import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingPage as LandingPageBase } from '../components/LandingPage';
import { SEOJsonLd, getSearchSchema } from '../components/SEOJsonLd';
import { toSlug } from '../utils/slug';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sehri Finder | Community Verified Ramadan Directory 2026";

        // Set canonical for landing page
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', 'https://www.sehrifinder.com/');
    }, []);

    return (
        <>
            <SEOJsonLd type="WebSite" data={getSearchSchema()} />
            <LandingPageBase
                onEnterApp={() => navigate('/find')}
                onOpenSubmit={() => navigate('/submit')}
                onSelectCity={(city) => navigate(`/find/${toSlug(city)}`)}
            />
        </>
    );
};

export default LandingPage;
