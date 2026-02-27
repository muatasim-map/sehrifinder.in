import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { FooterSEO } from '../components/FooterSEO';
import { ShieldCheck, Users, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    const schema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Sehri Finder & Verification Process",
        "description": "Learn how Sehri Finder crowdsources and manually verifies Ramadan dining locations globally to ensure accuracy and community trust.",
        "url": "https://www.sehrifinder.com/about",
        "publisher": {
            "@type": "Organization",
            "name": "Sehri Finder",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.sehrifinder.com/pwa-512x512.png"
            }
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
            <Helmet>
                <title>About Us & Verification Process | Sehri Finder</title>
                <meta name="description" content="Learn how Sehri Finder crowdsources and manually verifies Ramadan dining locations globally to ensure accuracy and community trust." />
                <link rel="canonical" href="https://www.sehrifinder.com/about" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>

            <Header onOpenSubmit={() => navigate('/submit')} />

            <main className="flex-1 container mx-auto px-6 py-16 md:py-24 max-w-4xl pt-24">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-primary-dark mb-6 tracking-tight">
                        Our Mission & <span className="text-gold-antique">Verification</span> Process
                    </h1>
                    <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        Sehri Finder is a community-driven platform dedicated to helping Muslims find reliable, open locations for Suhoor during the holy month of Ramadan.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-stone-200/50 mb-16 border border-stone-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                    <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8 flex items-center gap-4">
                        <ShieldCheck className="w-8 h-8 text-gold-lantern" />
                        How We Guarantee Accuracy
                    </h2>

                    <p className="text-stone-600 leading-relaxed mb-8 text-lg">
                        During Ramadan, late-night dining hours are often completely different from regular business hours. AI and regular search engines frequently display outdated or incorrect "closing times," leading to missed meals before fasting begins. Our E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) methodology ensures you get the right information.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="bg-cream p-3 rounded-xl h-fit shrink-0">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">1. Crowd-Sourced Submissions</h3>
                                <p className="text-stone-600 leading-relaxed">Local community members submit spots they personally frequent or own, providing ground-truth data on Ramadan-specific schedules.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-cream p-3 rounded-xl h-fit shrink-0">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">2. Manual Review</h3>
                                <p className="text-stone-600 leading-relaxed">Our curation team cross-references submissions against official restaurant social margins, direct calls, and active community groups.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-cream p-3 rounded-xl h-fit shrink-0">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">3. Ongoing Freshness</h3>
                                <p className="text-stone-600 leading-relaxed">We display "Last Verified" timestamps on all listings. If a spot changes operations mid-Ramadan, our community reports it, and we update it live.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center bg-primary-dark rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">Help Us Grow The Directory</h2>
                    <p className="text-emerald-50 mb-8 max-w-xl mx-auto text-lg relative z-10">
                        Know a local Masjid, Free Community Meal, or Drive-Thru open for Sehri? Add it to the map to help fasting individuals in your city.
                    </p>
                    <button
                        onClick={() => navigate('/submit')}
                        className="relative z-10 bg-gold-antique hover:bg-gold text-primary-dark font-bold py-4 px-8 rounded-full shadow-lg shadow-gold/20 transition-all hover:scale-105 active:scale-95 text-lg"
                    >
                        Submit a Location
                    </button>
                </div>
            </main>

            <FooterSEO />
        </div>
    );
};

export default AboutPage;
