import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminDashboard } from '../components/admin/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 z-50 bg-white">
            <AdminDashboard
                onLogout={() => navigate('/admin')}
            />
        </div>
    );
};

export default AdminDashboardPage;
