const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    console.log('HERES YOUR CART', req.session.cart)
    res.json(req.session.cart);
})


// router.get('/:productId', (req, res, next) => {
//     const productId = req.params.productId;
//     Product.findById(productId)
//     .then(product => {
//       if (product){
//         req.session.cart.push(product);
//         res.json(req.session.cart);
//       } else {
//         res.sendStatus(404);
//       }
//     })
//     .catch(next)
// })