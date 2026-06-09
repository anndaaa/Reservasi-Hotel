const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth");

const {
  getPayments,
  addPayment
} =
require("../controllers/paymentController");

router.get(
  "/",
  auth,
  getPayments
);

router.post(
  "/",
  auth,
  addPayment
);

module.exports = router;