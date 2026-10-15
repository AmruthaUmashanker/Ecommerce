const { Brand } = require("../model/Brand");
const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res)=>{
    
    const {userId} = req.params;

    try{
        const cartItems = await Cart.find({user: userId}).populate('user').populate('product').exec();
        res.status(201).json(cartItems);
    } catch (err){
        res.status(400).json(err);
    }
}

exports.addToCart = async (req, res)=>{
    
    // ye frontend se aayegi // 3 things quantity, product id, user id
    const cart = new Cart(req.body);
    try{
        const response = await cart.save();
        res.status(201).json(response);
    } catch (err){
        res.status(400).json(err);
    }
}