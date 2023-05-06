const express = require("express");
const transactions = express.Router();

const { checkOut } = require('../controllers/transactions.controller.js')

transactions.route('/').post(checkOut)

module.exports = transactions