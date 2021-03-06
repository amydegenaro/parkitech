'use strict'

const db = require('../server/db')
const {User, List, Ticket, Organization} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'amy@email.com', password: '123'}),
    User.create({email: 'guest@email.com', password: '123'}),
    User.create({email: 'admin@email.com', password: '321', isAdmin: true})
  ])

  console.log(`seeded ${users.length} users`)

  const greenway = await Organization.create({name: 'Greenway'})
  const testOrg = await Organization.create({name: 'Test Org'})

  await Promise.all([
    greenway.setUsers(users)
  ])

  console.log(`seeded organizations`)

  const maintenance = await List.create({name: 'Maintenance'})
  const horticulture = await List.create({name: 'Horticulture'})
  const rangers = await List.create({name: 'Park Rangers'})
  const events = await List.create({name: 'Events'})

  const test1 = await List.create({name: 'Test One'})
  const test2 = await List.create({name: 'Test Two'})

  await Promise.all([
    greenway.setLists([maintenance, horticulture, rangers, events]),
    testOrg.setLists([test1, test2])
  ])

  console.log(`seeded lists`)

  const swings = await Ticket.create({
    name: 'Fix swinging benches',
    status: 'assigned',
    priority: 'medium',
    description: 'The swinging benches in the North End are broken.',
    latitude: 42.362132,
    longitude: -71.055384
  })
  const tent = await Ticket.create({
    name: 'Set up Gala tent',
    status: 'closed',
    priority: 'medium',
    description: 'Supervise tent set-up for annual Gala this weekend.',
    latitude: 42.356949,
    longitude: -71.051221
  })
  const bulbs = await Ticket.create({
    name: 'Plant daffodil bulbs',
    status: 'assigned',
    priority: 'low',
    description: 'Plant 100 new daffodil bulbs for next year.',
    latitude: 42.35527,
    longitude: -71.051362
  })
  const art = await Ticket.create({
    name: 'Install new public art',
    status: 'closed',
    priority: 'high',
    description:
      'Install new art exhibit in Chinatown with Public Art department',
    latitude: 42.352261,
    longitude: -71.058633
  })
  const cruise = await Ticket.create({
    name: 'Greet cruise ship visitors',
    status: 'open',
    priority: 'medium',
    description:
      'A lot of cruise ships are coming in this week - be around to help guide and greet visitors.',
    latitude: 42.356466,
    longitude: -71.050945
  })

  const hardscape = await Ticket.create({
    name: 'Pressure Wash Hardscape',
    status: 'open',
    priority: 'medium',
    description:
      'Graffiti needs to be removed after FIGMENT festival, SE corner of P22',
    latitude: 42.352853,
    longitude: -71.055447
  })

  const pollinator = await Ticket.create({
    name: 'Add Pollinator Habitat',
    status: 'open',
    priority: 'high',
    description: 'More bees please!',
    latitude: 42.361202,
    longitude: -71.054123
  })

  console.log(`seeded tickets`)

  await Promise.all([
    swings.setList(maintenance),
    art.setList(maintenance),
    tent.setList(events),
    bulbs.setList(horticulture),
    cruise.setList(rangers),
    hardscape.setList(maintenance),
    pollinator.setList(horticulture)
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
