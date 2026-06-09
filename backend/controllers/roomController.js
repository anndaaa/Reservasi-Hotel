const db = require("../config/db");

// GET ALL ROOMS
exports.getRooms = (req, res) => {

  db.query(
    "SELECT * FROM rooms ORDER BY room_number",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

// ADD ROOM
exports.addRoom = (req, res) => {

  const {
    room_number,
    room_type,
    price,
    status
  } = req.body;

  db.query(
    `INSERT INTO rooms
    (room_number, room_type, price, status)
    VALUES (?, ?, ?, ?)`,
    [
      room_number,
      room_type,
      price,
      status
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Room berhasil ditambahkan"
      });

    }
  );

};

// UPDATE ROOM
exports.updateRoom = (req, res) => {

  const id = req.params.id;

  const {
    room_number,
    room_type,
    price,
    status
  } = req.body;

  db.query(
    `UPDATE rooms
     SET room_number = ?,
         room_type = ?,
         price = ?,
         status = ?
     WHERE id = ?`,
    [
      room_number,
      room_type,
      price,
      status,
      id
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Room berhasil diupdate"
      });

    }
  );

};

// DELETE ROOM
exports.deleteRoom = (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM rooms WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Room berhasil dihapus"
      });

    }
  );

};