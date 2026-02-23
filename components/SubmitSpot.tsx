import React, { useState } from 'react';
import { ArrowLeft, Send, MapPin, Building2, Clock, Map, FileText, Globe } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { COUNTRIES } from '../data/locations';
import { IslamicPattern } from './Pattern';

interface SubmitSpotProps {
    onBack: () => void;
}

// CITIES moved to data/locations.ts
const VENUE_TYPES = [
    { value: "Masjid", label: "Masjid" },
    { value: "Association", label: "Association / Foundation" },
    { value: "Home", label: "Private Home" },
    { value: "Restaurant", label: "Restaurant (Paid)" },
    { value: "Other", label: "Other" }
];
const FOOD_TYPES = [
    { value: "Free", label: "Free (Sadaqah)" },
    { value: "Paid", label: "Paid" },
    { value: "Partially Paid", label: "Subsidized / Low Cost" }
];

export const SubmitSpot: React.FC<SubmitSpotProps> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: 'India',
        city: 'Chennai',
        area: '',
        type: 'Masjid',
        foodType: 'Free',
        timing: '',
        googleMapsLink: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Submit to Supabase
            // Import supabase dynamically or use the one from utils
            const { supabase } = await import('../utils/supabase');

            if (supabase) {
                const { error } = await supabase.from('pending_spots').insert([{
                    venue_name: formData.name,
                    country: formData.country,
                    city: formData.city,
                    primary_area: formData.area,
                    venue_type: formData.type,
                    food_type: formData.foodType,
                    timing: formData.timing,
                    google_maps_link: formData.googleMapsLink,
                    description: formData.notes,
                    submitted_at: new Date().toISOString(),
                    status: 'pending'
                }]);

                if (error) {
                    console.error("Supabase submission error:", error);
                    alert("There was an issue saving to our database, but we will still open WhatsApp for you.");
                }
            }

            // 2. Open WhatsApp (Legacy/Backup & Notification)
            const text = APP_CONFIG.MESSAGES.SUBMIT_TEMPLATE(formData);
            const url = `${APP_CONFIG.WHATSAPP_BASE_URL}/${APP_CONFIG.ADMIN_PHONE}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');

            // 3. Close/Reset
            onBack();

        } catch (err) {
            console.error("Submission error:", err);
            // Fallback to just WhatsApp
            const text = APP_CONFIG.MESSAGES.SUBMIT_TEMPLATE(formData);
            const url = `${APP_CONFIG.WHATSAPP_BASE_URL}/${APP_CONFIG.ADMIN_PHONE}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // If country changes, reset city to the first city of that country
            if (name === 'country') {
                const country = COUNTRIES.find(c => c.name === value);
                if (country) newData.city = country.cities[0];
            }
            return newData;
        });
    };

    return (
        <div className="min-h-screen bg-cream flex flex-col font-sans relative animate-fade-in">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <IslamicPattern opacity={0.06} variant="hexagonal" className="text-primary-dark" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-primary hover:border-primary transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-serif font-bold text-2xl text-primary-dark">Submit a New Spot</h1>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gold/20 relative overflow-hidden">

                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-emerald-600" />

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Spot Name *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="e.g. Masjid-e-Noor or Bhai Veetu Biryani"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Country, City & Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Country *</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white appearance-none"
                                    >
                                        {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white appearance-none"
                                    >
                                        {COUNTRIES.find(c => c.name === formData.country)?.cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Area / Locality *</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="area"
                                    required
                                    placeholder="e.g. Triplicane"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Type & Food Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Venue Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                                >
                                    {VENUE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Food Type *</label>
                                <select
                                    name="foodType"
                                    value={formData.foodType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                                >
                                    {FOOD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Timing */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Timing (Approx) *</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="timing"
                                    required
                                    placeholder="e.g. 3:00 AM - 4:15 AM"
                                    value={formData.timing}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Google Maps Link */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps Link (Optional)</label>
                            <div className="relative">
                                <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    name="googleMapsLink"
                                    placeholder="Paste link here..."
                                    value={formData.googleMapsLink}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes (Optional)</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                                <textarea
                                    name="notes"
                                    rows={3}
                                    placeholder="Any specific instructions? e.g. 'Enter through back gate', 'Women's section available'"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            {isSubmitting ? 'Saving...' : 'Submit Spot'}
                        </button>

                        <p className="text-center text-xs text-gray-400 px-4">
                            Clicking submit will open WhatsApp with these details pre-filled. You can review before sending.
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};
