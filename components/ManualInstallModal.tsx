import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, PlusSquare, Smartphone, Chrome, MoreVertical, Download } from 'lucide-react';

interface ManualInstallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const isIOS = () =>
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent);

export const ManualInstallModal: React.FC<ManualInstallModalProps> = ({ isOpen, onClose }) => {
    const ios = isIOS();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-emerald-midnight border border-gold-lantern/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-[10000] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gold-lantern/10 border border-gold-lantern/20 flex items-center justify-center">
                                    <Smartphone className="w-5 h-5 text-gold-lantern" />
                                </div>
                                <h2 className="text-xl font-serif font-bold text-neutral-pearl">Install App</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-ivory/30 hover:text-neutral-ivory/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-4 flex-1 overflow-y-auto space-y-6">
                            <p className="text-neutral-ivory/60 text-sm leading-relaxed">
                                Install <span className="text-gold-lantern font-bold">Sehri Finder</span> on your home screen for rapid access, offline support, and a premium full-screen experience.
                            </p>

                            {ios ? (
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-gold-lantern/60 tracking-widest uppercase">For iOS Safari</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                                                <Share className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <p className="text-sm text-neutral-ivory/80">Tap the <span className="font-bold text-neutral-pearl">Share</span> button</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                <PlusSquare className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <p className="text-sm text-neutral-ivory/80">Scroll down and tap <span className="font-bold text-neutral-pearl">"Add to Home Screen"</span></p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-gold-lantern/60 tracking-widest uppercase">For Android / Chrome</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                                                <MoreVertical className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <p className="text-sm text-neutral-ivory/80">Tap the <span className="font-bold text-neutral-pearl">Menu</span> (three dots) in Chrome</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                <Download className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <p className="text-sm text-neutral-ivory/80">Tap <span className="font-bold text-neutral-pearl">"Install App"</span> or <span className="font-bold text-neutral-pearl">"Add to Home Screen"</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-black/20 mt-auto">
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-gold-lantern hover:bg-gold-bright text-emerald-midnight font-bold rounded-2xl transition-all active:scale-[0.98]"
                            >
                                Got it
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
