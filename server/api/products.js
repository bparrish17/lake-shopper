const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// TO DO: get by category

// get all products

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

// get product by ID

router.get('/:id', (req, res, next) => {
  var currentId = req.params.id;

  Product.findById(currentId)
    .then(product => {
      if (product){
        res.json(product);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
})

// add product

router.post('/', function(req, res, next){
  Product.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});

// edit product

router.put('/:id', function(req, res, next){
  var currentId = req.params.id;

  Product.findById(currentId)
    .then(product => {
      if (product) {
        user.update(req.body, { returning: true })
      } else {
        res.sendStatus(404)
      }
    })
    .then(updatedProduct => res.json(updatedProduct[1]))
    .catch(next);
});
