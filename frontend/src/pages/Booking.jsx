import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';

// Helper to generate mock seats if API fails
const generateMockSeats = () => {
    return Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        seat_number: `${Math.floor(i / 4) + 1}${['A', 'B', 'C', 'D'][i % 4]}`,
        status: Math.random() > 0.7 ? 'BOOKED' : 'AVAILABLE',
        is_ladies_seat: i % 10 === 0
    }));
};

const Booking = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In real app: fetch(`/api/bus/${tripId}/seats`)
        setTimeout(() => {
            setSeats(generateMockSeats());
            setLoading(false);
        }, 1000);
    }, [tripId]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const handleProceed = async () => {
        if (selectedSeats.length === 0) return;

        // In real app, call Hold API here
        // const res = await fetch('/api/booking/hold', { ... });

        alert(`Requesting HOLD for seats: ${selectedSeats.join(', ')}. \n(Backend logic would acquire locks here)`);
        navigate('/account'); // Navigate to payment/success
    };

    return (
        <div className="pt-24 px-4 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-6">Select Seats for Trip {tripId}</h1>
                {loading ? (
                    <div className="bg-gray-800 p-8 rounded-lg min-h-[400px] flex items-center justify-center border border-gray-700 animate-pulse">
                        <p className="text-gray-400">Loading Seat Map...</p>
                    </div>
                ) : (
                    <SeatMap seats={seats} selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
                )}
            </div>

            <div className="w-full md:w-80">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 sticky top-32">
                    <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Booking Summary</h2>
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Selected Seats</span>
                            <span className="font-bold">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Price per seat</span>
                            <span>₹800</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-gray-700">
                            <span>Total</span>
                            <span>₹{selectedSeats.length * 800}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleProceed}
                        disabled={selectedSeats.length === 0}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded transition-all"
                    >
                        Proceed to Pay
                    </button>
                    <p className="text-xs text-center mt-2 text-gray-500">Seats held for 5 mins upon clicking proceed.</p>
                </div>
            </div>
        </div>
    );
};

export default Booking;
