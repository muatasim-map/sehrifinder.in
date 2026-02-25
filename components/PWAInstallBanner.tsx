import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

/**
 * A bottom-sheet install prompt for mobile.
 * Only shows when `beforeinstallprompt` is available (Android Chrome).
 * For iOS Safari, shows a separate "Add to Home Screen" instruction.
 */

const isIOS = () =>
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !(navigator as Navigator & { standalone?: boolean }).standalone;

const DISMISS_KEY = 'pwa-banner-dismissed-until';

const isBannerDismissed = () => {
    try {
        const until = localStorage.getItem(DISMISS_KEY);
        if (!until) return false;
        return Date.now() < Number(until);
    } catch {
        return false;
    }
};

export const PWAInstallBanner: React.FC = () => {
    const { canInstall, isInstalled, install } = usePWAInstall();
    const [dismissed, setDismissed] = useState(() => isBannerDismissed());
    const [showIOSGuide, setShowIOSGuide] = useState(() => isIOS() && !isInstalled);

    const dismiss = () => {
        setDismissed(true);
        setShowIOSGuide(false);
        // Suppress for 30 days
        try {
            localStorage.setItem(DISMISS_KEY, String(Date.now() + 30 * 24 * 60 * 60 * 1000));
        } catch { /* noop */ }
    };

    const handleInstall = async () => {
        const result = await install();
        if (result !== 'unavailable') setDismissed(true);
    };

    const show = !dismissed && !isInstalled && (canInstall || showIOSGuide);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 z-[9998] max-w-sm mx-auto"
                >
                    <div className="bg-emerald-midnight border border-gold-lantern/20 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                        {/* Gold accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-lantern to-transparent" />

                        <div className="p-4 flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-11 h-11 rounded-xl bg-gold-lantern/10 border border-gold-lantern/20 flex items-center justify-center shrink-0">
                                <Smartphone className="w-5 h-5 text-gold-lantern" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-neutral-pearl font-bold text-sm">Install Sehri Finder</p>
                                {canInstall ? (
                                    <>
                                        <p className="text-neutral-ivory/50 text-xs mt-0.5 leading-relaxed">
                                            Add to your home screen for instant Ramadan access.
                                        </p>
                                        <button
                                            onClick={handleInstall}
                                            className="mt-3 flex items-center gap-2 px-4 py-2 bg-gold-lantern text-emerald-midnight rounded-lg text-xs font-bold hover:bg-gold-bright transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Install App
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-neutral-ivory/50 text-xs mt-0.5 leading-relaxed">
                                            Tap the <strong className="text-neutral-ivory/70">Share</strong> button{' '}
                                            <span className="text-gold-lantern">⎋</span> then{' '}
                                            <strong className="text-neutral-ivory/70">"Add to Home Screen"</strong>
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Dismiss */}
                            <button
                                onClick={dismiss}
                                className="p-1 text-neutral-ivory/30 hover:text-neutral-ivory/70 transition-colors shrink-0 mt-0.5"
                                aria-label="Dismiss"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
