const express = require("express");

const router = express.Router();

const db = require("../config/db");

// TOTAL ROOM
router.get("/rooms", (req, res) => {

  db.query(
    "SELECT COUNT(*) AS total FROM rooms",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});

// TOTAL GUEST
router.get("/guests", (req, res) => {

  db.query(
    "SELECT COUNT(*) AS total FROM guests",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});

// TOTAL BOOKING
router.get("/bookings", (req, res) => {

  db.query(
    "SELECT COUNT(*) AS total FROM bookings",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});

// TOTAL REVENUE
router.get("/revenue", (req, res) => {

  db.query(
    "SELECT SUM(amount) AS total FROM payments",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});

// STATUS ROOM
router.get("/room-status", (req, res) => {

  db.query(
    `
    SELECT
      status,
      COUNT(*) AS total
    FROM rooms
    GROUP BY status
    `,
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

module.exports = router;