import React from 'react';
import { ShieldCheck, Heart, Globe, Clock, Users, Leaf } from 'lucide-react';
import VipBusImg from '../assets/photos/vip-sofa-bus.jpg';
import SofaBusImg from '../assets/photos/Sofa-Bus-Nepal-2.jpg';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                    src={VipBusImg}
                    alt="New Road Travels Luxury Bus"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg font-serif">Welcome to <br /> <span className="text-nepal-red">Newroad Travels</span></h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide">Your Journey Begins Here</p>
                </div>
            </div>

            {/* Who We Are & Intro */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-nepal-red font-bold uppercase tracking-wider text-sm mb-2 block">Who We Are</span>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">We help you <span className="text-nepal-blue">explore the world</span> easily.</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            Newroad Travels is a friendly travel company dedicated to crafting unforgettable journeys.
                            Whether it’s a family vacation, business trip, or solo adventure, we plan custom trips just for you.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            At Newroad Travels, we believe every journey should be unforgettable. Whether you're dreaming of a relaxing beach getaway,
                            an adventurous trek through the mountains, or a culturally rich city tour, we’re here to turn your travel dreams into reality.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex flex-col border-l-4 border-nepal-red pl-4">
                                <span className="font-bold text-3xl text-slate-900">10+</span>
                                <span className="text-slate-500">Years Experience</span>
                            </div>
                            <div className="flex flex-col border-l-4 border-nepal-blue pl-4">
                                <span className="font-bold text-3xl text-slate-900">50k+</span>
                                <span className="text-slate-500">Happy Travelers</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-nepal-red/5 rounded-2xl transform rotate-3"></div>
                        <img
                            src={SofaBusImg}
                            alt="Comfortable Travel"
                            className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                        />
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">What We Do</h2>
                        <div className="w-16 h-1 bg-nepal-red mx-auto mt-4 mb-4"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto">We make travel simple by offering personalized services for every need.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Holiday Packages", icon: Globe, desc: "Custom trips for fun, adventure, or relaxation.", color: "bg-blue-100 text-blue-600" },
                            { title: "Hotels & Flights", icon: ShieldCheck, desc: "Easy bookings at good prices.", color: "bg-green-100 text-green-600" },
                            { title: "Business Travel", icon: Users, desc: "Smooth work trips with no stress.", color: "bg-purple-100 text-purple-600" },
                            { title: "Special Tours", icon: Heart, desc: "Unique cultural, food, or nature experiences.", color: "bg-red-100 text-red-600" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-100 text-center group hover:-translate-y-1">
                                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-nepal-blue text-white p-6 rounded-2xl rounded-br-[4rem] flex flex-col justify-center h-48">
                                <Leaf className="w-10 h-10 mb-4" />
                                <h4 className="font-bold text-lg">Eco-Friendly</h4>
                                <p className="text-sm opacity-80">Sustainable travel options.</p>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-2xl rounded-tl-[4rem] flex flex-col justify-center h-48">
                                <ShieldCheck className="w-10 h-10 mb-4 text-nepal-red" />
                                <h4 className="font-bold text-lg text-slate-900">Safe & Secure</h4>
                                <p className="text-sm text-slate-500">Verified partners only.</p>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-2xl rounded-bl-[4rem] flex flex-col justify-center h-48">
                                <Heart className="w-10 h-10 mb-4 text-nepal-red" />
                                <h4 className="font-bold text-lg text-slate-900">Tailored For You</h4>
                                <p className="text-sm text-slate-500">Custom itineraries.</p>
                            </div>
                            <div className="bg-nepal-red text-white p-6 rounded-2xl rounded-tr-[4rem] flex flex-col justify-center h-48">
                                <Clock className="w-10 h-10 mb-4" />
                                <h4 className="font-bold text-lg">24/7 Support</h4>
                                <p className="text-sm opacity-80">Always here to help.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Newroad Travels?</h2>
                        <ul className="space-y-6">
                            {[
                                { title: "Personalized Trips", desc: "Your trip, your way. We craft experiences that match your dreams." },
                                { title: "Trusted Local Experts", desc: "Real guides, real experiences. Our team knows the hidden gems." },
                                { title: "Fair Prices", desc: "Great trips without overspending. Exclusive deals and value-packed offers." },
                                { title: "Trusted Partnerships", desc: "Reliable vendors and verified accommodations for your peace of mind." }
                            ].map((item, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                                        <p className="text-slate-600 text-sm">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Our Promise CTA */}
            <section className="bg-nepal-blue py-20 px-4 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Let’s Travel Together!</h2>
                    <p className="text-xl opacity-90 mb-10">Whether you're a solo explorer, a couple on a romantic escape, or a family seeking fun-filled adventures, Newroad Travels is your trusted companion on the road less traveled.</p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                            <span className="text-2xl">📞</span>
                            <span className="font-bold text-lg">+977 9856068470</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                            <span className="text-2xl">✉️</span>
                            <span className="font-bold text-lg">nrttour@gmail.com</span>
                        </div>
                    </div>

                    <button className="px-10 py-4 bg-nepal-red hover:bg-red-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-red-900/50 transition-all transform hover:-translate-y-1">
                        Contact Us Today
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;
