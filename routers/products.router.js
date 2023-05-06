const express = require("express");
const products = express.Router();

// controller
const { getProducts, addProduct } = require("../controllers/products.controller");

products.route("/").get(getProducts);
products.route("/").post(addProduct);


module.exports = products;
