const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(currentId)
    .then(product => {
      if (product){
        // req.session.cart.push(product);
        res.json(product);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
})