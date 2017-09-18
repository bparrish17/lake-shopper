const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.post('/:productId', (req, res, next) => {
    let currentId = req.params.productId;
    req.body.productId = currentId;
    Review.create(req.body)
    .then(result => res.send(result))
    .catch(next);
  })
  
  // get all of the reviews for this product
  
  router.get('/:productId', (req, res, next) => {
    let currentId = req.params.productId;
    Review.findAll({ where: { productId: currentId } })
    .then(review => {
      if (review){
        res.json(review);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
  })