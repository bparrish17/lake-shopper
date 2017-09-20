const router = require('express').Router()
const {OrderCart, Order} = require('../db/models')
const {isAdmin, isAuthenticated} = require('./gatekeepers');
module.exports = router

// get all orderCarts - admin only

router.get('/', isAdmin, (req, res, next) => {
  OrderCart.findAll(({include: [Order]}))
    .then(orderCarts => res.json(orderCarts))
    .catch(next)
})

// get order by ID

router.get('/:id', isAuthenticated, (req, res, next) => {
  var currentId = req.params.id;
  if(!req.user.userId === currentId) {
    const error = new Error('This order does not belong to the currently logged in user');
    error.status = 401
    return next(error);
  }
  OrderCart.findAll({ where: { userId: currentId } })
    .then(orderCart => {
      if (orderCart){
        res.json(order);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
})



// create orderCart

router.post('/', (req, res, next) => {
  console.log('req.body', req.body)
  OrderCart.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});