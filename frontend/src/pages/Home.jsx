import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Search, Percent, Ticket } from 'lucide-react';
import CityInput from '../components/CityInput';
import CustomCalendar from '../components/CustomCalendar';
import HeroVideo from '../assets/videos/WhatsApp Video 2026-01-24 at 10.03.09 AM.mp4';
import KathmanduImg from '../assets/photos/kathmanduroute.png';
import PokharaImg from '../assets/photos/pokhararoute.png';
import ChitwanImg from '../assets/photos/sauraharoute.png';
import LumbiniImg from '../assets/photos/lumbiniroute.png';
import MustangImg from '../assets/photos/mustangroute.png';
import BusImg from '../assets/photos/vip-sofa-bus.jpg'; // Fallback

const Home = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [travelDate, setTravelDate] = useState(null);

    return (
        <div id="scroll-container" className="relative w-full min-h-screen bg-white font-sans text-slate-800">
            {/* Video Background */}
            <div className="fixed inset-0 z-0 h-[60vh] md:h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Overlay for text readability */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={HeroVideo} type="video/mp4" />
                </video>
                {/* Gradient fade at bottom to blend with white content */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full pt-12 md:pt-24 pb-20">

                {/* Hero Section */}
                <div className="w-full relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pb-24 md:pb-32 relative z-20 pt-10">

                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                            Experience Nepal <br />
                            <span className="text-nepal-red text-5xl md:text-7xl font-black mt-2 inline-block relative drop-shadow-md">
                                on Wheels
                            </span>
                        </h1>

                        <p className="max-w-2xl text-lg text-white/90 mb-12 font-medium drop-shadow-md">
                            From the majestic Himalayas to the plains of Terai. <br className="hidden md:block" />
                            Travel safely with the most trusted bus service in Nepal.
                        </p>

                        {/* Search Widget - Exact RedBus Replica */}
                        <div className="relative z-20 w-full max-w-[1240px] mx-auto">
                            <div className="bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row items-stretch border border-slate-200 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[110px]">

                                {/* Leaving From */}
                                <div className="flex-1 relative p-2 lg:p-0 hover:bg-slate-50 lg:rounded-l-[2rem] transition-colors group">
                                    <div className="h-full flex items-center p-6">
                                        <CityInput
                                            value={fromCity}
                                            onChange={setFromCity}
                                            placeholder="From"
                                            excludeCity={toCity}
                                        />
                                    </div>
                                </div>

                                {/* Swap Icon (Centered on Desktop) */}
                                <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
                                    <div className="bg-white p-1 rounded-full border border-slate-100 shadow-md">
                                        <button
                                            onClick={() => {
                                                const temp = fromCity;
                                                setFromCity(toCity);
                                                setToCity(temp);
                                            }}
                                            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-500 hover:text-nepal-red hover:shadow-sm focus:outline-none transition-all"
                                        >
                                            <ArrowRightLeft className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Going To */}
                                <div className="flex-1 relative p-2 lg:p-0 hover:bg-slate-50 transition-colors group">
                                    <div className="h-full flex items-center p-6">
                                        <CityInput
                                            value={toCity}
                                            onChange={setToCity}
                                            placeholder="To"
                                            excludeCity={fromCity}
                                        />
                                    </div>
                                </div>

                                {/* Date of Journey */}
                                <div className="flex-[1.5] relative p-2 lg:p-0 hover:bg-slate-50 transition-colors group">
                                    <div className="h-full flex items-center p-3">
                                        <CustomCalendar
                                            selectedDate={travelDate}
                                            onChange={setTravelDate}
                                        />
                                    </div>
                                </div>

                                {/* Booking for Women */}
                                <div className="flex-1 relative p-4 lg:p-6 hover:bg-slate-50 lg:rounded-r-[2rem] transition-colors group flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-nepal-red w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 2.2-1.5 4.1-3.5 4.8l-1.5 9.2h-3L8.5 11.8A5 5 0 0 1 5 7a5 5 0 0 1 5-5z" /></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-800 uppercase leading-tight">Booking <br /> for Women</span>
                                        </div>
                                    </div>
                                    {/* Toggle Switch */}
                                    <div className="relative inline-block w-12 shrink-0 select-none transition duration-200 ease-in ml-auto">
                                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 left-0 checked:right-0 checked:border-nepal-red" />
                                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                                    </div>
                                </div>

                            </div>

                            {/* Floating Search Button */}
                            <div className="absolute left-1/2 -ml-8 -bottom-10 -translate-x-1/2 z-30 flex justify-center pointer-events-none w-full">
                                <Link to="/search" className="pointer-events-auto">
                                    <button className="px-10 py-4 bg-[#DC143C] hover:bg-red-700 text-white text-xl font-bold rounded-full shadow-xl shadow-red-900/30 hover:shadow-red-900/50 transition-all flex items-center gap-2 transform hover:-translate-y-1">
                                        SEARCH BUSES
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Spacer for Floating Button */}
                        <div className="h-12 w-full"></div>
                    </div>

                    {/* Cultural Silhouette Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 cultural-skyline pointer-events-none opacity-80"></div>
                </div>


                {/* Section 1: Daily Bus Services */}
                <section className="w-full py-20 px-4 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-nepal-red font-bold tracking-wider uppercase text-sm">Travel Across Nepal</span>
                            <h2 className="text-4xl font-bold text-slate-900 mt-2">Daily Bus Services</h2>
                            <div className="w-16 h-1 bg-nepal-red mx-auto mt-4"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Kathmandu to Pokhara", image: PokharaImg, price: "Rs. 1000" },
                                { title: "Kathmandu to Chitwan", image: ChitwanImg, price: "Rs. 900" },
                                { title: "Kathmandu to Lumbini", image: LumbiniImg, price: "Rs. 1200" },
                                { title: "Kathmandu to Muktinath", image: MustangImg, price: "Rs. 2500" },
                                { title: "Pokhara to Chitwan", image: ChitwanImg, price: "Rs. 800" },
                                { title: "Kathmandu to Bandipur", image: BusImg, price: "Rs. 700" }
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-slate-100">
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
                                            <p className="text-white font-bold text-lg">{item.title}</p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 uppercase font-semibold">Starting from</span>
                                            <span className="text-lg font-bold text-nepal-red">{item.price}</span>
                                        </div>
                                        <button className="px-5 py-2.5 border border-nepal-red text-nepal-red font-bold rounded-lg hover:bg-nepal-red hover:text-white transition-all text-sm shadow-sm hover:shadow-md">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 2: Vehicle Rentals */}
                <section className="w-full py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-nepal-blue pl-4">Vehicle Rental Services</h2>
                                <p className="text-slate-500 mt-2 pl-5">Luxury & comfort for any occasion.</p>
                            </div>
                            <Link to="/rentals" className="text-nepal-blue font-semibold hover:underline">View All Rentals →</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Sofa Bus Hire", icon: "🚌", desc: "Luxury travel for groups" },
                                { title: "Wedding Vintage Car", icon: "🚗", desc: "Make your day special" },
                                { title: "SUV Rental", icon: "🚙", desc: "For rugged terrains" },
                                { title: "Toyota Hiace", icon: "🚐", desc: "Family trips & tours" }
                            ].map((item, index) => (
                                <div key={index} className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl border border-slate-100 transition-all cursor-pointer group hover:-translate-y-1">
                                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-nepal-blue transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3: Adventure Activities */}
                <section className="w-full py-24 px-4 bg-[#1A1F2B] text-white relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nepal-red/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-nepal-blue/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-nepal-red font-bold tracking-wider uppercase text-sm">Thrill & Fun</span>
                            <h2 className="text-4xl font-bold mb-4 mt-2">Adventure Activities</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Experience the thrill of the Himalayas. From the sky to the rivers, Nepal has it all.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                "Paragliding", "Bungee Jump", "Hot Air Balloon", "Zipline", "Rafting", "Jungle Safari",
                                "Skydiving", "Canoeing", "Ultra-Light Flight", "Biking", "Caves Adventure", "Trekking"
                            ].map((activity, index) => (
                                <div key={index} className="bg-white/5 hover:bg-nepal-red backdrop-blur-sm rounded-xl p-6 text-center cursor-pointer transition-all duration-300 border border-white/10 group hover:-translate-y-1 hover:shadow-lg hover:shadow-nepal-red/20">
                                    <span className="block text-sm font-semibold group-hover:text-white text-slate-300 transition-colors">{activity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 4: Popular Tour Packages */}
                <section className="w-full py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900">Popular Tour Packages</h2>
                            <div className="w-16 h-1 bg-nepal-blue mx-auto mt-4"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { city: "Kathmandu", image: KathmanduImg, tours: "City Tour, Heritage Walk" },
                                { city: "Pokhara", image: PokharaImg, tours: "Lake Side, Sarangkot" },
                                { city: "Chitwan", image: ChitwanImg, tours: "Jungle Safari, Tharu Cultural" },
                                { city: "Lumbini", image: LumbiniImg, tours: "Birthplace of Buddha" }
                            ].map((pkg, index) => (
                                <div key={index} className="group relative rounded-2xl overflow-hidden h-[350px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                                    <img src={pkg.image} alt={pkg.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                        <h3 className="text-3xl font-bold text-white mb-1">{pkg.city}</h3>
                                        <p className="text-slate-300 font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">{pkg.tours}</p>
                                        <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            <span className="text-xs font-bold text-nepal-red uppercase tracking-wider bg-white px-3 py-1 rounded-full">Explore</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-20 bg-white"></div>
            </div>
        </div>
    );
};

export default Home;
