
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface Timing {
    start: string;
    end: string;
}

interface TimingInputProps {
    value: string | Timing; // Can be JSON string or object
    onChange: (timing: Timing) => void;
    label?: string;
}

export const TimingInput: React.FC<TimingInputProps> = ({ value, onChange, label = "Sehri Timing" }) => {
    const [start, setStart] = useState('03:00');
    const [end, setEnd] = useState('04:30');

    // Parse initial value
    useEffect(() => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                if (parsed.start) setStart(parsed.start);
                if (parsed.end) setEnd(parsed.end);
            } catch (e) {
                // If invalid JSON, ignore or default
            }
        } else if (typeof value === 'object' && value !== null) {
            if (value.start) setStart(value.start);
            if (value.end) setEnd(value.end);
        }
    }, [value]);

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = e.target.value;
        setStart(newStart);
        onChange({ start: newStart, end });
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEnd = e.target.value;
        setEnd(newEnd);
        onChange({ start, end: newEnd });
    };

    return (
        <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
            <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock size={12} className="text-emerald-600" />
                {label}
            </label>
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <label className="block text-[10px] text-emerald-600 mb-1">Starts</label>
                    <input
                        type="time"
                        value={start}
                        onChange={handleStartChange}
                        className="w-full p-2 bg-white border border-emerald-200 rounded-md text-sm font-medium text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                </div>
                <span className="text-emerald-400 mt-4">-to-</span>
                <div className="flex-1">
                    <label className="block text-[10px] text-emerald-600 mb-1">Ends</label>
                    <input
                        type="time"
                        value={end}
                        onChange={handleEndChange}
                        className="w-full p-2 bg-white border border-emerald-200 rounded-md text-sm font-medium text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                </div>
            </div>
            <p className="text-[10px] text-emerald-600/60 mt-2">
                * Format will be saved as JSON automatically.
            </p>
        </div>
    );
};
