const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth");

const {
  getBookings,
  addBooking,
  checkIn,
  checkOut
} =
require("../controllers/bookingController");

router.get("/", auth, getBookings);

router.post("/", auth, addBooking);

router.put(
  "/checkin/:id",
  auth,
  checkIn
);

router.put(
  "/checkout/:id",
  auth,
  checkOut
);

module.exports = router;