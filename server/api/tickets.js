const router = require('express').Router()
const {Ticket, List} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll()
    res.json(tickets)
  } catch (err) {
    next(err)
  }
})

router.post('/list/:listId', async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.listId)
    const ticket = await Ticket.create(req.body)
    await ticket.setList(list)
    res.json(ticket)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/tags', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id)
    const tags = await ticket.getTags()
    res.json(tags)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id)
    res.json(ticket)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id)
    const list = await List.findByPk(req.body.listId)
    const updatedTicket = await ticket.update(req.body.ticket)
    // await updatedTicket.removeList()
    await updatedTicket.setList(list)
    res.json(updatedTicket)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id)
    await ticket.destroy()
    res.json('Ticket deleted')
  } catch (err) {
    next(err)
  }
})
