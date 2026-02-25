import { useState, useEffect } from 'react';

interface CountdownResult {
    hours: number;
    minutes: number;
    seconds: number;
    /** true = Sehri is currently active (before Fajr) */
    isActive: boolean;
    /** true = Sehri time has passed for today */
    isPast: boolean;
    endTimeStr: string | null;
}

/**
 * Parses a timing string like "03:00 - 04:30" and returns a live countdown
 * to the end time (Fajr). Updates every second.
 */
export function useSehriCountdown(timingStr: string): CountdownResult {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    // Parse "HH:MM - HH:MM"
    const match = timingStr?.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
    if (!match) {
        return { hours: 0, minutes: 0, seconds: 0, isActive: false, isPast: false, endTimeStr: null };
    }

    const [, startStr, endStr] = match;

    const toMinutes = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const startMin = toMinutes(startStr);
    const endMin = toMinutes(endStr);

    // Sehri is "active" when current time is between start and end
    // Handle overnight: start (e.g. 02:30) < end (e.g. 04:30)
    const isActive = currentMinutes >= startMin && currentMinutes < endMin;
    const isPast = currentMinutes >= endMin;

    const endSeconds = endMin * 60;
    let remaining = endSeconds - currentSeconds;
    if (remaining < 0) remaining = 0;

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    return { hours, minutes, seconds, isActive, isPast, endTimeStr: endStr };
}

/**
 * Returns true if the spot is currently within its sehri window.
 */
export function isSpotOpenNow(timingStr: string): boolean {
    const match = timingStr?.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
    if (!match) return false;

    const [, startStr, endStr] = match;
    const toMinutes = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes >= toMinutes(startStr) && currentMinutes < toMinutes(endStr);
}
