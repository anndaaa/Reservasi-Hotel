const db = require("../config/db");

// GET PAYMENT
exports.getPayments = (req, res) => {

  const sql = `
  SELECT
    p.id,
    g.fullname,
    r.room_number,
    p.amount,
    p.payment_method,
    p.payment_status,
    p.payment_date
  FROM payments p
  JOIN bookings b
    ON p.booking_id = b.id
  JOIN guests g
    ON b.guest_id = g.id
  JOIN rooms r
    ON b.room_id = r.id
  ORDER BY p.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ADD PAYMENT
exports.addPayment = (req, res) => {

  const {
    booking_id,
    amount,
    payment_method
  } = req.body;

  db.query(
    `
    INSERT INTO payments
    (
      booking_id,
      amount,
      payment_method,
      payment_status,
      payment_date
    )
    VALUES
    (
      ?,
      ?,
      ?,
      'paid',
      NOW()
    )
    `,
    [
      booking_id,
      amount,
      payment_method
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Pembayaran berhasil"
      });

    }
  );

};