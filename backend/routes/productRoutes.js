const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById , createProduct } = require("../controller/productController");

//@desc post a product from DB
//@route GET /api/products/create
router.post("/create", createProduct, (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
});

//@desc GET all product from DB
//@route GET /api/products
router.get("/", getAllProducts, (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
});

//@desc GET a product by id from DB
//@route GET /api/products/:id
router.get("/:id", getProductById);

module.exports = router;