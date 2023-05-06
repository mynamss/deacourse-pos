const db = require("../configs/connection");
const { randomOrderNumber } = require("../helpers/utils");

module.exports = {
  checkOut: async (req, res) => {
    const { total_price, paid_amount, products } = req.body;
    const insertTransactions = {
      total_price,
      paid_amount,
      no_order: randomOrderNumber(),
    };

    // insert ke table transactions
    const query = await db.query("INSERT INTO transactions set ?", [insertTransactions]).catch((err) => {
      return err;
    });

    // validasi jika query insert di atas berhasil dieksekusi
    if (!query.code) {
      // temporary variable
      let dataProducts = [];
      let idProducts = [];
      let updateStock = [];

      // data masing masing id product yang dikirim dari client
      products.map((item) => {
        dataProducts.push([item.id, insertTransactions.no_order, item.quantity]);
        idProducts.push([item.id]);
      });

      // insert ke table transaction_detail pakai dataProducts
      await db.query("INSERT INTO transaction_detail (product_id, no_order, quantity) values ?", [dataProducts]);

      const stockProduct = await db.query("SELECT stock from products where id in (?)", [idProducts]);

      console.log("DATA PRODUCT", dataProducts);
      // mapping stock product untuk di kurangi dengan quantity
      stockProduct.map((product, i) => {
        updateStock.push([dataProducts[i][0], product.stock - dataProducts[i][2]]);
        // updateStock.push([product.stock - dataProducts[i][2]]);
      });

      console.log("UPDATE STOCK", updateStock);
      // await db.query("UPDATE products SET stock = ? WHERE id = ?", [updateStock, idProducts]);
      await db.query("INSERT INTO products (id, stock) VALUES ? ON DUPLICATE KEY UPDATE stock = VALUES(stock)", [updateStock]);
    }

    // await db.query(`SELECT * FROM transactions WHERE no_order = '${order.no_order}'`);

    res.json({
      msg: "checkout success",
      // data: ,
    });
  },
};
