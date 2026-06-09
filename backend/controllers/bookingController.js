const db = require("../config/db");

// GET BOOKING
exports.getBookings = (req, res) => {

  const sql = `
    SELECT
      b.id,
      g.fullname,
      r.room_number,
      b.check_in,
      b.check_out,
      b.booking_status
    FROM bookings b
    JOIN guests g
      ON b.guest_id = g.id
    JOIN rooms r
      ON b.room_id = r.id
    ORDER BY b.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ADD BOOKING
exports.addBooking = (req, res) => {

  const {
    guest_id,
    room_id,
    check_in,
    check_out
  } = req.body;

  db.query(
    `INSERT INTO bookings
    (
      guest_id,
      room_id,
      check_in,
      check_out,
      booking_status
    )
    VALUES(?,?,?,?,?)`,
    [
      guest_id,
      room_id,
      check_in,
      check_out,
      "confirmed"
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      db.query(
        "UPDATE rooms SET status='occupied' WHERE id=?",
        [room_id]
      );

      res.json({
        message: "Booking berhasil"
      });

    }
  );

};

// CHECK IN
exports.checkIn = (req, res) => {

  const id = req.params.id;

  db.query(
    `UPDATE bookings
     SET booking_status='checkedin'
     WHERE id=?`,
    [id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Check In berhasil"
      });

    }
  );

};

// CHECK OUT
exports.checkOut = (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT room_id FROM bookings WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Booking tidak ditemukan"
        });
      }

      const roomId = result[0].room_id;

      db.query(
        `UPDATE bookings
         SET booking_status='checkedout'
         WHERE id=?`,
        [id],
        (err) => {

          if (err) {
            return res.status(500).json(err);
          }

          db.query(
            `UPDATE rooms
             SET status='available'
             WHERE id=?`,
            [roomId],
            (err) => {

              if (err) {
                return res.status(500).json(err);
              }

              res.json({
                message: "Check Out berhasil"
              });

            }
          );

        }
      );

    }
  );

};