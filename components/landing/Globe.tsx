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
            diffuse: 2, // Softer more glowing light
            mapSamples: 20000, // Higher dot density for premium feel
            mapBrightness: 8, // Brighter dots
            baseColor: [0.039, 0.18, 0.137], // #0A2E23 (emerald-midnight)
            markerColor: [1.0, 0.843, 0.0], // #FFD700 (bright gold)
            glowColor: [0.039, 0.25, 0.15], // Stronger emerald atmospheric glow
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
                // Smooth continuous slow rotation
                state.phi = phi;
                phi += 0.002;
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
