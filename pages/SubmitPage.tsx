import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitSpot } from '../components/SubmitSpot';

const SubmitPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 z-30 bg-white">
            <SubmitSpot onBack={() => navigate(-1)} />
        </div>
    );
};

export default SubmitPage;
