
import React, { useState, useEffect } from 'react';
import { X, Check, MapPin, Save, AlertCircle, Globe } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { TimingInput } from './TimingInput';
import { COUNTRIES } from '../../data/locations';

interface ApprovalModalProps {
    spot: any; // Using 'any' for the raw pending spot data for flexibility
    onClose: () => void;
    onSuccess: (id: number) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({ spot, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        venue_name: '',
        country: 'India',
        city: 'Chennai',
        primary_area: '',
        venue_type: 'Masjid',
        food_type: 'Free',
        timing: '{"start": "03:00", "end": "04:30"}', // Default JSON format
        latitude: '',
        longitude: '',
        notes: '',
        phones: '', // Comma separated
        features: '', // Comma separated
        google_maps_link: ''
    });

    const [loading, setLoading] = useState(false);
    const [jsonError, setJsonError] = useState<string | null>(null);

    useEffect(() => {
        if (spot) {
            setFormData({
                venue_name: spot.venue_name || '',
                country: spot.country || 'India',
                city: spot.city || 'Chennai',
                primary_area: spot.primary_area || '',
                venue_type: spot.venue_type || 'Masjid',
                food_type: spot.food_type || 'Free',
                // Try to preserve description as notes
                notes: spot.description || '',
                // If timing was text, put it here, admin might need to fix it to JSON
                timing: spot.timing || '{"start": "03:00", "end": "04:30"}',
                latitude: '',
                longitude: '',
                phones: spot.submitter_phone ? spot.submitter_phone : '',
                features: spot.food_type === 'Free' ? 'Free, DineIn' : 'Paid, DineIn',
                google_maps_link: spot.google_maps_link || ''
            });
        }
    }, [spot]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'country') {
                const country = COUNTRIES.find(c => c.name === value);
                if (country) newData.city = country.cities[0].name;
            }
            return newData;
        });
    };

    const handleTimingChange = (newTiming: { start: string, end: string }) => {
        setFormData(prev => ({ ...prev, timing: JSON.stringify(newTiming) }));
        setJsonError(null);
    };

    const handleApprove = async () => {
        setLoading(true);
        setJsonError(null);
        try {
            if (!formData.venue_name.trim() || !formData.city.trim()) {
                throw new Error("Venue Name and City are required");
            }

            const timingJson = safeJsonParse(formData.timing);

            // 1. Construct the Payload for 'spots' table
            const payload = {
                venue_name: formData.venue_name,
                country: formData.country,
                city: formData.city,
                primary_area: formData.primary_area,
                venue_type: formData.venue_type,
                food_type: formData.food_type,
                timing: timingJson,
                latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                notes: formData.notes,
                phones: formData.phones.split(',').map(s => s.trim()).filter(Boolean),
                features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
                contact_persons: spot.submitter_name ? [spot.submitter_name] : [],
                google_maps_link: formData.google_maps_link,
                verified: true,
                last_verified_year: new Date().getFullYear().toString()
            };

            // 2. Insert into live 'spots' table
            const { error: insertError } = await supabase
                .from('spots')
                .insert([payload]);

            if (insertError) throw insertError;

            // 3. Mark pending spot as approved
            const { error: updateError } = await supabase
                .from('pending_spots')
                .update({ status: 'approved' })
                .eq('id', spot.id);

            if (updateError) throw updateError;

            onSuccess(spot.id);

        } catch (error: any) {
            console.error("Error approving spot:", error);
            setJsonError(error.message || "Error saving spot. CHECK CONSOLE.");
        } finally {
            setLoading(false);
        }
    };

    const safeJsonParse = (str: string) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            return { raw_timing: str }; // Fallback
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-emerald-midnight/80 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-emerald-sacred/20 relative overflow-hidden">
                {/* Decorative Pattern Top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-sacred via-gold-lantern to-emerald-sacred"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-cream sticky top-0 z-10 border-b border-emerald-100">
                    <div>
                        <h2 className="text-xl font-bold text-emerald-midnight flex items-center gap-2 font-reem">
                            <Check className="text-emerald-600 bg-emerald-100 rounded-full p-1" size={24} />
                            Approve Submission #{spot.id}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 pl-8">Review and correct details before publishing.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-gray-400 hover:text-emerald-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-8 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                <span className="text-xs font-bold text-gold-antic uppercase tracking-widest text-[#B8860B]">Venue Details</span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Venue Name</label>
                                <input
                                    name="venue_name"
                                    value={formData.venue_name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-reem text-lg text-emerald-900 bg-gray-50 focus:bg-white"
                                    placeholder="e.g. Jamia Masjid"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Country</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-emerald-500 outline-none"
                                    >
                                        {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City</label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-emerald-500 outline-none"
                                    >
                                        {COUNTRIES.find(c => c.name === formData.country)?.cities.map(city => (
                                            <option key={city.name} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Area</label>
                                <input
                                    name="primary_area"
                                    value={formData.primary_area}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-emerald-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Type</label>
                                    <select
                                        name="venue_type"
                                        value={formData.venue_type}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:bg-white outline-none"
                                    >
                                        <option value="Masjid">Masjid</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Home">Home</option>
                                        <option value="Association">Association</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Food</label>
                                    <select
                                        name="food_type"
                                        value={formData.food_type}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:bg-white outline-none"
                                    >
                                        <option value="Free">Free</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Technical Info */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                                <span className="text-xs font-bold text-gold-antic uppercase tracking-widest text-[#B8860B]">Configuration</span>
                            </div>

                            {/* Timing Component Replacement */}
                            <div>
                                <TimingInput
                                    value={formData.timing}
                                    onChange={handleTimingChange}
                                />
                            </div>

                            {/* Geocoding */}
                            <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-emerald-800">
                                        <MapPin size={14} className="text-emerald-600" />
                                        <span className="font-bold text-xs uppercase tracking-wide">Coordinates</span>
                                    </div>
                                    {spot.google_maps_link && (
                                        <a href={spot.google_maps_link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline font-medium bg-blue-50 px-2 py-1 rounded">
                                            Open User Link ↗
                                        </a>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="block text-[10px] font-bold text-emerald-800 mb-1 uppercase tracking-wide">Google Maps Link</label>
                                    <input
                                        name="google_maps_link"
                                        value={formData.google_maps_link}
                                        onChange={handleChange}
                                        placeholder="https://maps.google.com/..."
                                        className="w-full p-2 border border-emerald-200 rounded-md text-sm font-mono text-emerald-900 placeholder-emerald-800/20 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        name="latitude"
                                        placeholder="Lat (e.g. 13.0827)"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-emerald-200 rounded-md text-sm font-mono text-emerald-900 placeholder-emerald-800/20 focus:ring-1 focus:ring-emerald-500 outline-none"
                                    />
                                    <input
                                        name="longitude"
                                        placeholder="Lng (e.g. 80.2707)"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-emerald-200 rounded-md text-sm font-mono text-emerald-900 placeholder-emerald-800/20 focus:ring-1 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Notes */}
                    <div className="mt-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Admin Notes / Description</label>
                        <textarea
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-emerald-500 transition-all outline-none resize-none"
                            placeholder="Add internal notes or public description..."
                        />
                    </div>
                </div>

                {/* Error Message */}
                {jsonError && (
                    <div className="mx-6 mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm border border-red-100">
                        <AlertCircle size={16} />
                        {jsonError}
                    </div>
                )}

                {/* Footer Buttons */}
                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/80 sticky bottom-0 z-10 backdrop-blur-md">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-3 rounded-xl text-gray-500 font-bold text-sm hover:bg-gray-200 hover:text-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <Save size={18} /> Approve & Publish
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};
