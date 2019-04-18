'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

// const CartOrders = db.model('cartOrders')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    // torquent@famesac.ca|Brian|Adkins|335-9800 Ipsum. Rd.|Elbląg|Warmińsko-mazurskie|Libya|commodo.tincidunt@accumsaninterdumlibero.com|40335
    User.create({
      email: 'aaa@email.com',
      password: '123',
      firstName: 'Brian',
      lastName: 'Adkins',
      street: '335-9800 Ipsum. Rd.',
      city: 'Elbląg',
      state: 'Warmińsko-mazurskie',
      zip: '40335',
      country: 'Libya'
    }),
    // aliquet@Donecvitaeerat.edu|Nasim|Holden|318-7649 Rhoncus St.|Cork|M|Haiti|magna.Nam@nascetur.net|7259

    User.create({
      email: 'aliquet@Donecvitaeerat.edu',
      password: '123',
      firstName: 'Nasim',
      lastName: 'Holden',
      street: '318-7649 Rhoncus St.',
      city: 'Cork',
      state: 'Cork',
      zip: '7259',
      country: 'Haiti'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Bee Cool Mug',
      description:
        'Show off your love for bees and how terribly important they are with this environmentally conscious, bee humor, eco-friendly, save the bees, bee pun coffee mug! Let the world know that it is super cool to care about the bees!',
      price: 2999,
      quantity: 15,
      imageUrl:
        'https://images.lookhuman.com/render/standard/6954620610410526/mug11oz-whi-z1-t-bee-cool.jpg'
    }),
    Product.create({
      name: 'No Fox Given',
      description:
        'Premium ceramic. 11oz capacity. Microwave and top-shelf dishwasher safe. Embedded image. Vacuum-form printed in U.S.A.',
      price: 3999,
      quantity: 10,
      imageUrl:
        'https://i.etsystatic.com/14092408/r/il/066b78/1172702973/il_570xN.1172702973_cssf.jpg'
    }),
    Product.create({
      name: 'PIKA-SHOOK COFFEE MUG',
      description: `Shocking, isn't it? Celebrate your love of memes, Pikachu, gaming and Pokemon with this surprised Pikachu design!`,
      price: 1299,
      quantity: 5,
      imageUrl: `https://images.lookhuman.com/render/standard/qCNKPOhKunxmmfff2Sv4EDpsu6M2X2ai/mug15oz-whi-z1-t-pika-shook.jpg`
    }),
    Product.create({
      name: 'Rainy Days Gallon',
      description: `I love rainy days. I love the sound. I love the smell. When it's overcast, I light candles. Rainy Days put me in the mood to stay home on the couch and curl up with a good book!`,
      price: 4300,
      quantity: 32,
      imageUrl: `https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbLNkVemXTnZdZ0Me-U7YpX4wNH9f-lAiV-Uz2DG-2Fxk_pX2femRuBKEF6kJpDcxToZ21pPzedJh5USGK0HTMPhCbO9pyF2SrJGyiEqOr7dv2-XxFQhT8&usqp=CAE`
    }),
    Product.create({
      name: 'Chalk Style Paint Silos District',
      description: `You don’t have to buy new furniture to get new furniture — simply revive your existing pieces with this Chalk-Style Paint from Magnolia Home by Joanna Gaines.`,
      price: 3200,
      quantity: 10,
      imageUrl: `https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSrSQD9RCHqYXBw6ns9OpGXkIRYkQv6cl2pO3KPO7xonY4rBzB5qpJ0N2ZM_dXmZ0VpsyJcz8ZXIEw1fhaGBE2aTuKuZHrUxmNkGR9BYs6KffKpS6NyFvC2&usqp=CAE`
    })
  ])

  // const cartOrders = await Promise.all([
  //   CartOrders.create({userId: 1, productId: 1}),
  //   CartOrders.create({userId: 1, productId: 2}),
  //   CartOrders.create({userId: 1, productId: 3}),
  //   CartOrders.create({userId: 2, productId: 1}),
  //   CartOrders.create({userId: 2, productId: 2}),
  //   CartOrders.create({userId: 2, productId: 3}),
  // ])

  console.log(`seeded ${users.length} users`)
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
