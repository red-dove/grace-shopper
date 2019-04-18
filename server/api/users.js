const router = require('express').Router()
const {User, CartOrders, Product} = require('../db/models')
module.exports = router

// REMOVED FOR SECURITY REASONS
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

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
      },
      attributes: ['id', 'email']
    })
    res.json(foundUser)
  } catch (error) {
    next(error)
  }
})


router.post('/', async (req, res, next) => {

  try {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const street = req.body.street
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const country = req.body.country
    const createdUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      country
    })
    res.status(201).json(createdUser)
  } catch (error) {
    next(error)
  }
})
