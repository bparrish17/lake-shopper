const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
const {isAdmin} = require('./gatekeepers');
module.exports = router

// TO DO: get by category

// get all products

router.get('/', (req, res, next) => {
  Product.findAll({include: [Category]})
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
        res.json(product);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
})

// add product

// ALTERED FOR ADMIN - COMMENTED OUT FOR TESTING
//
router.post('/', isAdmin, (req, res, next) => {
  //req.body.categoryId = 1;
  Product.create(req.body)
    .then(result => {
      return result.addCategory(req.body.categoryId)
    })
    .then(result => res.send(result))
    .catch(next);
});

// router.post('/', (req, res, next) => {
//   //req.body.categoryId = 1;
//   Product.create(req.body)
//     .then(result => {
//       return result.addCategory(req.body.categoryId)
//     })
//     .then(result => res.send(result))
//     .catch(next);
// });

// edit product

router.put('/:id', isAdmin, (req, res, next) => {
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

// router.put('/:id', (req, res, next) => {
//   var currentId = req.params.id;
//   Product.findById(currentId)
//     .then(product => {
//       if (product) {
//         return product.update(req.body, { returning: true })
//       } else {
//         res.sendStatus(404)
//       }
//     })
//     .then(updatedProduct => res.json(updatedProduct))
//     .catch(next);
// });
