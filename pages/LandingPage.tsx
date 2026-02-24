import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { SEOJsonLd, getSearchSchema } from '../components/SEOJsonLd';
import { toSlug } from '../utils/slug';

const LandingPageBase = lazy(() => import('../components/LandingPage').then(module => ({ default: module.LandingPage })));

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sehri Finder | Community Verified Ramadan Directory 2026";

        // Set canonical for landing page
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', 'https://www.sehrifinder.com/');
    }, []);

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-emerald-midnight text-gold-lantern">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span className="font-brand tracking-widest text-sm text-white">LOADING SEHRI FINDER</span>
                </div>
            </div>
        }>
            <SEOJsonLd type="WebSite" data={getSearchSchema()} />
            <LandingPageBase
                onEnterApp={() => navigate('/find')}
                onOpenSubmit={() => navigate('/submit')}
                onSelectCity={(city) => navigate(`/find/${toSlug(city)}`)}
            />
        </Suspense>
    );
};

export default LandingPage;
