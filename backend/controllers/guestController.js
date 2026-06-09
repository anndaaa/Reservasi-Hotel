const db = require("../config/db");

// GET ALL GUESTS
exports.getGuests = (req, res) => {

  db.query(
    "SELECT * FROM guests ORDER BY id DESC",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

// ADD GUEST
exports.addGuest = (req, res) => {

  const {
    fullname,
    phone,
    email
  } = req.body;

  db.query(
    `INSERT INTO guests
    (fullname, phone, email)
    VALUES (?, ?, ?)`,
    [
      fullname,
      phone,
      email
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Tamu berhasil ditambahkan"
      });

    }
  );

};

// UPDATE GUEST
exports.updateGuest = (req, res) => {

  const id = req.params.id;

  const {
    fullname,
    phone,
    email
  } = req.body;

  db.query(
    `UPDATE guests
     SET fullname=?,
         phone=?,
         email=?
     WHERE id=?`,
    [
      fullname,
      phone,
      email,
      id
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Tamu berhasil diupdate"
      });

    }
  );

};

// DELETE GUEST
exports.deleteGuest = (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM guests WHERE id=?",
    [id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Tamu berhasil dihapus"
      });

    }
  );

};