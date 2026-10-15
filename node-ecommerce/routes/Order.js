const express = require("express");
const { createOrder, fetchAllOrders, updateOrder } = require("../controller/Order");

const router = express.Router();

router
  .post("/", createOrder)
  .get("/", fetchAllOrders)
  .patch("/:id", updateOrder);

exports.router = router;