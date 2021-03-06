const User = require('./user')
const Product = require('./product')
const CartOrders = require('./cartOrders')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Product, {through: 'cartOrders'})
Product.belongsToMany(User, {through: 'cartOrders'})
// CartOrders.belongsTo(User)
// User.hasMany(CartOrders)
// CartOrders.hasMany(Product)
// Product.belongsTo(CartOrders)



/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  CartOrders
}
