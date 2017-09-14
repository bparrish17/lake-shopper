const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

// TO DO: get by category

// get all products

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => {
      // console.log(req.session.cart);
      res.json(products)
    })
    .catch(next)
})

// get product by ID

router.get('/:id', (req, res, next) => {
  var currentId = req.params.id;
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

// add product

router.post('/', (req, res, next) => {
  //req.body.categoryId = 1;
  Product.create(req.body)
    .then(result => {
      return result.addCategory(req.body.categoryId)
    })
    .then(result => res.send(result))
    .catch(next);
});

// edit product

router.put('/:id', (req, res, next) => {
  var currentId = req.params.id;
  Product.findById(currentId)
    .then(product => {
      if (product) {
        return product.update(req.body, { returning: true })
      } else {
        res.sendStatus(404)
      }
    })
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next);
});

//REVIEWS
// post review on this product

router.post('/:id/reviews', (req, res, next) => {
  let currentId = req.params.id;
  req.body.productId = currentId;
  Review.create(req.body)
  .then(result => res.send(result))
  .catch(next);
})

// get all of the reviews for this product

router.get('/:id/reviews', (req, res, next) => {
  let currentId = req.params.id
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
