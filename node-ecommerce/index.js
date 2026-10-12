const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const productRouters = require("./routes/Products");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brand");
const usersRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
var morgan = require('morgan')

// middlewares
morgan(':method :url :status :res[content-length] - :response-time ms')
app.use(cors({
    exposedHeaders: ["X-Total-Count"]
}))
app.use(express.json())
app.use("/products", productRouters.router)
app.use("/brands", brandsRouter.router)
app.use("/categories", categoriesRouter.router)
app.use("/users", usersRouter.router)
app.use("/auth", authRouter.router)
app.use("/cart", cartRouter.router)

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eccomerce');
    console.log("connected")
}

app.get("/", (req, res)=>{
    res.json({status: "success"})
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("server started wow");
})