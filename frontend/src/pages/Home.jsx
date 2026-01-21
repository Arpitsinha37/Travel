import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Search, Percent, Ticket } from 'lucide-react';
import Scene from '../components/Scene';
import CityInput from '../components/CityInput';
import CustomCalendar from '../components/CustomCalendar';

const Home = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [travelDate, setTravelDate] = useState(null);
    return (
        <div id="scroll-container" className="relative w-full min-h-screen bg-slate-50">
            {/* Colorful Gradient Background (Subtle) */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 via-sky-100/40 to-slate-50"></div>

            {/* 3D Background - Fixed Position */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Scene />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full pt-32 pb-20">

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                    {/* Hero Title */}
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-rose-100 mb-6 shadow-sm">
                        <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent font-bold text-sm tracking-wide uppercase">
                            Start Your Journey
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-800 leading-tight mb-8 tracking-tight">
                        Nepal's Favorite <br className="hidden md:block" />
                        <span className="relative">
                            <span className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-orange-300 opacity-30 blur-lg rounded-full"></span>
                            <span className="relative bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">Bus Booking</span>
                        </span> Platform
                    </h1>

                    {/* Search Widget Container */}
                    <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl p-2 md:p-4 rounded-[2rem] shadow-2xl shadow-rose-900/10 border border-white/50 flex flex-col md:flex-row items-center gap-2 md:gap-0 mt-8 relative z-20">

                        {/* Leaving From */}
                        <CityInput
                            value={fromCity}
                            onChange={setFromCity}
                            placeholder="Leaving From"
                            excludeCity={toCity}
                        />

                        {/* Swap Icon */}
                        <div className="hidden md:flex items-center justify-center w-12 z-10 -ml-6 -mr-6">
                            <button
                                onClick={() => {
                                    const temp = fromCity;
                                    setFromCity(toCity);
                                    setToCity(temp);
                                }}
                                className="bg-white border border-slate-100 p-3 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 shadow-md hover:shadow-lg transition-all scale-100 hover:scale-110 z-20 focus:outline-none"
                            >
                                <ArrowRightLeft className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Going To */}
                        <CityInput
                            value={toCity}
                            onChange={setToCity}
                            placeholder="Going To"
                            excludeCity={fromCity}
                        />

                        {/* Divider */}
                        <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-slate-200 to-transparent mx-2"></div>

                        {/* Date */}
                        <CustomCalendar
                            selectedDate={travelDate}
                            onChange={setTravelDate}
                        />

                        {/* Search Button */}
                        <div className="w-full md:w-auto p-1">
                            <Link to="/search" className="block w-full">
                                <button className="w-full md:w-auto h-14 md:h-16 px-10 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    <Search className="w-5 h-5" />
                                    Search
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Spacer for 3D Bus Visibility */}
                <div className="h-[40vh] w-full pointer-events-none"></div>

                {/* Features / Offers Section - Minimalist Cards */}
                <section className="bg-white/50 backdrop-blur-xl w-full py-20 px-4 relative border-t border-white/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800">Exclusive Offers</h2>
                                <p className="text-slate-500 mt-2">Best deals for your next journey</p>
                            </div>
                            <Link to="/offers" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">View All</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Offer Card 1 */}
                            <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-orange-50 rounded-2xl group-hover:bg-orange-100 transition-colors">
                                        <Percent className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">BUS300</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">Save up to ₹300</h3>
                                <p className="text-slate-500 text-sm mb-4">Valid on bookings above ₹500.</p>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="w-2/3 h-full bg-orange-500 rounded-full"></div>
                                </div>
                            </div>

                            {/* Offer Card 2 */}
                            <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-rose-50 rounded-2xl group-hover:bg-rose-100 transition-colors">
                                        <Ticket className="w-6 h-6 text-rose-500" />
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">FIRST500</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">First Ride Free</h3>
                                <p className="text-slate-500 text-sm mb-4">Up to ₹500 on your first trip.</p>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="w-1/2 h-full bg-rose-500 rounded-full"></div>
                                </div>
                            </div>

                            {/* Offer Card 3 */}
                            <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                                        <Percent className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">CB200</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">20% Cashback</h3>
                                <p className="text-slate-500 text-sm mb-4">Instant cashback to wallet.</p>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Safety Section - Clean */}
                <section className="w-full py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-50 rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
                            {/* Decorative Blob */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                                <div className="md:w-1/2">
                                    <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-4">Safety First</span>
                                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Live Bus Tracking <br /> & Safety</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
                                        Share your live location with family. Verify your driver's credentials instantly. We ensure every mile is safe.
                                    </p>
                                    <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Learn More
                                    </button>
                                </div>
                                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                                    {/* Abstract Safety Illustration (SVG or CSS shape) */}
                                    <div className="w-64 h-64 bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-center items-center gap-4 rotate-3 hover:rotate-0 transition-all duration-500">
                                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-slate-800">Live Status</p>
                                            <p className="text-emerald-500 font-semibold text-sm">On Time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-20 bg-white"></div>
            </div>
        </div>
    );
};

export default Home;
