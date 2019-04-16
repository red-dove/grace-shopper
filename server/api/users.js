const router = require('express').Router()
const {User, CartOrders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get("/:id/orders", async (req,res,next) => {
  try {
    const userId = req.params.id;
    const userOrders = await CartOrders.findAll({
      where: {
        userId_fk: userId
      }
    })
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

// get specific user by id
router.get("/:id", async(req,res,next) => {
  try {
    const userId = req.params.id;
    const foundUser = await User.findOne({
      where: {
        id: Number(userId)
      },
      attributes: ["id", "email"]
    })
    res.json(foundUser);
  } catch (error) {
    next(error);
  }
})

router.post("/", async(req,res,next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const country = req.body.country;
    const createdUser = await User.create({firstName, lastName, email, password, street, city, state, zip, country});
    res.status(201).json(createdUser)
  } catch (error) {
    next(error)
  }
})
