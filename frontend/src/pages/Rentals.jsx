import React from 'react';
import { MessageCircle, Check } from 'lucide-react';
import VipBusImg from '../assets/photos/vip-sofa-bus.jpg';
import SofaBusImg from '../assets/photos/Sofa-Bus-Nepal-2.jpg';
import DeluxeBusImg from '../assets/photos/super-deluxe.jpg';
import HiaceImg from '../assets/photos/toyota-hiace.png';
import PokharaCarImg from '../assets/photos/pokhara-car.png';
import KathmanduCarImg from '../assets/photos/kathmandu-car.png'; // User provided red car

const Rentals = () => {
    const phoneNumber = "9779856068470";

    const handleRentClick = (vehicleName) => {
        const message = encodeURIComponent(`Namaste, I am interested in renting a ${vehicleName}. Please provide details.`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const rentalItems = [
        {
            title: "Sofa Bus Hire in Nepal",
            image: VipBusImg,
            features: ["Luxury Seating", "AC / Heater", "Wifi", "Mineral Water"],
            category: "Bus"
        },
        {
            title: "Sofa Bus Hire in Kathmandu",
            image: SofaBusImg,
            features: ["City Tours", "Wedding Events", "Picnics", "Airport Transfer"],
            category: "Bus"
        },
        {
            title: "Luxury Wedding Vehicles",
            image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
            features: ["Decorated", "Professional Driver", "Premium Comfort"],
            category: "Car"
        },
        {
            title: "Car Rental From Kathmandu",
            image: KathmanduCarImg, // Using the user's specific Red MG Car image
            features: ["City Travel", "Intercity Drops", "Reasonable Rates"],
            category: "Car"
        },
        {
            title: "Car Rental in Pokhara",
            image: PokharaCarImg,
            features: ["Sightseeing", "Sarangkot Sunrise", "Lake Tour"],
            category: "Car"
        },
        {
            title: "Jeep Rental Service",
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
            features: ["Off-road capable", "Mustang Tours", "Muktinath Yatra"],
            category: "Jeep"
        },
        {
            title: "Toyota Hiace Rental",
            image: HiaceImg,
            features: ["14 Seater", "Family Tours", "Group Travel", "Comfortable"],
            category: "Van"
        },
        {
            title: "Tourist Bus Hire (Pokhara)",
            image: DeluxeBusImg,
            features: ["Large Groups", "School Excursions", "Corporate Events"],
            category: "Bus"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* Header */}
            <div className="bg-nepal-blue text-white py-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <span className="uppercase tracking-widest text-sm font-bold opacity-80 mb-2 block">Premium Fleet</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Vehicle Rental Services</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">Choose from our wide range of luxury vehicles for weddings, tours, and events.</p>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {rentalItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase">
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-nepal-red transition-colors">{item.title}</h3>

                                <ul className="space-y-2 mb-6 flex-grow">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-slate-500">
                                            <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleRentClick(item.title)}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-95"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book via WhatsApp
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Direct Contact Section */}
            <div className="bg-white py-12 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Can't find what you're looking for?</h2>
                    <p className="text-slate-600 mb-8">Contact us directly for custom requirements and bulk bookings.</p>
                    <button
                        onClick={() => handleRentClick("Custom Requirement")}
                        className="px-8 py-3 bg-nepal-red text-white font-bold rounded-full hover:bg-red-700 transition-colors"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Rentals;
