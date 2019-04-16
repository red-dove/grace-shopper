const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get("/", async(req,res,next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async(req,res,next) => {
  try {
    const productId = req.params.id;
    const singleProduct = await Product.findOne({
    where: {
      id: Number(productId)
    }
  })
  res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})



