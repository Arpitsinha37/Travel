import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EsewaLogo from '../assets/photos/esewa.png';
import KhaltiLogo from '../assets/photos/khalti.png';
import ImePayLogo from '../assets/photos/imepay.png';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-8 relative overflow-hidden">
            {/* Cultural Silhouette Top Border (Inverted) */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)" }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-nepal-red rounded-lg flex items-center justify-center text-white font-bold text-2xl font-serif">
                                N
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-serif">New Road</h3>
                                <p className="text-xs text-nepal-blue uppercase tracking-widest font-semibold">Travels</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Experience the beauty of Nepal with the most trusted travel partner.
                            From the Himalayas to the Terai, we ensure your journey is safe, comfortable, and memorable.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-nepal-red transition-colors text-slate-300 hover:text-white">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-nepal-red rounded-full"></span>
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About Us", path: "/about" },
                                { name: "Our Services", path: "/rentals" },
                                { name: "Tour Packages", path: "/" },
                                { name: "Contact Us", path: "/location" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="text-slate-400 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                                        <ArrowRight className="w-3 h-3 text-nepal-red opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Associated With & Payments */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-nepal-blue rounded-full"></span>
                            Associated With
                        </h4>
                        <div className="flex gap-2 mb-8">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                                    <span className="text-[10px] text-slate-500 font-bold">Logo</span>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                            Payment Partners
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white rounded-lg p-1 w-20 h-10 flex items-center justify-center">
                                <img src={EsewaLogo} alt="eSewa" className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="bg-white rounded-lg p-1 w-20 h-10 flex items-center justify-center">
                                <img src={KhaltiLogo} alt="Khalti" className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="bg-white rounded-lg p-1 w-20 h-10 flex items-center justify-center">
                                <img src={ImePayLogo} alt="IME Pay" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-nepal-red rounded-full"></span>
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-nepal-red shrink-0 mt-1" />
                                <span className="text-slate-400 text-sm">Tourist Bus Park, Sorhakhutte,<br />Kathmandu, Nepal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-nepal-red shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-sm">+977 1 4XXXXXX</span>
                                    <span className="text-slate-400 text-sm">+977 9856068470</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-nepal-red shrink-0" />
                                <span className="text-slate-400 text-sm">info@newroadtravels.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        Copyright © 2026 <span className="text-white font-bold">New Road Travels & Tours</span>. All Rights Reserved.
                    </p>
                    <p className="text-slate-500 text-xs font-medium">
                        Crafted By: <a href="mailto:contact@adfusionepal.com" className="font-black text-white hover:text-nepal-red transition-colors ml-1 uppercase tracking-wide">Adfusion Nepal Pvt. Ltd</a>
                    </p>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-nepal-red/5 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>
        </footer>
    );
};

export default Footer;
