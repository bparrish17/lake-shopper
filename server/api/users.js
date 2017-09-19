const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, isAuthenticated} = require('./gatekeepers');
const {Order, Review} = require('../db/models')
module.exports = router

router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// additions

// create users

router.get('/:id', (req, res, next) => {
  let currentId = Number(req.params.id);
  let userId = Number(req.user.dataValues.id);
  let result = [];
  //this is absolutely atrocious, the but the includes request don't work the other way
  //because sequelize
  if(userId === currentId) {
    User.findById(userId)
    .then(user => {
      result.push(user);
    })
    .then(
    Review.findAll({where: {userId}})
    .then(reviews => {
      result.push(reviews);
    })
    .then(
    Order.findAll({where: {userId}})
    .then(orders => {
      result.push(orders);
      res.json(result)
    })
    )
    .catch(next))
  } else {
    const error = new Error('Cannot View Other User Pages');
    error.status = 401
    return next(error);
  }
})

router.post('/', function(req, res, next){
  User.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});

router.put('/:id', isAdmin, function(req, res, next){
  var currentId = req.params.id;
  User.findById(currentId)
    .then(user => {
      if (user) {
        return user.update(req.body, { returning: true })
      } else {
        res.sendStatus(404)
      }
    })
    .then(updatedUser => {
      console.log('updatedUser', updatedUser)
      res.json(updatedUser)
    })
    .catch(next);
});

router.delete('/:id', isAdmin, function(req, res, next){
  var currentId = req.params.id;

  User.destroy({ where: { id: currentId }})
    .then(result => res.sendStatus(204))
    .catch(next);
});
