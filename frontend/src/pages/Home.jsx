import React from 'react';
import { Link } from 'react-router-dom';
import Scene from '../components/Scene';

const Home = () => {
    return (
        <div id="scroll-container" className="relative w-full">
            {/* 3D Background - Z-0 */}
            <Scene />

            {/* Content Overlay */}
            <div className="relative z-10 w-full pt-20">

                {/* Section 1: Hero with Booking Widget */}
                <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 max-w-7xl mx-auto">

                    {/* Left Text */}
                    <div className="md:w-1/2 text-left mb-10 md:mb-0">
                        <h1 className="text-6xl font-extrabold text-slate-900 leading-tight mb-4">
                            Travel with <br />
                            <span className="text-red-600">Confidence.</span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-8 max-w-md">
                            India's No. 1 Bus Booking Site. Experience the journey before you board.
                        </p>
                    </div>

                    {/* Right Booking Widget (Floating Card) */}
                    <div className="md:w-1/2 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Book Your Seat</h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">From</label>
                                <input type="text" placeholder="e.g. Bangalore" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-red-500 transition-colors font-medium" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">To</label>
                                <input type="text" placeholder="e.g. Mysore" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-red-500 transition-colors font-medium" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</label>
                                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-red-500 transition-colors font-medium" />
                            </div>

                            <Link to="/search" className="block pt-2">
                                <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-500/30">
                                    SEARCH BUSES
                                </button>
                            </Link>
                        </form>
                    </div>
                </section>

                {/* Section 2: Minimal Features */}
                <section className="h-screen flex items-center px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="md:w-1/2">
                        <span className="text-red-500 font-bold tracking-widest uppercase text-sm">Comfort First</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Reclining Beds</h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                            Our sleeper buses offer 180° reclining capability with memory foam mattresses. Sleep through the miles.
                        </p>
                    </div>
                </section>

                {/* Section 3: Safety */}
                <section className="h-screen flex items-center justify-end px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="md:w-1/2 text-right">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Safety Guaranteed</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Live Tracking</h2>
                        <p className="text-lg text-slate-600 leading-relaxed ml-auto max-w-md">
                            Share your live location with family. Verify your driver's credentials instantly. Your safety is our priority.
                        </p>
                    </div>
                </section>

                <div className="h-[20vh]" />
            </div>
        </div>
    );
};

export default Home;
