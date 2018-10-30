const router = require('express').Router()
const {List} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: {
        organizationId: req.user.organizationId
      }
    })
    res.json(lists)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const list = await List.create(req.body)
    await list.setOrganization(req.user.organizationId)
    res.json(list)
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

// WITHOUT ORGANIZATION ID CHECKS
// router.get('/', async (req, res, next) => {
//   try {
//     const lists = await List.findAll()
//     res.json(lists)
//   } catch (err) {
//     next(err)
//   }
// })
