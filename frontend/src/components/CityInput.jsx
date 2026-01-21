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
        <div className="relative flex-1 group w-full" ref={wrapperRef}>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors pointer-events-none">
                <MapPin className="w-5 h-5" />
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
                placeholder={placeholder}
                className="w-full h-16 pl-14 pr-4 rounded-2xl bg-slate-50/50 md:bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none text-lg font-semibold text-slate-700 placeholder:text-slate-400 transition-all border border-transparent focus:border-rose-100 focus:ring-4 focus:ring-rose-50 cursor-pointer"
            />

            {/* Dropdown */}
            {isOpen && validCities.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
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
