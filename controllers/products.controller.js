const db = require("../configs/connection");

module.exports = {
  getProducts: async (req, res) => {
    const productList = await db.query("SELECT * FROM products");
    console.log("get products");
    res.json(productList);
  },

  addProduct: async (req, res) => {
    const { name, price, stock } = req.body;
    const dataProduct = {
      name,
      price,
      stock,
    };
    const query = await db.query("INSERT INTO products SET ?", [dataProduct]);
    if (!query.affectedRows) return "Error inserting product";
    res.send("product created");
  },
};
