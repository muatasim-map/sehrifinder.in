
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { SehriSpot } from '../types';
import * as L from 'leaflet';
import { MapPin, Navigation, Clock, Home, Building2, Utensils } from 'lucide-react';

// Fix for default marker icon in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
    spots: SehriSpot[];
    center?: [number, number];
    zoom?: number;
}

// Component to handle map movement and resizing
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        // Force map to recalculate its size
        map.invalidateSize();

        // 🧭 Clean production solution (ResizeObserver)
        // This auto fixes layout changes (Tabs, Framer Motion, toggles)
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });

        resizeObserver.observe(map.getContainer());

        return () => resizeObserver.disconnect();
    }, [map]);

    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);

    return null;
};

// Re-center Floating Action Button
const RecenterControl: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();

    const handleRecenter = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent map click
        map.flyTo(center, zoom, { duration: 1.5 });
    };

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar border-none shadow-none mb-8 mr-4">
                <button
                    onClick={handleRecenter}
                    className="flex items-center justify-center w-12 h-12 bg-gold-lantern text-emerald-midnight rounded-full shadow-lg hover:bg-white hover:text-gold-lantern transition-all duration-300 border-2 border-emerald-midnight/20"
                    title="Re-center Map"
                >
                    <Navigation size={20} className="fill-current" />
                </button>
            </div>
        </div>
    );
};

// Custom Cluster Icon
const createClusterCustomIcon = function (cluster: any) {
    return L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900 border-2 border-gold-lantern text-gold-lantern font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            ${cluster.getChildCount()}
        </div>`,
        className: 'custom-marker-cluster',
        iconSize: L.point(40, 40, true),
    });
};

export const MapView: React.FC<MapViewProps> = ({
    spots,
    center = [13.0827, 80.2707], // Default to Chennai
    zoom = 12
}) => {
    // Filter spots with valid coordinates
    const validSpots = spots.filter(s => s.latitude && s.longitude);

    // Custom Location Pin Icons matching the Logo
    const pinSvg = (pinColor: string, iconColor: string) => `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="none">
            <!-- Pin Shape -->
            <path d="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C117 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192Z" fill="${pinColor}"/>
            <!-- Inner Circle for Contrast -->
            <circle cx="192" cy="192" r="110" fill="${pinColor}" filter="brightness(0.9)"/>
            <!-- Crescent Moon (Logo Symbol) - Centered in Pin Head -->
            <g transform="translate(102, 102) scale(1.8)">
                <path d="M45,10 C58.8,10 70,21.2 70,35 C70,48.8 58.8,60 45,60 C35.2,60 26.7,54.4 22.4,46.2 C26.1,48.6 30.5,50 35,50 C48.8,50 60,38.8 60,25 C60,20.5 58.6,16.1 56.2,12.4 C64.4,16.7 70,25.2 70,35" fill="${iconColor}"/>
            </g>
        </svg>
    `;

    const freeIcon = React.useMemo(() => new L.DivIcon({
        className: 'custom-pin-icon',
        html: `<div class="w-12 h-12 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform origin-bottom hover:z-50">${pinSvg('#064e3b', '#d4af37')}</div>`, // Emerald Pin with Gold Crescent
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48]
    }), []);

    const paidIcon = React.useMemo(() => new L.DivIcon({
        className: 'custom-pin-icon',
        html: `<div class="w-12 h-12 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform origin-bottom hover:z-50">${pinSvg('#d4af37', '#ffffff')}</div>`, // Gold Pin with White Crescent
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48]
    }), []);

    return (
        <div className="h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gold-lantern/30 relative z-0 bg-zillij">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={typeof window !== 'undefined' && window.innerWidth > 768}
                style={{ height: '100%', width: '100%' }}
                maxZoom={18}
            >
                <MapUpdater center={center} zoom={zoom} />
                <RecenterControl center={center} zoom={zoom} />

                {/* Dark Matter Tiles - Premium Look */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {validSpots.map(spot => (
                    <Marker
                        key={spot.id}
                        position={[spot.latitude!, spot.longitude!]}
                        icon={spot.foodType === 'Free' ? freeIcon : paidIcon}
                    >
                        <Popup className="custom-popup-premium" maxWidth={320} closeButton={false}>
                            <div className="p-0 overflow-hidden rounded-lg font-sans">
                                {/* Header Gradient */}
                                <div className={`h-2 w-full ${spot.foodType === 'Free' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-gold-lantern to-yellow-300'}`}></div>

                                <div className="bg-white p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif font-bold text-xl text-emerald-midnight leading-tight pr-4">{spot.name}</h3>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${spot.foodType === 'Free' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-gold-dark text-gold-dark bg-yellow-50'}`}>
                                            {spot.foodType}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-3 font-medium uppercase tracking-wide">
                                        {spot.venueType === 'Masjid' ? <Home size={12} /> :
                                            spot.venueType === 'Restaurant' ? <Utensils size={12} /> :
                                                <Building2 size={12} />}
                                        {spot.area} • {spot.venueType}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium bg-gray-50 p-2 rounded mb-3">
                                        <Clock size={14} className="text-gold-dark" />
                                        {spot.timing}
                                    </div>

                                    <a
                                        href={spot.googleMapsLink && spot.googleMapsLink.startsWith('http') ? spot.googleMapsLink : (spot.latitude && spot.longitude ? `https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.address)}`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-midnight text-gold-lantern text-xs font-bold uppercase tracking-widest hover:bg-emerald-900 transition-colors rounded"
                                    >
                                        <Navigation size={12} />
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {validSpots.length === 0 && (
                <div className="absolute inset-0 bg-emerald-midnight/90 backdrop-blur-sm flex flex-col items-center justify-center z-[1000] text-gold-lantern">
                    <MapPin size={48} className="mb-4 opacity-50" />
                    <p className="font-serif italic text-xl">No coordinates available yet.</p>
                </div>
            )}
        </div>
    );
};
