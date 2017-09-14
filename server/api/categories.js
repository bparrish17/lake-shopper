const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Category.findAll()
      .then(categories => res.json(categories))
      .catch(next)
  })

router.get('/:id', (req, res, next) => {
    const currentId = req.params.id;


    Category.findById(currentId)
      .then(category => {
        if (category){
          res.json(category);
        } else {
          res.sendStatus(404);
        }
    })
    .catch(next)
})

//get all products within that category

router.get('/:categoryId/products', (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId)
    .then(category => {
        return category.getProducts()
    })
    .then(result => res.json(result))
    .catch(next)
})


router.post('/', (req, res, next) => {
    Category.create(req.body)
    .then(category => res.status(201).json(category)
    .catch(next))
})
 
router.put('/:id', (req, res, next) => {
    const currentId = req.params.id;
    Category.update(req.body, {where: {id: currentId, returning: true}})
    .then(category => res.json(category[1]))
    .catch(next)
})
   
router.delete('/:id', (req, res, next) => {
    const currentId = req.params.id;
    Category.destroy({where: {id: currentId}})
    .then(() => res.sendStatus(204))
})
    
