const router = require('express').Router()
module.exports = router

router.use('/lists', require('./lists'))
router.use('/tickets', require('./tickets'))
