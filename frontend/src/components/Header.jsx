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
        { name: 'Home', icon: Ticket, path: '/' },
        { name: 'Rental Services', icon: Ticket, path: '/rentals' },
        { name: 'About Us', icon: UserCircle2, path: '/about' },
        { name: 'Location', icon: Headphones, path: '/location' },
        { name: 'Testimonials', icon: Percent, path: '/testimonials' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 top-0 transition-all duration-300 border-b border-transparent ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-slate-200'
                : 'bg-white/80 backdrop-blur-sm py-4 border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-nepal-red p-2 rounded-lg transform -rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-md">
                            <span className="text-white font-black text-xl font-serif">N</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none group-hover:text-nepal-red transition-colors font-serif">
                                New Road
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-nepal-blue uppercase leading-none mt-1">
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
                                className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-nepal-red transition-colors group"
                            >
                                <link.icon className="w-4 h-4 text-slate-400 group-hover:text-nepal-red transition-colors" />
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
                                    <div className="w-9 h-9 rounded-full bg-red-100 text-nepal-red flex items-center justify-center font-bold">
                                        {user.displayName ? user.displayName[0] : 'U'}
                                    </div>
                                )}
                                <button onClick={handleLogout} className="text-slate-500 hover:text-nepal-red transition-colors" title="Logout">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex items-center space-x-2 py-2 px-6 bg-[#DC143C] hover:bg-red-800 text-white rounded-md font-bold transition-all shadow-lg shadow-red-900/10"
                            >
                                <UserCircle2 className="w-5 h-5" />
                                <span>Login</span>
                            </button>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-900 focus:outline-none">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl absolute top-full left-0 w-full border-t border-gray-100">
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
                                className="flex items-center space-x-3 text-base font-medium text-slate-700 hover:text-nepal-red hover:bg-red-50 px-4 py-3 rounded-md transition-all"
                            >
                                <link.icon className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                className="w-full flex items-center space-x-3 text-base font-medium text-nepal-red hover:bg-red-50 px-4 py-3 rounded-md transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                                className="w-full flex items-center justify-center space-x-2 mt-4 py-3 bg-nepal-red text-white rounded-md font-bold"
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
