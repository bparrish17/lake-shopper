const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

// get review by ID

router.get('/:id', (req, res, next) => {
  var currentId = req.params.id;

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
