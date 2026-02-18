import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const LandingPageBase = lazy(() => import('../components/LandingPage').then(module => ({ default: module.LandingPage })));

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-emerald-midnight text-gold-lantern">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span className="font-brand tracking-widest text-sm text-white">LOADING SEHRI FINDER</span>
                </div>
            </div>
        }>
            <LandingPageBase
                onEnterApp={() => navigate('/find')}
                onOpenSubmit={() => navigate('/submit')}
            />
        </Suspense>
    );
};

export default LandingPage;
