const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");

// GET
router.get("/", auth, getRooms);

// POST
router.post("/", auth, addRoom);

// UPDATE
router.put("/:id", auth, updateRoom);

// DELETE
router.delete("/:id", auth, deleteRoom);

module.exports = router;