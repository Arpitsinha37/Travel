import React, { useState } from 'react';

const SeatMap = ({ seats, selectedSeats, onSeatClick }) => {
    // Group seats by rows or simply grid them. 
    // Assuming 'seats' is an array from API.
    // Mock layout: 2 columns, aisle, 2 columns.

    if (!seats || seats.length === 0) {
        return <div className="text-center text-gray-500">No seats available data.</div>;
    }

    // Helper to determine seat color
    const getSeatColor = (seat) => {
        if (seat.status === 'BOOKED') return 'bg-gray-600 cursor-not-allowed';
        if (seat.status === 'HELD') return 'bg-yellow-600 cursor-not-allowed'; // Or maybe show as booked
        if (selectedSeats.includes(seat.id)) return 'bg-green-500 text-white shadow-lg shadow-green-500/50';
        if (seat.is_ladies_seat) return 'bg-pink-900 border-pink-700 hover:bg-pink-800';
        return 'bg-white border-gray-300 hover:bg-gray-200 text-gray-800';
    };

    return (
        <div className="w-full max-w-sm mx-auto bg-gray-900 p-8 rounded-xl border border-gray-700 relative">
            <div className="w-full h-8 bg-gray-800 mb-8 rounded-sm text-center text-xs text-gray-500 flex items-center justify-center">Driver Cabin</div>

            <div className="grid grid-cols-4 gap-4">
                {seats.map((seat, index) => {
                    // Add aisle spacer after the 2nd seat in every row of 4
                    // This logic depends on real data structure, assuming simple list here mapped to grid
                    const isFullRow = index > 0 && index % 4 === 0;

                    return (
                        <button
                            key={seat.id}
                            disabled={seat.status !== 'AVAILABLE'}
                            onClick={() => onSeatClick(seat.id)}
                            className={`
                 w-10 h-10 rounded-md border text-xs font-bold transition-all transform duration-200
                 ${getSeatColor(seat)}
                 ${seat.status === 'AVAILABLE' ? 'hover:scale-110 active:scale-95' : ''}
               `}
                            title={`Seat ${seat.seat_number} - ${seat.status}`}
                        >
                            {seat.seat_number}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white rounded"></div> Available</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Selected</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-600 rounded"></div> Booked</div>
            </div>
        </div>
    );
};

export default SeatMap;
