import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const availableCities = [
    "Kathmandu (KTM)",
    "Pokhara",
    "Sauraha",
    "Lumbini",
    "Chitwan",
    "Butwal",
    "Dharan",
    "Biratnagar"
];

const CityInput = ({ label, placeholder, value, onChange, excludeCity }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setSearchTerm(value);
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const filteredCities = availableCities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase()) &&
        city !== excludeCity
    );

    const checkRouteValidity = (selectedCity) => {
        // "Remember bus can't go sauraha to pokharaa or pokhara to sauraha"
        if ((selectedCity === "Sauraha" && excludeCity === "Pokhara") ||
            (selectedCity === "Pokhara" && excludeCity === "Sauraha")) {
            return false;
        }
        return true;
    };

    // Filter out invalid routes from the dropdown list entirely
    const validCities = filteredCities.filter(city => checkRouteValidity(city));

    return (
        <div className="relative w-full h-full group" ref={wrapperRef}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-nepal-red transition-colors">
                {/* Bus Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6" /><path d="M15 6v6" /><path d="M2 12h19.6" /><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" /><circle cx="7" cy="18" r="2" /><path d="M9 18h5" /><circle cx="16" cy="18" r="2" /></svg>
            </div>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                    if (e.target.value === '') {
                        onChange('');
                    }
                }}
                onFocus={() => setIsOpen(true)}
                placeholder=""
                className="w-full h-full bg-transparent focus:outline-none text-xl font-bold text-slate-800 cursor-pointer pl-12 pr-4 pt-4"
            />
            {/* Label: Acts as placeholder when empty, moves up when active */}
            <label className={`absolute left-12 transition-all duration-200 pointer-events-none truncate max-w-[120px]
                ${searchTerm || isOpen
                    ? 'top-2 text-xs font-bold text-slate-500 uppercase tracking-wider'
                    : 'top-1/2 -translate-y-1/2 text-xl font-normal text-slate-500'
                }`}
            >
                {placeholder}
            </label>

            {/* Dropdown */}
            {isOpen && validCities.length > 0 && (
                <div className="absolute top-full left-0 w-full min-w-[200px] mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
                    {validCities.map((city) => (
                        <div
                            key={city}
                            onClick={() => {
                                onChange(city);
                                setSearchTerm(city);
                                setIsOpen(false);
                            }}
                            className="px-6 py-3 hover:bg-rose-50 cursor-pointer text-slate-700 font-medium flex items-center gap-3 transition-colors"
                        >
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CityInput;
