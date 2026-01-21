import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Percent, Headphones, UserCircle2, Menu, X, LogOut } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Sync with backend (Optional: Send token to verify/store user)
                try {
                    const token = await currentUser.getIdToken();
                    // await axios.post('http://localhost:5000/api/auth/google', { token });
                    console.log("User synced:", currentUser.displayName);
                } catch (error) {
                    console.error("Sync error:", error);
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        }
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navLinks = [
        { name: 'Offers', icon: Percent, path: '/offers' },
        { name: 'Track Ticket', icon: Ticket, path: '/track' },
        { name: 'Need Help?', icon: Headphones, path: '/help' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 top-0 transition-all duration-300 border-b border-transparent ${isScrolled
                ? 'bg-white/70 backdrop-blur-lg shadow-sm py-2 border-white/20'
                : 'bg-white/10 backdrop-blur-sm py-4 border-white/10'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-tr from-rose-600 to-orange-500 p-2 rounded-xl transform -rotate-6 group-hover:rotate-0 transition-all duration-300 shadow-lg shadow-rose-500/30 border border-white/20">
                            <span className="text-white font-black text-xl tracking-tighter font-serif italic">N</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-slate-800 leading-none group-hover:text-rose-600 transition-colors">
                                New Road
                            </span>
                            <span className="text-[10px] font-extrabold tracking-[0.2em] text-orange-500 uppercase leading-none mt-0.5">
                                Travels
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors group"
                            >
                                <link.icon className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors" />
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        {/* Auth Button */}
                        {user ? (
                            <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                                <span className="text-sm font-semibold text-slate-700 hidden lg:block">Hi, {user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-full border border-slate-300" />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                                        {user.displayName ? user.displayName[0] : 'U'}
                                    </div>
                                )}
                                <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 transition-colors" title="Logout">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex items-center space-x-2 py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-red-500/30"
                            >
                                <UserCircle2 className="w-5 h-5" />
                                <span>Login</span>
                            </button>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 focus:outline-none">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl absolute top-full left-0 w-full rounded-b-2xl border-t border-gray-100">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {user && (
                            <div className="flex items-center space-x-3 px-4 py-4 border-b border-gray-100 mb-2">
                                {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />}
                                <div>
                                    <p className="font-bold text-slate-800">{user.displayName || 'User'}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                            </div>
                        )}

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center space-x-3 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition-all"
                            >
                                <link.icon className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                className="w-full flex items-center space-x-3 text-base font-medium text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                                className="w-full flex items-center justify-center space-x-2 mt-4 py-3 bg-red-600 text-white rounded-xl font-bold"
                            >
                                <UserCircle2 className="w-5 h-5" />
                                <span>Login / Sign Up</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
