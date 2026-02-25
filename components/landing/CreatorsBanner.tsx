import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../config/animations';
import { ExternalLink, Sparkles } from 'lucide-react';

export const CreatorsBanner: React.FC = () => (
    <section className="py-20 bg-gradient-to-b from-cream to-cream-dark relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_#0A2E23_1px,_transparent_1px)] bg-[length:24px_24px]"></div>

        <div className="container mx-auto px-6 relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-12"
            >
                <span className="inline-flex items-center gap-2 text-gold-antique/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <span className="h-px w-8 bg-gold-antique/30"></span>
                    From the Creators
                    <span className="h-px w-8 bg-gold-antique/30"></span>
                </span>
                <h2 className="font-landing-heading text-3xl md:text-5xl text-emerald-midnight mt-3">
                    More Projects for the <span className="italic text-gold-antique">Ummah</span>
                </h2>
                <p className="font-landing-body text-neutral-500 max-w-xl mx-auto mt-4 text-lg leading-relaxed">
                    We're building tools that serve the Muslim community worldwide. Check out our other projects.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* QurAnLingo Card */}
                <motion.a
                    href="https://dev.quranlingo.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1"
                >
                    {/* Top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-gold-antique via-emerald-sacred to-gold-antique"></div>

                    <div className="p-8">
                        {/* Logo */}
                        <div className="flex items-center justify-between mb-6">
                            <img
                                src="/quranlingo-logo.png"
                                alt="QurAnLingo"
                                className="h-12 md:h-14 object-contain"
                                loading="lazy"
                            />
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live
                            </span>
                        </div>

                        {/* Description */}
                        <h3 className="font-landing-heading text-xl text-emerald-midnight mb-2">
                            Learn 85% of Quranic Arabic
                        </h3>
                        <p className="font-landing-body text-neutral-500 text-sm leading-relaxed mb-6">
                            Understand the Quran in its original language. QurAnLingo teaches you the most frequently used Arabic words and grammar through interactive lessons.
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-emerald-sacred font-landing-accent font-bold text-sm group-hover:text-gold-antique transition-colors">
                            <span>Start Learning</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.a>

                {/* DeenFlix Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                    {/* Top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-emerald-midnight via-[#1a1a2e] to-emerald-midnight"></div>

                    <div className="p-8 relative">
                        {/* Coming Soon overlay shimmer */}
                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest border border-amber-100">
                                <Sparkles className="w-3 h-3" />
                                Coming Soon
                            </span>
                        </div>

                        {/* Logo / Title */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-midnight to-[#1a1a2e] flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg font-brand">D</span>
                                </div>
                                <span className="font-brand text-2xl font-bold tracking-wide text-emerald-midnight">
                                    Deen<span className="text-gold-antique">Flix</span>
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <h3 className="font-landing-heading text-xl text-emerald-midnight mb-2">
                            Islamic Content. Reimagined.
                        </h3>
                        <p className="font-landing-body text-neutral-500 text-sm leading-relaxed mb-6">
                            Premium Islamic content platform bringing you lectures, documentaries, and educational series — curated for the modern Muslim seeking authentic knowledge.
                        </p>

                        {/* CTA - disabled for coming soon */}
                        <div className="flex items-center gap-2 text-neutral-400 font-landing-accent font-bold text-sm">
                            <span>Launching Soon, In Sha Allah</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);
