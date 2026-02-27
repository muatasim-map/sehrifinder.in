import React from 'react';
import { useParams } from 'react-router-dom';
import { VerificationBadge } from '../components/VerificationBadge';
import { useSehri } from '../context/SehriContext';

const EmbedBadgePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { allSpots, isLoadingData } = useSehri();

    const spotId = slug && slug.includes('-') ? parseInt(slug.split('-')[0]) : null;
    const spot = spotId ? allSpots.find(s => s.id === spotId) : null;

    if (isLoadingData) return null;

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
            <a
                href={spot ? `https://www.sehrifinder.com/spot/${slug}` : 'https://www.sehrifinder.com'}
                target="_blank"
                rel="noopener"
                className="cursor-pointer block"
            >
                <VerificationBadge
                    venueName={spot?.name}
                    city={spot?.city}
                    theme="gold"
                />
            </a>
        </div>
    );
};

export default EmbedBadgePage;
