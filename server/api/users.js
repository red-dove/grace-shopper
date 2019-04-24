const router = require('express').Router()
const {User, CartOrders, Product} = require('../db/models')
module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const userProductObjectArray = await CartOrders.findAll({
      where: {
        userId: userId,
        order: null
      },
      attributes: ['productId']
    })

    const arrayOfProductNumbers = userProductObjectArray.map(prod => {
      return prod.productId
    })

    const productsInCart = await Product.findAll({
      where: {
        id: arrayOfProductNumbers
      }
    })
    res.json(productsInCart)
  } catch (error) {
    next(error)
  }
})

// get specific user by id
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const foundUser = await User.findOne({
      where: {
        id: Number(userId)
      }
    })
    res.json(foundUser)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const userAllOrders = await CartOrders.findAll({
      where: {
        userId: userId
      }
    })
    res.json(userAllOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders/:productId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const productId = req.params.productId
    const userSingleOrder = await CartOrders.findOne({
      where: {
        userId: userId,
        productId: productId
      }
    })
    res.json(userSingleOrder)
  } catch (error) {
    next(error)
  }
})

router.post('/cart/checkoutguest', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const productId = req.body
    const postedItem = await CartOrders.create({userId, productId})
    res.json(postedItem)
  } catch (error) {
    next(error)
  }
})

router.put('/profile', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const user = await User.findOne({
      where: {
        id: userId
      }
    })

    const result = await user.update(req.body)
    res.json(result)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const cart = await CartOrders.findOne({
      where: {
        id: userId
      }
    })
    const result = await cart.update(req.body) // ({quantity:req.body.quantity} , {where: {id: req.session.passport.user}})
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/checkout', async (req, res, next) => {
  try {
    let num = await CartOrders.max('order')
    console.log(num)
    if (!num) {
      num = 1
    } else {
      num++
    }
    const userId = req.session.passport.user
    const cart = await CartOrders.update(
      {order: num},
      {
        where: {
          userId: userId,
          order: null
        }
      }
    )
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/cart/:productId', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const productId = req.params.productId
    await CartOrders.destroy({
      where: {
        userId,
        productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
