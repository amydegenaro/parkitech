const router = require('express').Router()
module.exports = router

// TODO add logged in middleware to check

router.use('/users', require('./users'))
router.use('/lists', require('./lists'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
