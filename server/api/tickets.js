const router = require('express').Router()
const {Ticket} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll()
    res.json(tickets)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/tags', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    const tags = await ticket.getTags()
    res.json(tags)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    res.json(ticket)
  } catch (err) {
    next(err)
  }
})
