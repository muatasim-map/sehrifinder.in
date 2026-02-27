import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X, Zap } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const SWUpdateToast: React.FC = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered:', r);
        },
        onRegisterError(error) {
            console.error('SW registration error:', error);
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
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-4 right-4 z-[9999] max-w-sm mx-auto"
                >
                    <div className="bg-emerald-900/90 backdrop-blur-md border border-gold-lantern/30 rounded-2xl shadow-2xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold-lantern/20 flex items-center justify-center shrink-0">
                            {needRefresh ? (
                                <RefreshCw className="w-5 h-5 text-gold-lantern animate-spin-slow" />
                            ) : (
                                <Zap className="w-5 h-5 text-gold-lantern" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm">
                                {needRefresh ? 'Update Available' : 'Ready for Offline'}
                            </p>
                            <p className="text-white/60 text-xs truncate">
                                {needRefresh
                                    ? 'New spots and features added.'
                                    : 'App cached for offline use.'}
                            </p>
                        </div>

                        {needRefresh ? (
                            <button
                                onClick={() => updateServiceWorker(true)}
                                className="px-3 py-1.5 bg-gold-lantern text-emerald-900 rounded-lg text-xs font-bold whitespace-nowrap hover:bg-gold-bright transition-colors"
                            >
                                Update Now
                            </button>
                        ) : (
                            <button
                                onClick={close}
                                className="p-1 text-white/30 hover:text-white/70 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
