const express = require("express");
const { addToCart, fetchCartByUser, updateCart, deleteFromCart } = require("../controller/Cart");

const router = express.Router();

// /cart
router.post("/", addToCart)
.get("/:userId", fetchCartByUser)
.patch("/:id", updateCart)
.delete("/:id", deleteFromCart)

exports.router = router;