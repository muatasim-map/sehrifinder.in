import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../components/admin/AdminLogin';

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 z-50 bg-white">
            <AdminLogin
                onLoginSuccess={() => navigate('/admin/dashboard')}
                onBack={() => navigate('/')}
            />
        </div>
    );
};

export default AdminLoginPage;
