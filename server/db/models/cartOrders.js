const Sequelize = require('sequelize')
const db = require('../db')

const CartOrders = db.define('cartOrders', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  order: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = CartOrders
