const router = require('express').Router()
const {List} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const lists = await List.findAll()
    res.json(lists)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/tickets', async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id)
    const tickets = await list.getTickets()
    res.json(tickets)
  } catch (err) {
    next(err)
  }
})
