import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { useSehri } from '../context/SehriContext';
import { MapPin, Clock, Phone, Navigation, ArrowLeft, Star, Heart, CheckCircle2, Copy, Code, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { SEOJsonLd } from '../components/SEOJsonLd';
import { getCountryByCity } from '../data/locations';
import { toSlug, fromSlug } from '../utils/slug';

export default function SpotPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { allSpots, isLoadingData, savedSpotIds, toggleSave } = useSehri();

    // The slug is technically just the spot name slugified.
    // If there are duplicate names, we might want `/spot/:id-:slug`.
    // Assuming the user is passing id-slug like `123-masjid-e-noor`
    const spotId = slug ? parseInt(slug.split('-')[0]) : null;

    const spot = useMemo(() => {
        if (!spotId) return null;
        return allSpots.find(s => s.id === spotId);
    }, [allSpots, spotId]);

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-zillij flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-primary-light border-t-primary animate-spin" />
                </div>
            </div>
        );
    }

    if (!spot) {
        return (
            <div className="min-h-screen bg-zillij flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-2xl text-primary-dark font-serif font-bold mb-4">Spot Not Found</h1>
                    <p className="text-gray-600 mb-8">This Sehri spot might have been removed or doesn't exist.</p>
                    <button onClick={() => navigate('/find')} className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl transition-colors">
                        Return to Map
                    </button>
                </div>
            </div>
        );
    }

    const isSaved = savedSpotIds.includes(spot.id);

    // Dynamic Breadcrumb and Schemas
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": spot.city,
                "item": `${window.location.origin}/find/${toSlug(spot.city)}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": spot.name,
                "item": window.location.href
            }
        ]
    };

    const restaurantSchema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": spot.name,
        "image": `${window.location.origin}/pwa-512x512.png`,
        "@id": window.location.href,
        "url": window.location.href,
        "telephone": spot.phones?.[0] || "",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": spot.address,
            "addressLocality": spot.area,
            "addressRegion": spot.city,
            "addressCountry": getCountryByCity(spot.city)?.name || "Unknown"
        },
        "geo": spot.latitude && spot.longitude ? {
            "@type": "GeoCoordinates",
            "latitude": spot.latitude,
            "longitude": spot.longitude
        } : undefined,
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "description": spot.timing,
            "opens": spot.timing.split('-')[0]?.trim() || "00:00",
            "closes": spot.timing.split('-')[1]?.trim() || "05:00"
        },
        "priceRange": spot.foodType === "Free" ? "$0" : "$$"
    };

    return (
        <div className="min-h-screen bg-zillij pb-24 md:pb-0">
            <Header />

            {/* SEO and Schema */}
            <SEOJsonLd schema={restaurantSchema} />
            <SEOJsonLd schema={breadcrumbSchema} />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb Navigation */}
                <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center space-x-2">
                    <Link to="/find" className="hover:text-primary transition-colors">Find Sehri</Link>
                    <span>/</span>
                    <Link to={`/find/${toSlug(spot.city)}`} className="hover:text-primary transition-colors">{spot.city}</Link>
                    <span>/</span>
                    <span className="text-primary-dark truncate">{spot.name}</span>
                </nav>

                <div className="bg-white/80 backdrop-blur-md border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-2"
                            >
                                {spot.name}
                            </motion.h1>
                            <div className="flex items-center text-gray-600 gap-2 font-medium bg-gray-50 px-3 py-1.5 rounded-lg inline-flex">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{spot.area}, {spot.city}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleSave(spot.id)}
                                className={`p-3 rounded-full shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary ${isSaved ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                aria-label={isSaved ? "Remove from saved" : "Save spot"}
                            >
                                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                            <a
                                href={spot.googleMapsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name} ${spot.address} ${spot.city}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl transition-all font-semibold shadow-md active:scale-95"
                            >
                                <Navigation className="w-5 h-5" />
                                <span>Get Directions</span>
                            </a>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {spot.venueType && (
                            <span className="px-3 py-1 bg-surface border border-primary/20 text-primary-dark rounded-full text-sm font-medium">
                                {spot.venueType}
                            </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${spot.foodType === 'Free' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            {spot.foodType}
                        </span>
                        {spot.verified && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Verified {spot.lastVerified}
                            </span>
                        )}
                    </div>

                    {/* Grid Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface/50 border border-gray-100 p-6 rounded-xl mb-8">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Sehri Timings</h3>
                                <p className="text-gray-900 font-medium">{spot.timing}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Address</h3>
                                <p className="text-gray-900 font-medium leading-snug">{spot.address}</p>
                            </div>
                        </div>

                        {(spot.phones?.length > 0 || spot.contactPerson) && (
                            <div className="flex items-start gap-3 md:col-span-2">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Contact</h3>
                                    {spot.contactPerson && <p className="text-gray-900 font-medium mb-1">{spot.contactPerson}</p>}
                                    {spot.phones?.map((phone, idx) => (
                                        <a key={idx} href={`tel:${phone}`} className="text-primary hover:underline block font-medium">
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Features and Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {spot.features?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-primary" /> Features
                                </h3>
                                <ul className="space-y-2">
                                    {spot.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {spot.specialNotes && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Notes</h3>
                                <div className="bg-amber-50 border border-amber-100 text-amber-900 p-4 rounded-xl leading-relaxed">
                                    {spot.specialNotes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Badge Embed Widget (Growth Hack) */}
                <div className="mt-12 pt-12 border-t border-gray-100">
                    <div className="bg-emerald-midnight rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-antique/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-xl font-serif font-bold mb-2 flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-gold-antique" />
                                Is this your business?
                            </h3>
                            <p className="text-emerald-100/70 mb-6 text-sm leading-relaxed max-w-xl">
                                Showcase your verified status on your own website. Paste this code to display your official Sehri Finder 2026 verification badge.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-black/20 rounded-xl p-4 font-mono text-xs flex items-center justify-between gap-4 border border-white/5">
                                    <code className="text-gold-antique/90 break-all leading-relaxed">
                                        {`<iframe src="${window.location.origin}/embed/badge/${slug}" width="200" height="200" frameborder="0" scrolling="no"></iframe>`}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(`<iframe src="${window.location.origin}/embed/badge/${slug}" width="200" height="200" frameborder="0" scrolling="no"></iframe>`);
                                            toast.success('Embed code copied!');
                                        }}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                                        title="Copy Code"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link
                                        to={`/embed/badge/${slug}`}
                                        target="_blank"
                                        className="text-xs text-gold-antique/60 hover:text-gold-antique transition-colors flex items-center gap-1"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Preview Badge
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
