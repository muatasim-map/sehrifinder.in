
import React, { useState, useEffect } from 'react';
import { X, MapPin, Save, AlertCircle, Trash2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { TimingInput } from './TimingInput';

interface EditSpotModalProps {
    spot: any; // The existing spot data
    onClose: () => void;
    onSuccess: (updatedSpot: any) => void;
    onDelete: (locationId: number) => void;
}

export const EditSpotModal: React.FC<EditSpotModalProps> = ({ spot, onClose, onSuccess, onDelete }) => {
    const [formData, setFormData] = useState({
        venue_name: '',
        city: '',
        primary_area: '',
        venue_type: 'Masjid',
        food_type: 'Free',
        timing: '{"start": "03:00", "end": "04:30"}',
        latitude: '',
        longitude: '',
        notes: '',
        phones: '', // Comma separated
        features: [] as string[],
        zone: '',
        address: '',
        target_audience: [] as string[],
        google_maps_link: '',
        verified: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (spot) {
            setFormData({
                venue_name: spot.venue_name || '',
                city: spot.city || '',
                primary_area: spot.primary_area || '',
                venue_type: spot.venue_type || 'Masjid',
                food_type: spot.food_type || 'Free',
                // Handle timing which might be object or string in DB/App
                timing: typeof spot.timing === 'object' ? JSON.stringify(spot.timing) : (spot.timing || '{"start": "03:00", "end": "04:30"}'),
                latitude: spot.latitude ? spot.latitude.toString() : '',
                longitude: spot.longitude ? spot.longitude.toString() : '',
                notes: spot.notes || '',
                phones: Array.isArray(spot.phones) ? spot.phones.join(', ') : (spot.phones || ''),
                features: Array.isArray(spot.features) ? spot.features : [],
                zone: spot.zone || '',
                address: spot.address || '',
                target_audience: Array.isArray(spot.target_audience) ? spot.target_audience : [],
                google_maps_link: spot.google_maps_link || '',
                verified: spot.verified !== false // Default to true unless explicitly false
            });
        }
    }, [spot]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTimingChange = (newTiming: { start: string, end: string }) => {
        setFormData(prev => ({ ...prev, timing: JSON.stringify(newTiming) }));
        setError(null);
    };

    const toggleFeature = (feature: string) => {
        setFormData(prev => {
            const exists = prev.features.includes(feature);
            return {
                ...prev,
                features: exists
                    ? prev.features.filter(f => f !== feature)
                    : [...prev.features, feature]
            };
        });
    };

    const toggleAudience = (audience: string) => {
        setFormData(prev => {
            const exists = prev.target_audience.includes(audience);
            return {
                ...prev,
                target_audience: exists
                    ? prev.target_audience.filter(a => a !== audience)
                    : [...prev.target_audience, audience]
            };
        });
    };

    const safeJsonParse = (str: string) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            return { raw_timing: str };
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!formData.venue_name.trim() || !formData.city.trim()) {
                throw new Error("Venue Name and City are required");
            }

            const timingJson = safeJsonParse(formData.timing);

            const payload = {
                venue_name: formData.venue_name,
                city: formData.city,
                primary_area: formData.primary_area,
                venue_type: formData.venue_type,
                food_type: formData.food_type,
                timing: timingJson,
                latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                notes: formData.notes,
                phones: formData.phones.split(',').map(s => s.trim()).filter(Boolean),
                features: formData.features,
                zone: formData.zone,
                address: formData.address,
                target_audience: formData.target_audience,
                google_maps_link: formData.google_maps_link,
                verified: formData.verified,
                last_verified_year: new Date().getFullYear().toString()
            };

            const { error: updateError, data } = await supabase
                .from('spots')
                .update(payload)
                .eq('location_id', spot.location_id) // Ensure we use the correct PK
                .select()
                .single();

            if (updateError) throw updateError;

            onSuccess(data); // Pass back the updated spot to refresh UI locally
            onClose();

        } catch (err: any) {
            console.error("Error updating spot:", err);
            setError(err.message || "Failed to update spot");
        } finally {
            setLoading(false);
        }
    };

    // Delete functionality
    const handleDelete = async () => {
        if (!confirm(`Are you absolutely sure you want to PERMANENTLY delete "${formData.venue_name}"? This action cannot be undone.`)) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: deleteError } = await supabase
                .from('spots')
                .delete()
                .eq('location_id', spot.location_id);

            if (deleteError) throw deleteError;

            onDelete(spot.location_id); // Notify parent to remove from UI
            onClose();

        } catch (err: any) {
            console.error("Error deleting spot:", err);
            setError(err.message || "Failed to delete spot");
        } finally {
            setLoading(false);
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
                        <h2 className="text-xl font-bold text-emerald-midnight flex items-center gap-2 font-serif">
                            Edit Spot #{spot.location_id}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 pl-1">Update live details for {formData.venue_name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-gray-400 hover:text-emerald-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
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
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-serif text-lg text-emerald-900 bg-gray-50 focus:bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-emerald-500 outline-none"
                                >
                                    <option value="">Select City</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Bengaluru">Bengaluru</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Mumbai">Mumbai</option>
                                </select>
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
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Address / Landmark</label>
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Full address or landmark"
                                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-emerald-500 outline-none mb-4"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Google Maps Link</label>
                            <input
                                name="google_maps_link"
                                value={formData.google_maps_link}
                                onChange={handleChange}
                                placeholder="https://maps.google.com/..."
                                className="w-full p-2.5 border border-emerald-200 bg-emerald-50 rounded-lg text-sm focus:border-emerald-500 focus:bg-white outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Zone</label>
                                <select
                                    name="zone"
                                    value={formData.zone}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:bg-white outline-none"
                                >
                                    <option value="">Select Zone</option>
                                    <option value="North">North</option>
                                    <option value="South">South</option>
                                    <option value="East">East</option>
                                    <option value="West">West</option>
                                    <option value="Central">Central</option>
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

                        {/* Features Checkboxes */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Features</label>
                            <div className="flex flex-wrap gap-2">
                                {['Masjid', 'PreBookingRequired', 'DeliveryAvailable', 'LadiesFriendly', 'DineIn', 'AC', 'Parking', 'TravelerSupport'].map(f => (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => toggleFeature(f)}
                                        className={`px-2 py-1 text-xs rounded-md border transition-all ${formData.features.includes(f)
                                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                                            : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Target Audience Checkboxes */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Target Audience</label>
                            <div className="flex flex-wrap gap-2">
                                {['Families', 'Bachelors', 'Students', 'Travelers', 'Needy', 'General Public'].map(a => (
                                    <button
                                        key={a}
                                        type="button"
                                        onClick={() => toggleAudience(a)}
                                        className={`px-2 py-1 text-xs rounded-md border transition-all ${formData.target_audience.includes(a)
                                            ? 'bg-blue-100 border-blue-300 text-blue-800 font-bold'
                                            : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'
                                            }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technical Info */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                            <span className="text-xs font-bold text-gold-antic uppercase tracking-widest text-[#B8860B]">Configuration</span>
                        </div>

                        <div>
                            <TimingInput
                                value={formData.timing}
                                onChange={handleTimingChange}
                                label="Current Timing"
                            />
                        </div>

                        <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50">
                            <div className="flex items-center gap-2 mb-3 text-emerald-800">
                                <MapPin size={14} className="text-emerald-600" />
                                <span className="font-bold text-xs uppercase tracking-wide">Coordinates</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    name="latitude"
                                    placeholder="Lat"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-emerald-200 rounded-md text-sm font-mono text-emerald-900 placeholder-emerald-800/20 focus:ring-1 focus:ring-emerald-500 outline-none"
                                />
                                <input
                                    name="longitude"
                                    placeholder="Lng"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-emerald-200 rounded-md text-sm font-mono text-emerald-900 placeholder-emerald-800/20 focus:ring-1 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Verification Toggle */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm text-emerald-900">Verification Status</div>
                                <div className="text-xs text-gray-500">Unverified spots will be hidden from the map</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="verified"
                                    checked={formData.verified}
                                    onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Full Width Notes */}
                    <div className="md:col-span-2 mt-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Admin Notes / Description</label>
                        <textarea
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-emerald-500 transition-all outline-none resize-none"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mx-6 mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm border border-red-100">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <div className="p-6 border-t border-gray-100 flex justify-between gap-3 bg-gray-50/80 sticky bottom-0 z-10 backdrop-blur-md">
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-3 rounded-xl border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-300 transition-colors flex items-center gap-2"
                    >
                        <Trash2 size={16} /> Delete Spot
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-6 py-3 rounded-xl text-gray-500 font-bold text-sm hover:bg-gray-200 hover:text-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? 'Saving...' : (
                                <>
                                    <Save size={18} /> Update Spot
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
