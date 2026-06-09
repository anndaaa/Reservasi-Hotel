const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getGuests,
  addGuest,
  updateGuest,
  deleteGuest
} = require("../controllers/guestController");

router.get("/", auth, getGuests);

router.post("/", auth, addGuest);

router.put("/:id", auth, updateGuest);

router.delete("/:id", auth, deleteGuest);

module.exports = router;