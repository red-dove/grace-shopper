'use strict'

const db = require('./server/db')
const Product = require('./server/db/models/product')
const User = require('./server/db/models/user')

//const Cart = db.model('cart')



async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'aaa@email.com', password: '123'}),
    User.create({email: 'bbb@email.com', password: '123'}),
    User.create({email: 'ccc@email.com', password: '123'}),
    User.create({email: 'ddd@email.com', password: '123'}),
    User.create({email: 'erat.Vivamus@disparturientmontes.co.uk', password: 'egestas.urna.justo@Vivamussitamet.edu'}),
    User.create({email: 'imperdiet.dictum.magna@et.org', password: 'nec@apurusDuis.co.uk'}),
    User.create({email: 'Phasellus.elit.pede@ligulaeuenim.net', password: 'aliquet.molestie.tellus@Morbisit.net'}),
    User.create({email: 'et.euismod.et@adipiscinglobortis.com', password: 'montes@imperdietullamcorper.net'}),
    User.create({email: 'id@magnanec.org', password: 'non.sollicitudin@loremvehicula.com'}),
    User.create({email: 'amet@euneque.co.uk', password: 'mattis.Integer@euismodmauris.net'}),
    User.create({email: 'vulputate@magnatellusfaucibus.com', password: 'ullamcorper.velit@Etiambibendum.net'}),
    User.create({email: 'et.magnis.dis@mi.com', password: 'enim.Etiam.imperdiet@ultricies.net'}),
    User.create({email: 'non@elitsed.com', password: 'ligula.elit@sed.net'}),
    User.create({email: 'euismod@habitant.net', password: 'mauris.id.sapien@orci.edu'}),
    User.create({email: 'semper.et.lacinia@ipsumprimis.edu', password: 'sagittis@ante.com'}),
    User.create({email: 'ridiculus@convallisconvallisdolor.org', password: 'consequat.dolor@Fuscefeugiat.com'}),
    User.create({email: 'magna.Cras@idanteNunc.co.uk', password: 'nec.leo.Morbi@dictum.net'}),
    User.create({email: 'arcu@posuereatvelit.co.uk', password: 'Donec.tempus@Nullasemper.edu'}),
    User.create({email: 'Curabitur@sitametnulla.com', password: 'morbi@adipiscingelitEtiam.net'}),
    User.create({email: 'Praesent.eu@consequat.org', password: 'ante.Maecenas@risusDonec.ca'}),
    User.create({email: 'nibh.lacinia.orci@Proinnislsem.net', password: 'id.nunc.interdum@pedeCum.org'}),
    User.create({email: 'ut.nisi@Curabiturut.edu', password: 'a.felis@sedleo.net'}),
    User.create({email: 'sem.Nulla.interdum@nibhDonecest.com', password: 'lectus@pedeacurna.org'}),
    User.create({email: 'adipiscing@tacitisociosquad.ca', password: 'sed.dictum@molestie.org'}),
    User.create({email: 'molestie.tortor@risus.net', password: 'Morbi.metus.Vivamus@tristique.net'}),
    User.create({email: 'imperdiet.nec@at.co.uk', password: 'sit@et.net'}),
    User.create({email: 'orci.adipiscing@dignissimtemporarcu.org', password: 'convallis.convallis@sociisnatoquepenatibus.ca'}),
    User.create({email: 'at.augue@et.org', password: 'massa.Quisque.porttitor@eratin.net'}),
    User.create({email: 'Mauris.non@elitEtiamlaoreet.ca', password: 'nunc.Quisque@anteMaecenas.co.uk'}),
    User.create({email: 'dictum@eleifendnec.org', password: 'diam.dictum@egetmollislectus.net'}),
    User.create({email: 'mus.Donec@egetipsum.net', password: 'pretium@urnaNuncquis.org'}),
    User.create({email: 'eu@ami.ca', password: 'felis@eutellus.edu'}),
    User.create({email: 'pellentesque@Duisgravida.org', password: 'quis.urna.Nunc@amet.net'}),
    User.create({email: 'risus.quis.diam@idblandit.co.uk', password: 'arcu.Vestibulum.ante@ligula.edu'}),
    User.create({email: 'dictum.magna.Ut@nibhdolor.net', password: 'ligula@orciconsectetuer.org'}),
    User.create({email: 'tristique@dolorFusce.net', password: 'cursus@ligula.ca'}),
    User.create({email: 'faucibus.lectus.a@acfermentum.net', password: 'posuere.cubilia@ac.com'}),
    User.create({email: 'Nam.ac@egestasascelerisque.edu', password: 'arcu@sapien.com'}),
    User.create({email: 'vestibulum.Mauris@vulputate.edu', password: 'orci.Phasellus.dapibus@tinciduntduiaugue.co.uk'}),
    User.create({email: 'Curabitur@luctusfelispurus.co.uk', password: 'Proin.non@consectetueradipiscingelit.co.uk'}),
    User.create({email: 'leo.Morbi@turpisnecmauris.com', password: 'quam.elementum.at@enimnec.edu'}),
    User.create({email: 'non@consequatlectus.org', password: 'vitae@Vestibulumut.co.uk'}),
    User.create({email: 'odio@non.org', password: 'dui.Fusce.diam@gravida.edu'}),
    User.create({email: 'arcu@viverraMaecenas.edu', password: 'ut.ipsum@ornaresagittisfelis.org'}),
    User.create({email: 'velit.Pellentesque@tinciduntduiaugue.ca', password: 'malesuada.ut@lorem.ca'}),
    User.create({email: 'malesuada@auctorvitaealiquet.ca', password: 'magna.nec@Vivamusnibhdolor.edu'}),
    User.create({email: 'vitae@mollisIntegertincidunt.co.uk', password: 'massa.non.ante@Suspendissealiquetmolestie.net'}),
    User.create({email: 'euismod@Duis.edu', password: 'auctor@sitamet.org'}),
    User.create({email: 'pellentesque@Nullam.ca', password: 'mollis.nec@bibendumfermentum.org'}),
    User.create({email: 'Cras@Suspendissedui.org', password: 'Suspendisse.sed@orci.com'}),
    User.create({email: 'Suspendisse@Integer.net', password: 'id.enim@gravida.co.uk'}),
    User.create({email: 'montes.nascetur.ridiculus@risusNullaeget.ca', password: 'aliquet.Phasellus@Curabitursed.org'}),
    User.create({email: 'libero@in.org', password: 'eu.eros@etlacinia.ca'}),
    User.create({email: 'Donec.porttitor@magnaCras.org', password: 'non@ut.net'}),
    User.create({email: 'orci@sedpede.ca', password: 'massa.Suspendisse@enimdiam.co.uk'}),
    User.create({email: 'adipiscing.ligula.Aenean@aliquam.edu', password: 'eros.turpis.non@placerataugueSed.com'}),
    User.create({email: 'sagittis@lobortis.net', password: 'lacus.Quisque.purus@euenim.ca'}),
  ])

  const products = await Promise.all([
    Product.create({name: 'Bee Cool Mug', description: 'Show off your love for bees and how terribly important they are with this environmentally conscious, bee humor, eco-friendly, save the bees, bee pun coffee mug! Let the world know that it is super cool to care about the bees!',price: 29.99, stock: 15,
    imageUrl: 'https://images.lookhuman.com/render/standard/6954620610410526/mug11oz-whi-z1-t-bee-cool.jpg'  }),
    Product.create({name: 'No Fox Given', description: 'Premium ceramic. 11oz capacity. Microwave and top-shelf dishwasher safe. Embedded image. Vacuum-form printed in U.S.A.',
    price: 39.99, stock: 10, imageUrl: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiBvdWN8NThAhXjm-AKHW76CFkQjRx6BAgBEAU&url=https%3A%2F%2Fwww.teepublic.com%2Fmug%2F748669-no-fox-given-funny-humor&psig=AOvVaw2bleJ1qRsJDBZ2VdP1F13z&ust=1555512143299565'}),
    Product.create({name: 'PIKA-SHOOK COFFEE MUG', description: `Shocking, isn't it? Celebrate your love of memes, Pikachu, gaming and Pokemon with this surprised Pikachu design!`
        ,price: 12.99, stock: 5, imageUrl: `https://images.lookhuman.com/render/standard/qCNKPOhKunxmmfff2Sv4EDpsu6M2X2ai/mug15oz-whi-z1-t-pika-shook.jpg` }),
    Product.create ( {name: 'Rainy Days Gallon', description: `I love rainy days. I love the sound. I love the smell. When it's overcast, I light candles. Rainy Days put me in the mood to stay home on the couch and curl up with a good book!`,
        price:43, stock:32, imageUrl:`https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbLNkVemXTnZdZ0Me-U7YpX4wNH9f-lAiV-Uz2DG-2Fxk_pX2femRuBKEF6kJpDcxToZ21pPzedJh5USGK0HTMPhCbO9pyF2SrJGyiEqOr7dv2-XxFQhT8&usqp=CAE` }),
    Product.create({name: 'Chalk Style Paint Silos District', description: `You don’t have to buy new furniture to get new furniture — simply revive your existing pieces with this Chalk-Style Paint from Magnolia Home by Joanna Gaines.`,
         price: 32, stock:10, imageUrl: `https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSrSQD9RCHqYXBw6ns9OpGXkIRYkQv6cl2pO3KPO7xonY4rBzB5qpJ0N2ZM_dXmZ0VpsyJcz8ZXIEw1fhaGBE2aTuKuZHrUxmNkGR9BYs6KffKpS6NyFvC2&usqp=CAE`})
  ])

  // const cart = await Promise.all([
  //   Cart.create({userId: 1, productId: 1}),
  //   Cart.create({userId: 1, productId: 2}),
  //   Cart.create({userId: 1, productId: 3}),
  //   Cart.create({userId: 2, productId: 1}),
  //   Cart.create({userId: 2, productId: 2}),
  //   Cart.create({userId: 3, productId: 3}),
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
