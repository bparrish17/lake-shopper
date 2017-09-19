const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // if(!req.user.dataValues.isAdmin) {
  //   const error = new Error('Why are you snooping? Go buy a boat!');
  //   error.status = 401
  //   return next(error);
  // }
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
  var currentId = req.params.id;

  User.findOne({ where: {id: currentId}})
    .then(user => res.json(user))
    .catch(next)
})

router.post('/', function(req, res, next){
  User.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});

router.put('/:id', function(req, res, next){
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

router.delete('/:id', function(req, res, next){
  var currentId = req.params.id;

  User.destroy({ where: { id: currentId }})
    .then(result => res.sendStatus(204))
    .catch(next);
});
