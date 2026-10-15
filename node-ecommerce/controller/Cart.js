
const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const cartItems = await Cart.find({ user: userId })
            .populate("user")
            .populate("product")
            .exec();

        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        const response = await cart.save();

        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCart = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Cart.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!response) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Cart.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
