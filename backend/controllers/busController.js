const pool = require('../config/db');

// Search Buses
exports.searchBuses = async (req, res) => {
    const { source, destination, date } = req.query;
    try {
        const query = `
      SELECT t.id as trip_id, b.registration_number, b.type, t.departure_time, t.arrival_time, t.price
      FROM trips t
      JOIN buses b ON t.bus_id = b.id
      WHERE t.source = $1 AND t.destination = $2
      ORDER BY t.departure_time
    `;
        const result = await pool.query(query, [source, destination]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Seat Layout & Status
exports.getTripSeats = async (req, res) => {
    const { tripId } = req.params;
    try {
        // 1. Get all static seats
        const seatsQuery = `
      SELECT s.id, s.seat_number, s.is_ladies_seat
      FROM seats s
      JOIN trips t ON s.bus_id = t.bus_id
      WHERE t.id = $1
      ORDER BY s.id
    `;
        const seatsResult = await pool.query(seatsQuery, [tripId]);

        // 2. Get status (Held/Booked)
        // We check both the persistent table and Redis if needed, but for simplicity relying on DB 'seat_holds' and 'bookings' is robust if we sync Redis->DB key events.
        // However, for high-concurrency, we might query Redis directly or just use the DB tables if we are persisting holds there.

        const holdsQuery = `
      SELECT seat_id, status FROM seat_holds 
      WHERE trip_id = $1 AND (expires_at > NOW() OR status = 'BOOKED')
    `;
        // Note: status 'BOOKED' in seat_holds might be redundant if we have 'bookings' table, but it's good for quick status cache.
        // Actually, let's join bookings too.

        // Simplified status check:
        // A seat is unavailable if:
        // 1. It is in 'bookings' for this trip (status CONFIRMED)
        // 2. OR It is in 'seat_holds' for this trip (status HELD) AND expires_at > NOW()

        const statusQuery = `
        SELECT seat_id, 'BOOKED' as status FROM booking_seats bs 
        JOIN bookings b ON bs.booking_id = b.id 
        WHERE b.trip_id = $1 AND b.status = 'CONFIRMED'
        UNION
        SELECT seat_id, 'HELD' as status FROM seat_holds 
        WHERE trip_id = $1 AND status = 'HELD' AND expires_at > NOW()
    `;

        const statusResult = await pool.query(statusQuery, [tripId]);
        const statusMap = {};
        statusResult.rows.forEach(row => {
            statusMap[row.seat_id] = row.status;
        });

        const seats = seatsResult.rows.map(seat => ({
            ...seat,
            status: statusMap[seat.id] || 'AVAILABLE'
        }));

        res.json({ seats });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
