const router = require('express').Router()
const {User, CartOrders, Product} = require('../db/models')
module.exports = router

router.get('/cart', async (req, res, next) => {
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

router.get('/profile', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const foundUser = await User.findOne({
      where: {
        id: userId
      }
    })
    res.json(foundUser)
  } catch (error) {
    next(error)
  }
})

router.put('/profile', (req, res, next) => {
  User.findById(req.session.passport.user)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next)
})
