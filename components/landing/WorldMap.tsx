import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
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
        <div className="w-full rounded-2xl overflow-hidden border border-gold-lantern/10 shadow-2xl"
            style={{ height: '480px' }}>
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

                {allCities.map((city) => (
                    <CircleMarker
                        key={city.name}
                        center={[city.lat, city.lng]}
                        radius={7}
                        pathOptions={{
                            color: '#022c22',
                            weight: 1.5,
                            fillColor: '#D4AF37',
                            fillOpacity: 0.9,
                        }}
                        eventHandlers={{
                            click: () => onSelectCity(city.name),
                            mouseover: (e) => {
                                e.target.setStyle({ fillColor: '#B8860B', radius: 10 });
                            },
                            mouseout: (e) => {
                                e.target.setStyle({ fillColor: '#D4AF37', radius: 7 });
                            },
                        }}
                    >
                        <Tooltip
                            direction="top"
                            offset={[0, -8]}
                            permanent={false}
                            className="leaflet-city-tooltip"
                        >
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-xs text-emerald-midnight">{city.name}</span>
                                <span className="text-[10px] text-emerald-midnight/60">{city.country}</span>
                            </div>
                        </Tooltip>
                    </CircleMarker>
                ))}
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
