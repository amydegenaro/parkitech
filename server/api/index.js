const router = require('express').Router()
const {adminGate, orgMatchGate, loginGate} = require('../auth/utils')
module.exports = router

// ROUTERS
router.use('/users', adminGate, require('./users'))
router.use('/org/:orgId', orgMatchGate, require('./orgRouter'))
router.use('/weather', loginGate, require('./weather'))

// ERROR HANDLER
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
