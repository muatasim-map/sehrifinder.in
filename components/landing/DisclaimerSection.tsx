import React from 'react';
import { ShieldAlert, Info, AlertTriangle, Scale, Building2, FileWarning } from 'lucide-react';
import { IslamicPattern, IslamicStar } from '../Pattern';

export const DisclaimerSection = React.memo(() => {
    return (
        <section className="py-24 bg-emerald-midnight relative border-t border-red-500/10 overflow-hidden text-neutral-300">
            {/* Background Texture - Subtle Red Tint & Islamic Patterns */}
            <div className="absolute inset-0 bg-red-950/20 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <IslamicPattern variant="hexagonal" className="text-red-500" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-0 md:left-12 -translate-y-1/2 opacity-20 hidden md:block">
                            <IslamicStar className="w-16 h-16 text-red-500 animate-pulse-slow" />
                        </div>
                        <div className="absolute top-1/2 right-0 md:right-12 -translate-y-1/2 opacity-20 hidden md:block">
                            <IslamicStar className="w-16 h-16 text-red-500 animate-pulse-slow" />
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <ShieldAlert className="w-3 h-3" />
                            <span>Community Advisory</span>
                        </div>
                        <h2 className="font-landing-heading text-3xl md:text-5xl text-neutral-pearl mb-6">
                            Important <span className="text-red-500 italic">Disclaimer</span>
                        </h2>
                        <div className="h-1 w-24 bg-red-900/30 mx-auto rounded-full relative">
                            <div className="absolute left-1/2 -translate-x-1/2 -top-1">
                                <IslamicStar className="w-3 h-3 text-red-500/50" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Section 1: Initiative Context */}
                        <div className="bg-emerald-sacred/40 border border-red-500/10 p-8 rounded-2xl backdrop-blur-md hover:bg-emerald-sacred/60 transition-colors shadow-sm">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-gold-lantern" />
                                Our Initiative
                            </h3>
                            <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
                                <p>
                                    <strong className="text-white">Sehri Finder</strong> is a voluntary, non-profit community effort established to connect Masjids, charities, and food providers with those observing fasting.
                                </p>
                                <p>
                                    Our core mission is to facilitate access to Sehri and Iftar resources so that no community member goes hungry.
                                </p>
                                <p className="p-3 bg-red-950/30 rounded-lg border-l-2 border-red-500 text-red-100/90">
                                    We operate strictly as a non-commercial entity. We are <span className="text-white font-bold">NOT</span> an agency, food supplier, or delivery service.
                                </p>
                            </div>
                        </div>

                        {/* Section 2: Listings & Responsibility */}
                        <div className="bg-emerald-sacred/40 border border-red-500/10 p-8 rounded-2xl backdrop-blur-md hover:bg-emerald-sacred/60 transition-colors shadow-sm">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-gold-lantern" />
                                Listing Responsibility
                            </h3>
                            <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
                                <p>
                                    Participation by providers is entirely voluntary. Each provider bears <strong className="text-white">sole responsibility</strong> for the accuracy, legality, and quality of their service.
                                </p>
                                <p>
                                    This platform acts as a directory only. We do <strong className="text-white">NOT</strong> validate, certify, or endorse any specific Masjid, organization, or individual listed here.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Limitations & Liability */}
                    <div className="bg-gradient-to-br from-red-950/20 to-black/40 border border-red-500/20 p-8 md:p-12 rounded-2xl mb-12 relative overflow-hidden shadow-lg">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    No Guarantees
                                </h3>
                                <ul className="space-y-3 text-sm text-neutral-400 list-disc list-inside marker:text-red-500">
                                    <li>Availability of food or resources</li>
                                    <li>Hygiene and quality standards</li>
                                    <li>Service timeliness or consistency</li>
                                    <li>Precision of listed addresses/times</li>
                                    <li>Safety of personal interactions</li>
                                </ul>
                                <p className="mt-4 text-xs text-red-400/80 italic">
                                    Engagement with any provider is at your own risk.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                    <FileWarning className="w-5 h-5 text-red-500" />
                                    Limitation of Liability
                                </h3>
                                <p className="text-sm text-neutral-400 mb-4">Sehri Finder assumes NO liability for:</p>
                                <ul className="space-y-3 text-sm text-neutral-400 list-disc list-inside marker:text-red-500">
                                    <li>Disputes arising between parties</li>
                                    <li>Any financial exchanges</li>
                                    <li>Loss, damage, or injury</li>
                                    <li>Provider misconduct or negligence</li>
                                    <li>Health or safety complications</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto border-t border-white/5 pt-8">
                        <p className="text-neutral-300 text-sm md:text-base font-medium">
                            We strongly advise all users to exercise due diligence and verify details independently before visiting any location or organization.
                        </p>
                        <p className="text-gold-lantern text-xs uppercase tracking-widest font-bold">
                            By using this platform, you acknowledge our role is strictly limited to information facilitation.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
});
