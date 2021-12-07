const router = require('express').Router()
const {List, Task} = require('../db/models')
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
    const list = await List.findByPk(req.params.id)
    const tickets = await list.getTickets()
    res.json(tickets)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.id)
    const listTasks = await list.getTickets()
    if (listTasks.length > 0) {
      res.sendStatus(403)
    } else {
      await list.destroy()
      res.sendStatus(200)
    }
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
