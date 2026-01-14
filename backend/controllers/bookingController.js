const pool = require('../config/db');
const redisClient = require('../utils/redisClient');
const { v4: uuidv4 } = require('uuid');

// 1. HOLD SEATS (Deadlock Safe via Ordering & Atomic Redis Locks)
exports.holdSeats = async (req, res) => {
    const { tripId, seatIds, userId } = req.body;
    if (!seatIds || seatIds.length === 0) return res.status(400).json({ error: "No seats selected" });

    // DEADLOCK PREVENTION STRATEGY 1: RESOURCE ORDERING
    // Always lock resources in the same order (Ascending Seat ID)
    // This prevents Circular Wait conditions (e.g. A waits for B, B waits for A).
    const sortedSeatIds = [...seatIds].sort((a, b) => a - b);

    const holdToken = uuidv4();
    const ttlSeconds = 300; // 5 minutes
    const acquiredRedisKeys = [];

    try {
        // 1. Try to acquire distributed locks on Redis (Fast, Atomic)
        for (const seatId of sortedSeatIds) {
            const lockKey = `lock:trip:${tripId}:seat:${seatId}`;

            // SET key value NX (Only if Not Exists) EX ttl
            // This is an atomic operation.
            const acquired = await redisClient.set(lockKey, holdToken, {
                NX: true,
                EX: ttlSeconds
            });

            if (!acquired) {
                console.log(`Conflict detected for seat ${seatId}. Rolling back.`);
                throw new Error(`Seat ${seatId} is currently unavailable.`);
            }
            acquiredRedisKeys.push(lockKey);
        }

        // 2. If valid, persist the HOLD in Postgres for reliability/admin
        const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

        // We use a transaction here to batch insert holds
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            for (const seatId of sortedSeatIds) {
                await client.query(
                    `INSERT INTO seat_holds (trip_id, seat_id, user_id, hold_token, expires_at, status)
                 VALUES ($1, $2, $3, $4, $5, 'HELD')`,
                    [tripId, seatId, userId, holdToken, expiresAt]
                );
            }

            await client.query('COMMIT');
        } catch (dbErr) {
            await client.query('ROLLBACK');
            throw dbErr; // Re-throw to trigger Redis rollback
        }
        finally {
            client.release();
        }

        res.json({
            message: "Seats held successfully",
            holdToken,
            expiresAt,
            seats: sortedSeatIds
        });

    } catch (err) {
        // START ROLLBACK
        // If ANY seat fails to lock (or DB fails), release ALL locks acquired so far.
        // This ensures no partial holds (Atomicity).
        console.error("Hold failed, rolling back locks:", err.message);

        await Promise.all(acquiredRedisKeys.map(key => redisClient.del(key)));

        res.status(409).json({ error: err.message, type: 'SEAT_CONFLICT' });
    }
};

// 2. CONFIRM BOOKING (Finalize Payment)
exports.confirmBooking = async (req, res) => {
    const { holdToken, paymentId } = req.body; // paymentId from Stripe/Razorpay

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Validate Hold Token & Lock Rows (Pessimistic Locking in DB)
        // We select the holds FOR UPDATE to ensure no other process releases them concurrently
        const holdRes = await client.query(
            `SELECT * FROM seat_holds 
             WHERE hold_token = $1 AND status = 'HELD' 
             FOR UPDATE`,
            [holdToken]
        );

        if (holdRes.rows.length === 0) {
            throw new Error("Invalid or expired hold token");
        }

        // Check expiry explicitly (though Redis handles the lock, DB needs own check)
        const firstHold = holdRes.rows[0];
        if (new Date() > new Date(firstHold.expires_at)) {
            throw new Error("Hold expired");
        }

        const tripId = firstHold.trip_id;
        const userId = firstHold.user_id;

        // 2. Create Booking
        const bookingRes = await client.query(
            `INSERT INTO bookings (trip_id, user_id, status, total_amount)
             VALUES ($1, $2, 'CONFIRMED', 100.00) RETURNING id`, // Hardcoded price for demo
            [tripId, userId]
        );
        const bookingId = bookingRes.rows[0].id;

        // 3. Link Seats & Update Hold Status
        for (const row of holdRes.rows) {
            // Create booking_seats entry
            await client.query(
                `INSERT INTO booking_seats (booking_id, seat_id) VALUES ($1, $2)`,
                [bookingId, row.seat_id]
            );

            // Mark hold as BOOKED (or delete it, but keeping history is nice)
            await client.query(
                `UPDATE seat_holds SET status = 'BOOKED' WHERE id = $1`,
                [row.id]
            );
        }

        await client.query('COMMIT');

        // 4. Cleanup Redis (Optional: Let them expire, or delete eagerly)
        // Deleting eagerly frees up the "fast lock" for others immediately if checking Redis only.
        // But since status is now BOOKED in DB, subsequent checks will fail anyway.
        // We'll leave them to expire or delete them to be clean.
        const redisKeys = holdRes.rows.map(r => `lock:trip:${tripId}:seat:${r.seat_id}`);
        await Promise.all(redisKeys.map(k => redisClient.del(k)));

        res.json({ message: "Booking confirmed", bookingId });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Booking Confirmation Failed", err);
        res.status(400).json({ error: err.message });
    } finally {
        client.release();
    }
};
