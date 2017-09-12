const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// get all orders


// get order by ID

router.get('/:id', (req, res, next) => {
  var currentId = req.params.id;

  Order.findAll({ where: { userId: currentId } })
    .then(order => {
      if (order){
        res.json(order);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
})

// create order

router.post('/', function(req, res, next){
  Order.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});
