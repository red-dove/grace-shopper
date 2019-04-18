const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

//THIS CAN BE DELETED AS THIS ROUTE IS NOW HANDLED VIA POST TO /api/users
router.post('/signup', async (req, res, next) => {
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
      country})
      const user = await User.findOne({where: {email}})
      req.login(user, err => (err ? next(err) : res.json(createdUser)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
