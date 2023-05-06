const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Base Route
app.get("/", (req, res) => {
  res.send("Hello DEACOURSE sss!");
});

const productRouter = require("./routers/products.router");
const transactionRouter = require("./routers/transactions.router");
app.use("/products", productRouter);
app.use("/transactions", transactionRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
