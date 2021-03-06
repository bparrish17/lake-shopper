const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    console.log('HERES YOUR CART', req.session.cart)
    res.json(req.session.cart);
})

router.post('/:productId', (req, res, next) => {
    let productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
          if (product){
            let isAlreadyInCart = false;
            let thisItem;
            for(let i=0; i<req.session.cart.length; i++) {
                if(req.session.cart[i].id === product.id) {
                    isAlreadyInCart = true;
                    thisItem = i;
                }
            }
            if(isAlreadyInCart) {
                req.session.cart[thisItem].cartQuantity++;

            } else {
                product.dataValues.cartQuantity = 1;
                req.session.cart.push(product);
            }
            res.json(req.session.cart);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(next)
})

router.delete('/', (req, res, next) => {
    console.log('***req.session.cart', req.session.cart)
    req.session.cart = [];
    console.log('***empty cart?', req.session.cart)
    res.json(req.session.cart);
})

router.delete('/:productId', (req, res, next) => {
    let productId = Number(req.params.productId);
    let cart = Array.prototype.slice.call(req.session.cart);
    let newCart = [];
    for(var i=0; i<cart.length; i++) {
      if(cart[i].id !== productId) {
        newCart.push(cart.slice(i,i+1)[0]);
      }
    }
    req.session.cart = newCart;
    res.json(req.session.cart);
})

router.put('/:productId', (req, res, next) => {
    let productId = Number(req.params.productId);
    let newQuantity = Number(req.body.newQuantity);
    // Product.findById(productId)
    // .then(product => {
    //     if(product.dataValues.quantity < newQuantity) {
    //         res.sendStatus(404);
    //     } else {
    let cart = Array.prototype.slice.call(req.session.cart);
    for(var i=0; i<cart.length; i++) {
        if(cart[i].id === productId) {
            if(cart[i].quantity < newQuantity) res.json(req.session.cart);
            else cart[i].cartQuantity = newQuantity;
        }
    }
    req.session.cart = cart
    res.json(req.session.cart);
    // .catch(next)
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

//BACKUP OF THE POST REQUEST DUE TO MERGE CONFLICT ISSUES
// Product.findById(productId)
    //     .then(product => {
    //       if (product){
    //         let isAlreadyInCart = false;
    //         let thisItem;
    //         for(let i=0; i<req.session.cart.length; i++) {
    //             if(req.session.cart[i].id === product.id) {
    //                 isAlreadyInCart = true;
    //                 thisItem = i;
    //             }
    //         }
    //         if(isAlreadyInCart) {
    //             req.session.cart[thisItem].cartQuantity++;

    //         } else {
    //             product.dataValues.cartQuantity = 1;
    //             req.session.cart.push(product);
    //         }
    //         res.json(req.session.cart);
    //       } else {
    //         res.sendStatus(404);
    //       }
    //     })
    //     .catch(next)