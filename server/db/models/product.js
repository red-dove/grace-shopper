const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
<<<<<<< HEAD
    allowNull: false,
=======
    allowNull: false
    // get: function(price){
    //     let original = this.getDataValue(price);
    //     let result = original / 100;
    //     return result
    //   }
>>>>>>> a75664a403be859bf741b8b3e8c3a2107b1cb284
  },
  quantity: {
    type: Sequelize.INTEGER, 
    validate:{
      min:1
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
