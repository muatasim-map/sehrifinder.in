import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { COUNTRIES } from '../../data/locations';
import { toSlug } from '../../utils/slug';

interface WorldMapProps {
    onSelectCity: (city: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ onSelectCity }) => {
    // Fix Leaflet's default icon path issue when bundled by Vite
    useEffect(() => {
        // No icon fix needed since we use CircleMarker
    }, []);

    const allCities = COUNTRIES.flatMap(country =>
        country.cities.map(city => ({ ...city, country: country.name }))
    );

    return (
        <div className="w-full rounded-3xl overflow-hidden border-2 border-gold-lantern/30 shadow-[0_0_40px_rgba(212,175,55,0.1)] relative"
            style={{ height: '500px' }}>
            {/* Inner Glass Glow */}
            <div className="absolute inset-0 z-[400] pointer-events-none shadow-[inset_0_0_50px_rgba(10,46,35,0.8)] rounded-3xl" />

            <MapContainer
                center={[20, 10]}
                zoom={2}
                minZoom={2}
                maxZoom={5}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', background: '#022c22' }}
                attributionControl={false}
                zoomControl={true}
                worldCopyJump={false}
                maxBounds={[[-90, -180], [90, 180]]}
            >
                {/* Dark styled tile layer from CartoDB Dark Matter */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    subdomains="abcd"
                    maxZoom={5}
                />

                {allCities.map((city) => {
                    const isMajorCity = ['Chennai', 'Bengaluru', 'Mumbai', 'London', 'New York', 'Toronto', 'Kuala Lumpur'].includes(city.name);

                    const iconHtml = `
                        <div class="${isMajorCity ? 'major-city-marker' : ''}">
                            <div class="marker-pulse"></div>
                            <div class="marker-pin"></div>
                        </div>
                    `;

                    const customIcon = L.divIcon({
                        className: 'custom-div-icon',
                        html: iconHtml,
                        iconSize: [30, 30],
                        iconAnchor: [15, 15] // Center the icon
                    });

                    return (
                        <Marker
                            key={city.name}
                            position={[city.lat, city.lng]}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => onSelectCity(city.name),
                            }}
                        >
                            <Tooltip
                                direction="top"
                                offset={[0, -8]}
                                permanent={isMajorCity}
                                className={`leaflet-city-tooltip ${isMajorCity ? 'major-city-label' : ''}`}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-xs text-emerald-midnight">{city.name}</span>
                                    {isMajorCity && <span className="text-[10px] text-emerald-midnight/60">{city.country}</span>}
                                </div>
                            </Tooltip>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Caption */}
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 justify-center">
                {COUNTRIES.map(c => (
                    <div key={c.code} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-gold-antique shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                        <span className="text-[10px] font-bold text-emerald-midnight/40 uppercase tracking-[0.15em]">
                            {c.name} · {c.cities.length}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
