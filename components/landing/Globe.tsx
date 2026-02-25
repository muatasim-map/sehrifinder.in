import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
    className?: string;
}

export const Globe: React.FC<GlobeProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000,
            height: 1000,
            phi: 0,
            theta: 0.15, // Tilt slightly
            dark: 1, // Dark theme
            diffuse: 1.2,
            mapSamples: 16000, // Dot density
            mapBrightness: 6,
            baseColor: [0.039, 0.18, 0.137], // #0A2E23 (emerald-midnight)
            markerColor: [0.831, 0.686, 0.216], // #D4AF37 (gold-lantern)
            glowColor: [0.039, 0.18, 0.137], // Match base background for seamless glow
            markers: [
                // India (Chennai / Mumbai)
                { location: [13.0827, 80.2707], size: 0.1 },
                { location: [19.0760, 72.8777], size: 0.08 },
                // UK (London)
                { location: [51.5072, 0.1276], size: 0.08 },
                // Canada (Toronto)
                { location: [43.6532, -79.3832], size: 0.08 },
                // USA (New York)
                { location: [40.7128, -74.0060], size: 0.08 },
                // Malaysia (Kuala Lumpur)
                { location: [3.1390, 101.6869], size: 0.08 },
            ],
            onRender: (state) => {
                // Oscillating rotation to avoid dead ocean space
                const time = Date.now() / 4000;
                state.phi = 0.5 + Math.sin(time) * 0.7;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={`w-full max-w-[800px] aspect-square mx-auto relative ${className || ''}`}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    contain: 'layout paint size',
                    cursor: 'grab',
                }}
                onPointerDown={(e) => {
                    e.currentTarget.style.cursor = 'grabbing';
                }}
                onPointerUp={(e) => {
                    e.currentTarget.style.cursor = 'grab';
                }}
            />
        </div>
    );
};
