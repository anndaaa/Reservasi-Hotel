const db = require("../config/db");

// GET DATA HOUSEKEEPING
exports.getTasks = (req, res) => {

  const sql = `
  SELECT
    h.id,
    r.room_number,
    u.fullname AS staff_name,
    h.cleaning_status,
    h.start_time,
    h.end_time,
    h.notes
  FROM housekeeping h
  JOIN rooms r
    ON h.room_id = r.id
  JOIN users u
    ON h.staff_id = u.id
  ORDER BY h.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ADD TASK
exports.addTask = (req, res) => {

  const {
    room_id,
    staff_id,
    notes
  } = req.body;

  db.query(
    `
    INSERT INTO housekeeping
    (
      room_id,
      staff_id,
      cleaning_status,
      start_time,
      notes
    )
    VALUES
    (
      ?,
      ?,
      'pending',
      NOW(),
      ?
    )
    `,
    [
      room_id,
      staff_id,
      notes
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      db.query(
        "UPDATE rooms SET status='cleaning' WHERE id=?",
        [room_id]
      );

      res.json({
        message: "Tugas cleaning berhasil dibuat"
      });

    }
  );

};

// START CLEANING
exports.startCleaning = (req, res) => {

  const id = req.params.id;

  db.query(
    `
    UPDATE housekeeping
    SET cleaning_status='in_progress'
    WHERE id=?
    `,
    [id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Cleaning dimulai"
      });

    }
  );

};

// FINISH CLEANING
exports.finishCleaning = (req, res) => {

  const id = req.params.id;

  db.query(
    `
    SELECT room_id
    FROM housekeeping
    WHERE id=?
    `,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      const roomId =
      result[0].room_id;

      db.query(
        `
        UPDATE housekeeping
        SET cleaning_status='completed',
            end_time=NOW()
        WHERE id=?
        `,
        [id]
      );

      db.query(
        `
        UPDATE rooms
        SET status='available'
        WHERE id=?
        `,
        [roomId]
      );

      res.json({
        message: "Cleaning selesai"
      });

    }
  );

};