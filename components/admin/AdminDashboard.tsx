import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Check, X, MapPin, Clock, LogOut, Loader2 } from 'lucide-react';
import { ApprovalModal } from './ApprovalModal';

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
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [spots, setSpots] = useState<PendingSpot[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpotForApproval, setSelectedSpotForApproval] = useState<PendingSpot | null>(null);

    const fetchPendingSpots = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('pending_spots')
            .select('*')
            .eq('status', 'pending')
            .order('submitted_at', { ascending: false });

        if (!error && data) {
            setSpots(data as PendingSpot[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPendingSpots();
    }, []);

    const handleAction = async (id: number, action: 'approve' | 'reject') => {
        if (!supabase) return;

        if (action === 'approve') {
            // Open the modal for the admin to review/edit details before final approval
            const spotToApprove = spots.find(s => s.id === id);
            if (spotToApprove) {
                setSelectedSpotForApproval(spotToApprove);
            }
            return; // Stop here, wait for modal
        }

        const { error } = await supabase
            .from('pending_spots')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (!error) {
            setSpots(prev => prev.filter(s => s.id !== id));
        }
    };

    // Callback when modal successfully approves a spot
    const handleApprovalSuccess = (approvedId: number) => {
        setSpots(prev => prev.filter(s => s.id !== approvedId));
        setSelectedSpotForApproval(null);
    };

    const handleLogout = async () => {
        await supabase?.auth.signOut();
        onLogout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-emerald-midnight text-white px-6 py-4 flex items-center justify-between shadow-md">
                <h1 className="font-bold text-xl flex items-center gap-2">
                    <span className="text-gold-lantern">Sehri Finder</span> Admin
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Submissions</h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                    </div>
                ) : spots.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500">No pending submissions found.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {spots.map(spot => (
                            <div key={spot.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{spot.venue_name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {spot.primary_area}, {spot.city}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {new Date(spot.submitted_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {spot.description && (
                                            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4">
                                                "{spot.description}"
                                            </p>
                                        )}
                                        {spot.google_maps_link && (
                                            <a
                                                href={spot.google_maps_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline inline-block mb-4"
                                            >
                                                View on Maps
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleAction(spot.id, 'approve')}
                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                            title="Approve"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleAction(spot.id, 'reject')}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Reject"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedSpotForApproval && (
                <ApprovalModal
                    spot={selectedSpotForApproval}
                    onClose={() => setSelectedSpotForApproval(null)}
                    onSuccess={handleApprovalSuccess}
                />
            )}
        </div>
    );
};
