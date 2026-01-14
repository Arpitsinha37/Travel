import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="fixed w-full z-50 top-0 start-0 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-900 tracking-tight">
                        Red<span className="text-red-600">Bus</span>
                    </span>
                </Link>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-slate-700 hover:text-red-600 rounded md:bg-transparent md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/account" className="block py-2 px-3 text-slate-700 rounded hover:text-red-600 md:p-0">Account</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
