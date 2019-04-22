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
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})

module.exports = CartOrders
