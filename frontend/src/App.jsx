import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import Account from './pages/Account';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Location from './pages/Location';
import Rentals from './pages/Rentals';
import { useLenis } from './hooks/useLenis';

function AppContent() {
    useLenis(); // Initialize smooth scrolling

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/booking/:tripId" element={<Booking />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/rentals" element={<Rentals />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
