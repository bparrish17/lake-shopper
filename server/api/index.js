const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

// additions

router.use('/cart', require('./cart'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/categories', require('./categories'))

// additions

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
