'use strict'

const db = require('../server/db')
const {User, List, Ticket} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'amy@email.com', password: '123'}),
    User.create({email: 'admin@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const maintenance = await List.create({name: 'Maintenance'})
  const horticulture = await List.create({name: 'Horticulture'})
  const events = await List.create({name: 'Events'})

  console.log(`seeded lists`)

  const sidewalk = await Ticket.create({
    name: 'Fix sidewalk',
    priority: 'high',
    description: 'The sidewalk is broken and a trip hazard.'
  })
  const tent = await Ticket.create({
    name: 'Set up tent',
    priority: 'medium',
    description: 'Supervise tent sent up for event this weekend.'
  })
  const bulbs = await Ticket.create({
    name: 'Plant tulip bulbs',
    priority: 'low',
    description: 'Plant 100 new tulip bulbs near the harborwalk for next year.'
  })

  console.log(`seeded tickets`)

  await Promise.all([
    sidewalk.setList(maintenance),
    tent.setList(events),
    bulbs.setList(horticulture)
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
