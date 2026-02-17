import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReloadPrompt = () => {
    // interval: check for updates every 1 hour (3600000ms)
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            console.log(`Service Worker at: ${swUrl}`);
            if (r) {
                setInterval(() => {
                    r.update();
                    console.log('Checking for SW update...');
                }, 60 * 60 * 1000);
            }
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <AnimatePresence>
            {(offlineReady || needRefresh) && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 max-w-md mx-auto md:mx-0 p-4 bg-emerald-midnight text-white rounded-lg shadow-2xl border border-gold-lantern/30 flex items-start gap-4"
                >
                    <div className="flex-1">
                        <h4 className="font-bold text-gold-lantern mb-1">
                            {offlineReady ? 'App ready to work offline' : 'New content available'}
                        </h4>
                        <p className="text-sm text-gray-300">
                            {offlineReady
                                ? 'You can now use Sehri Finder without an internet connection.'
                                : 'A new version of Sehri Finder is available. Update now to get the latest data.'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {needRefresh && (
                            <button
                                onClick={() => updateServiceWorker(true)}
                                className="px-3 py-1.5 bg-gold-lantern text-emerald-midnight text-xs font-bold uppercase tracking-wider rounded hover:bg-gold-highlight transition-colors flex items-center gap-1"
                            >
                                <RefreshCw className="w-3 h-3" /> Update
                            </button>
                        )}
                        <button
                            onClick={close}
                            className="p-1.5 text-gray-400 hover:text-white transition-colors self-end"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
