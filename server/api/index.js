const router = require('express').Router()
const {adminGate} = require('../auth/utils')
module.exports = router

// ROUTERS
router.use('/users', adminGate, require('./users'))
router.use('/lists', require('./lists'))
router.use('/tickets', require('./tickets'))
router.use('/weather', require('./weather'))

// ERROR HANDLER
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
