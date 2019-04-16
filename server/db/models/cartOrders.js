const Sequelize = require('sequelize')
const db = require('../db')

const CartOrders = db.define('cartOrders', {
  order: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = CartOrders
