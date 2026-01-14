import React from 'react';
import BusCard from '../components/BusCard';

const SearchResults = () => {
    // Use mock data for now, would fetch from API in real implementation
    const mockBuses = [
        { trip_id: 101, registration_number: 'TN-01-AB-1234', type: 'Scania Multi-Axle', price: 850, departure_time: '2024-03-25T21:00:00', arrival_time: '2024-03-26T05:00:00' },
        { trip_id: 102, registration_number: 'TN-01-XY-9876', type: 'Volvo A/C Sleeper', price: 1200, departure_time: '2024-03-25T22:30:00', arrival_time: '2024-03-26T06:30:00' },
        { trip_id: 103, registration_number: 'KA-56-ZZ-4567', type: 'Bharat Benz AC Seater', price: 600, departure_time: '2024-03-25T23:00:00', arrival_time: '2024-03-26T07:00:00' }
    ];

    return (
        <div className="pt-24 px-4 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Available Buses</h1>
            <div className="grid gap-4">
                {mockBuses.map((bus) => (
                    <BusCard key={bus.trip_id} bus={bus} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
