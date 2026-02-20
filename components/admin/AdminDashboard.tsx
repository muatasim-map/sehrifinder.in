
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Check, X, MapPin, Clock, LogOut, Loader2, Edit, AlertCircle, RefreshCw, Search, Filter } from 'lucide-react';
import { ApprovalModal } from './ApprovalModal';
import { EditSpotModal } from './EditSpotModal';
import { CreateSpotModal } from './CreateSpotModal';

interface AdminDashboardProps {
    onLogout: () => void;
}

interface PendingSpot {
    id: number;
    venue_name: string;
    city: string;
    primary_area: string;
    venue_type: string;
    food_type: string;
    description: string;
    submitted_at: string;
    status: string;
    google_maps_link: string;
    submitter_phone?: string;
    submitter_name?: string;
    // ... other fields
}

interface LiveSpot {
    location_id: number;
    venue_name: string;
    city: string;
    primary_area: string;
    venue_type: string;
    food_type: string;
    timing: any;
    latitude: number;
    longitude: number;
    verified: boolean;
    // ... other fields matching partial spot structure
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('All');

    // Data States
    const [pendingSpots, setPendingSpots] = useState<PendingSpot[]>([]);
    const [liveSpots, setLiveSpots] = useState<LiveSpot[]>([]);

    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

    // Modals
    const [selectedPendingSpot, setSelectedPendingSpot] = useState<PendingSpot | null>(null);
    const [selectedLiveSpot, setSelectedLiveSpot] = useState<LiveSpot | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const fetchPendingSpots = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('pending_spots')
            .select('*')
            .eq('status', 'pending')
            .order('submitted_at', { ascending: false });

        if (!error && data) {
            setPendingSpots(data as PendingSpot[]);
        }
        setLoading(false);
    };

    const fetchLiveSpots = async () => {
        setLoading(true);

        let query = supabase
            .from('spots')
            .select('*')
            .order('location_id', { ascending: false })
            .limit(100);

        if (selectedCity && selectedCity !== 'All') {
            query = query.eq('city', selectedCity);
        }

        if (searchTerm) {
            query = query.ilike('venue_name', `%${searchTerm}%`);
        }

        const { data, error } = await query;

        if (!error && data) {
            setLiveSpots(data as LiveSpot[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Debounce search slightly or just refetch
        const timer = setTimeout(() => {
            if (activeTab === 'pending') fetchPendingSpots();
            else fetchLiveSpots();
        }, 300);
        return () => clearTimeout(timer);
    }, [activeTab, selectedCity, searchTerm]);

    // Handle Toast
    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Pending Actions
    const handleReject = async (id: number) => {
        if (!confirm("Are you sure you want to reject this submission?")) return;

        const { error } = await supabase
            .from('pending_spots')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (!error) {
            setPendingSpots(prev => prev.filter(s => s.id !== id));
            showToast("Submission rejected", 'success');
        } else {
            showToast("Failed to reject", 'error');
        }
    };

    const handleApprovalSuccess = (approvedId: number) => {
        setPendingSpots(prev => prev.filter(s => s.id !== approvedId));
        setSelectedPendingSpot(null);
        showToast("Spot approved and published!", 'success');
    };

    // Live Actions
    const handleEditSuccess = (updatedSpot: LiveSpot) => {
        setLiveSpots(prev => prev.map(s => s.location_id === updatedSpot.location_id ? updatedSpot : s));
        showToast("Spot updated successfully!", 'success');
    };

    const handleDeleteSuccess = (deletedId: number) => {
        setLiveSpots(prev => prev.filter(s => s.location_id !== deletedId));
        showToast("Spot deleted permanently.", 'success');
    };

    const handleCreateSuccess = (newSpot: LiveSpot) => {
        setLiveSpots(prev => [newSpot, ...prev]);
        setActiveTab('active'); // Switch to active tab to see the new spot
        showToast("Spot published directly to the live map!", 'success');
    };


    // Helper to safely display timing
    const formatTiming = (timing: any) => {
        try {
            const t = typeof timing === 'string' ? JSON.parse(timing) : timing;
            if (!t) return 'No timing';
            if (t.start && t.end) return `${t.start} - ${t.end}`;
            if (t.raw_timing) return t.raw_timing;
            return 'Invalid timing format';
        } catch (e) {
            return 'Error parsing timing';
        }
    };

    const handleLogout = async () => {
        await supabase?.auth.signOut();
        onLogout();
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-geometric-grid opacity-[0.03] pointer-events-none"></div>

            {/* Header */}
            <div className="bg-emerald-midnight text-white px-6 py-4 flex items-center justify-between shadow-md relative z-10 border-b border-gold-lantern/20">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-2xl flex items-center gap-2 font-reem">
                        <span className="text-gold-lantern">Sehri Finder</span> Admin
                    </h1>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="hidden md:flex ml-4 items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-500 transition-colors shadow-lg"
                    >
                        + Add New Spot
                    </button>
                    <div className="hidden md:flex bg-emerald-900/50 rounded-lg p-1 border border-emerald-800 ml-2">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'pending' ? 'bg-gold-lantern text-emerald-midnight font-bold shadow-sm' : 'text-emerald-100 hover:text-white hover:bg-emerald-800'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-gold-lantern text-emerald-midnight font-bold shadow-sm' : 'text-emerald-100 hover:text-white hover:bg-emerald-800'}`}
                        >
                            Active Spots
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => activeTab === 'pending' ? fetchPendingSpots() : fetchLiveSpots()} className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Refresh">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-medium text-red-200 hover:text-red-100 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden px-4 py-3 bg-white border-b border-gray-100 flex gap-2">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`flex-1 py-2 text-center text-sm font-bold border-b-2 transition-colors ${activeTab === 'pending' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-gray-500'}`}
                >
                    Pending Review
                </button>
                <button
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 py-2 text-center text-sm font-bold border-b-2 transition-colors ${activeTab === 'active' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-gray-500'}`}
                >
                    Active Spots
                </button>
            </div>

            {/* Mobile Add New Button */}
            <div className="md:hidden px-4 py-3 bg-white border-b border-gray-100">
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-md"
                >
                    + Add New Spot
                </button>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-0">
                {/* Toast */}
                {toast && (
                    <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl text-white font-bold text-sm transform transition-all duration-300 z-50 flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                        {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        {toast.msg}
                    </div>
                )}

                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-emerald-900 font-reem">
                            {activeTab === 'pending' ? 'Pending Submissions' : 'Active Spots Management'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {activeTab === 'pending'
                                ? 'Review and approve community submissions.'
                                : 'Edit details of live published spots.'}
                        </p>
                    </div>

                    {/* Filters (Only for Active Spots) */}
                    {activeTab === 'active' && (
                        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-full md:w-64"
                                />
                            </div>

                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="pl-9 pr-8 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none appearance-none bg-white cursor-pointer"
                                >
                                    <option value="All">All Cities</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Mumbai">Mumbai</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                    </div>
                )}

                {/* PENDING LIST */}
                {!loading && activeTab === 'pending' && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
                        {pendingSpots.length === 0 ? (
                            <div className="col-span-full text-center py-16 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                                <Check className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">All caught up! No pending submissions.</p>
                            </div>
                        ) : (
                            pendingSpots.map(spot => (
                                <div key={spot.id} className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-all group relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600"></div>
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${spot.food_type === 'Free' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {spot.food_type}
                                                </span>
                                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide bg-blue-100 text-blue-700">
                                                    {spot.venue_type}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                                                    <Clock size={10} /> {new Date(spot.submitted_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 font-reem">{spot.venue_name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                                    {spot.primary_area}, {spot.city}
                                                </div>
                                            </div>
                                            {spot.description && (
                                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4 italic border-l-2 border-gray-200">
                                                    "{spot.description}"
                                                </p>
                                            )}
                                            {spot.google_maps_link && (
                                                <a
                                                    href={spot.google_maps_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mb-4"
                                                >
                                                    View User Map Link ↗
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => setSelectedPendingSpot(spot)}
                                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 font-bold text-sm min-w-[120px]"
                                            >
                                                <Check size={16} /> Review
                                            </button>
                                            <button
                                                onClick={() => handleReject(spot.id)}
                                                className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
                                            >
                                                <X size={16} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ACTIVE SPOTS LIST */}
                {!loading && activeTab === 'active' && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {liveSpots.map(spot => (
                            <div key={spot.location_id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-gold-lantern/50 transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-emerald-900 font-reem line-clamp-1" title={spot.venue_name}>{spot.venue_name}</h3>
                                        <p className="text-xs text-gray-500 font-medium">{spot.primary_area}, {spot.city}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${spot.food_type === 'Free' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                        {spot.food_type}
                                    </span>
                                </div>

                                <div className="text-xs text-gray-500 space-y-1 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${spot.verified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        {spot.verified ? <span className="text-green-600 font-medium">Verified Active</span> : 'Unverified'}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        <span className="font-mono text-emerald-800">
                                            {formatTiming(spot.timing)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedLiveSpot(spot)}
                                    className="w-full py-2 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 font-bold text-sm rounded-lg border border-gray-200 hover:border-emerald-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Edit size={14} /> Edit Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* MODALS */}
            {
                selectedPendingSpot && (
                    <ApprovalModal
                        spot={selectedPendingSpot}
                        onClose={() => setSelectedPendingSpot(null)}
                        onSuccess={handleApprovalSuccess}
                    />
                )
            }

            {
                selectedLiveSpot && (
                    <EditSpotModal
                        spot={selectedLiveSpot}
                        onClose={() => setSelectedLiveSpot(null)}
                        onSuccess={handleEditSuccess}
                        onDelete={handleDeleteSuccess}
                    />
                )
            }

            {
                isCreateModalOpen && (
                    <CreateSpotModal
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={handleCreateSuccess}
                    />
                )
            }
        </div >
    );
};

