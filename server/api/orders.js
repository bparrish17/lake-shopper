const router = require('express').Router()
const {Order, User, Product} = require('../db/models')
const {isAdmin, isAuthenticated} = require('./gatekeepers');
module.exports = router

// ADMIN SIGNED IN
//
// // get all orders - admin only
//
router.get('/', isAdmin, (req, res, next) => {
  Order.findAll({include: [User, Product]})
    .then(orders => res.json(orders))
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


// get all orders - admin only
//
// router.get('/', (req, res, next) => {
//   Order.findAll({include: [User, Product]})
//     .then(orders => res.json(orders))
//     .catch(next)
// })
//
// // get order by ID
//
// router.get('/:id', (req, res, next) => {
//   var currentId = req.params.id;
//   Order.findAll({ where: { userId: currentId } })
//     .then(order => {
//       if (order){
//         res.json(order);
//       } else {
//         res.sendStatus(404);
//       }
//     })
//     .catch(next)
// })



// create order

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});
