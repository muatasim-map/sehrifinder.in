import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    prompt(): Promise<void>;
}

interface UsePWAInstallReturn {
    canInstall: boolean;
    isInstalled: boolean;
    install: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
}

/**
 * Cross-browser PWA install hook.
 * - Captures `beforeinstallprompt` early (even if fired before React mounts)
 * - Detects if already installed via `display-mode: standalone`
 * - Handles the iOS Safari case (no prompt API, must use banner)
 */

// Store event reference outside React (survives re-renders)
let _deferredPrompt: BeforeInstallPromptEvent | null = null;

// Listen as early as possible — before React even mounts
if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        _deferredPrompt = e as BeforeInstallPromptEvent;
        // Dispatch custom event so any mounted hook can react
        window.dispatchEvent(new Event('pwa-installable'));
    });
}

export function usePWAInstall(): UsePWAInstallReturn {
    const [canInstall, setCanInstall] = useState(() => {
        // Check if prompt was already captured before this hook mounted
        if (_deferredPrompt) return true;
        return false;
    });

    const [isInstalled, setIsInstalled] = useState(() => {
        if (typeof window === 'undefined') return false;
        return (
            window.matchMedia('(display-mode: standalone)').matches ||
            // iOS Safari: navigator.standalone
            (navigator as Navigator & { standalone?: boolean }).standalone === true
        );
    });

    useEffect(() => {
        // Listen for the custom event in case prompt fires before this hook was ready
        const onInstallable = () => setCanInstall(true);
        window.addEventListener('pwa-installable', onInstallable);

        // Also listen for native event (in case it fires after mount)
        const onBeforeInstall = (e: Event) => {
            e.preventDefault();
            _deferredPrompt = e as BeforeInstallPromptEvent;
            setCanInstall(true);
        };
        window.addEventListener('beforeinstallprompt', onBeforeInstall);

        // Detect successful installation
        const onAppInstalled = () => {
            _deferredPrompt = null;
            setCanInstall(false);
            setIsInstalled(true);
        };
        window.addEventListener('appinstalled', onAppInstalled);

        return () => {
            window.removeEventListener('pwa-installable', onInstallable);
            window.removeEventListener('beforeinstallprompt', onBeforeInstall);
            window.removeEventListener('appinstalled', onAppInstalled);
        };
    }, []);

    const install = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
        if (!_deferredPrompt) return 'unavailable';

        await _deferredPrompt.prompt();
        const { outcome } = await _deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            _deferredPrompt = null;
            setCanInstall(false);
            setIsInstalled(true);
        }

        return outcome;
    }, []);

    return { canInstall, isInstalled, install };
}
