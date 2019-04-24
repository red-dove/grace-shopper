'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'guest@email.com',
      password: 'guest',
      firstName: 'guestFirst',
      lastName: 'guestLast',
      street: 'guestStree',
      city: 'guestCity',
      state: 'guestState',
      zip: 'guestZip',
      country: 'guestCountry'
    }),
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
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Good Vibes Only -…',
      description:
        'Good Vibes Only - positive quote mug, coworker mug, funny alien mug, gift for friends, inspirational mug, gag mug, secret Santa gift',
      price: 1299,
      quantity: 9,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/2hFK3S9Bdnh2nR5.jpg'
    }),
    Product.create({
      name: 'Rockin Around th…',
      description:
        'Rockin Around the Christmas Tree - funny Dwayne Johnson mug, gag gift',
      price: 1299,
      quantity: 29,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/NkGtkB8H7473EEd.jpg'
    }),
    Product.create({
      name: 'Wake Me When Its…',
      description:
        'Wake Me When Its Friday - Funny Sloth Mug, Monday morning mug, funny office gift for coworker',
      price: 1299,
      quantity: 41,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/9dAi5YD4rbGN6KK.jpg'
    }),
    Product.create({
      name: 'You are Rad - Fun…',
      description: 'You are Rad - Funny Punny Radish Mug, Vegan Gift Mug',
      price: 1299,
      quantity: 17,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/FrKeT7GBsrNbKt4.jpg'
    }),
    Product.create({
      name: 'Things I Love - F…',
      description:
        'Things I Love - Funny Cute Cat Gift Mug for a Cat and Coffee Lover',
      price: 1299,
      quantity: 40,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/yErnBzRkhff7bi7.jpg'
    }),
    Product.create({
      name: 'Future Mrs - Funn…',
      description: 'Future Mrs - Funny Mug, Gift for Bride-to-Be',
      price: 1299,
      quantity: 11,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/Sy52EGfaaiFEneG.jpg'
    }),
    Product.create({
      name: 'I Got Your Back -…',
      description: 'I Got Your Back - Funny Punny Mug for Best Friend',
      price: 1299,
      quantity: 22,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/6rfsynk6R9dEDK7.jpg'
    }),
    Product.create({
      name: 'All I Care About …',
      description:
        'All I Care About is My Cat - Funny Cat Mug, Gift for Cat Lover',
      price: 1299,
      quantity: 24,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/nFa8Ze9S2kYFh9N.jpg'
    }),
    Product.create({
      name: 'Citrus Cage, Funn…',
      description:
        'Citrus Cage, Funny Smiling Nicolas Cage Face Swap Mug, gag gift, nick cage mug, coworker mug, best friend mug, crazy mugs, bff mugs',
      price: 1299,
      quantity: 14,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/Ha6h772R85rAzKA.jpg'
    }),
    Product.create({
      name: 'Youre My Purrson…',
      description:
        'Youre My Purrson - Adorable Love Couple Mug, for boyfriend, for girlfriend, Crazy Cat Lady Mug',
      price: 1299,
      quantity: 29,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/6b8zeRN3NAby484.jpg'
    }),
    Product.create({
      name: 'Youre One in a M…',
      description:
        'Youre One in a Melon - Custom Name Punny Mug, Girlfriend Mug, Best Friend Mug, Love Mug, Valentines Day Mug',
      price: 1299,
      quantity: 9,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/3y533T4S9SZFziB.jpg'
    }),
    Product.create({
      name: 'Avocardio - Funny…',
      description: 'Avocardio - Funny Avocado Running Mug, Sports Lover Mug',
      price: 1299,
      quantity: 8,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/tFT5F5Eskf2FZY6.jpg'
    }),
    Product.create({
      name: 'I work hard so my…',
      description:
        'I work hard so my cat can have a better life, funny crazy cat lady mug',
      price: 1299,
      quantity: 24,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/4BiSRTsez9eQeeb.jpg'
    }),
    Product.create({
      name: 'Dont Go Bacon My…',
      description: 'Dont Go Bacon My Heart - Funny Punny Couples Coffee Mug',
      price: 1299,
      quantity: 19,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/nYk823f3kTt8yE7.jpg'
    }),
    Product.create({
      name: 'Best Dog Mom Ever…',
      description:
        'Best Dog Mom Ever, 11oz funny mug, dog lover mug, crazy dog mom mug, gift for mom, mom mug, dog owner gift',
      price: 1299,
      quantity: 39,
      imageUrl: 'https://ninedollarmugs.com/gi/301/0/p/A4sY5dS72Krd4Da.jpg'
    })
  ])

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
