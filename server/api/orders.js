const router = require('express').Router()
const {Order, User, Product} = require('../db/models')
module.exports = router

// get all orders - admin only
router.get('/', (req, res, next) => {
  // if(!req.isAuthenticated()) {
  //   const error = new Error('Get out!');
  //   error.status = 401
  //   return next(error);
  // }
  Order.findAll({include: [User, Product]})
    .then(orders => res.json(orders))
    .catch(next)
})

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

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});
