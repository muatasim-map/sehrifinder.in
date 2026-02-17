
import React, { useState, useEffect } from 'react';
import { X, Check, MapPin, Clock, Save } from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface ApprovalModalProps {
    spot: any; // Using 'any' for the raw pending spot data for flexibility
    onClose: () => void;
    onSuccess: (id: number) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({ spot, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        venue_name: '',
        city: 'Chennai',
        primary_area: '',
        venue_type: 'Masjid',
        food_type: 'Free',
        timing: '{"start": "03:00", "end": "04:30"}', // Default JSON format
        latitude: '',
        longitude: '',
        notes: '',
        phones: '', // Comma separated
        features: '' // Comma separated
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (spot) {
            setFormData({
                venue_name: spot.venue_name || '',
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
                features: spot.food_type === 'Free' ? 'Free, DineIn' : 'Paid, DineIn'
            });
        }
    }, [spot]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApprove = async () => {
        setLoading(true);
        try {
            // 1. Construct the Payload for 'spots' table
            const payload = {
                venue_name: formData.venue_name,
                city: formData.city,
                primary_area: formData.primary_area,
                venue_type: formData.venue_type,
                food_type: formData.food_type,
                // Cast timing string to JSON - be careful if it's invalid JSON
                timing: safeJsonParse(formData.timing),
                latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                notes: formData.notes,
                phones: formData.phones.split(',').map(s => s.trim()).filter(Boolean),
                features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
                contact_persons: spot.submitter_name ? [spot.submitter_name] : [],
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

        } catch (error) {
            console.error("Error approving spot:", error);
            alert("Error approving spot. Check console for details (often JSON format issues).");
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Check className="text-green-600" size={20} />
                        Approve Submission #{spot.id}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Venue Details</h3>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Venue Name</label>
                            <input
                                name="venue_name"
                                value={formData.venue_name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Area</label>
                                <input
                                    name="primary_area"
                                    value={formData.primary_area}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-200 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                                <select
                                    name="venue_type"
                                    value={formData.venue_type}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-200 rounded-lg bg-white"
                                >
                                    <option value="Masjid">Masjid</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Home">Home</option>
                                    <option value="Association">Association</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Food</label>
                                <select
                                    name="food_type"
                                    value={formData.food_type}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-200 rounded-lg bg-white"
                                >
                                    <option value="Free">Free</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Technical Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Map & Config</h3>

                        {/* Geocoding */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-2 text-blue-700">
                                <MapPin size={16} />
                                <span className="font-bold text-xs">Geocoordinates (Crucial)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    name="latitude"
                                    placeholder="Latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-blue-200 rounded-lg text-sm"
                                />
                                <input
                                    name="longitude"
                                    placeholder="Longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-blue-200 rounded-lg text-sm"
                                />
                            </div>
                            {spot.google_maps_link && (
                                <a href={spot.google_maps_link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-xs text-blue-600 underline">
                                    Open User's Link to find Lat/Long
                                </a>
                            )}
                        </div>

                        {/* Timing JSON */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                                <Clock size={12} /> Timing (JSON)
                            </label>
                            <input
                                name="timing"
                                value={formData.timing}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-200 rounded-lg font-mono text-xs text-gray-600"
                            />
                        </div>
                    </div>

                    {/* Full Width Notes */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Notes / Description</label>
                        <textarea
                            name="notes"
                            rows={2}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 sticky bottom-0 z-10 backdrop-blur-md rounded-b-2xl">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all flex items-center gap-2"
                    >
                        {loading ? 'Processing...' : (
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
