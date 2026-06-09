const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth");

const {
  getTasks,
  addTask,
  startCleaning,
  finishCleaning
} =
require("../controllers/housekeepingController");

router.get(
  "/",
  auth,
  getTasks
);

router.post(
  "/",
  auth,
  addTask
);

router.put(
  "/start/:id",
  auth,
  startCleaning
);

router.put(
  "/finish/:id",
  auth,
  finishCleaning
);

module.exports = router;