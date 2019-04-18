import React, {Component} from 'react'

export default class Cart extends Component {
  render() {
    const items = [
      {
        name: 'Bee Cool Mug',
        description:
          'Show off your love for bees and how terribly important they are with this environmentally conscious, bee humor, eco-friendly, save the bees, bee pun coffee mug! Let the world know that it is super cool to care about the bees!',
        price: 29.99,
        stock: 15,
        imageUrl:
          'https://images.lookhuman.com/render/standard/6954620610410526/mug11oz-whi-z1-t-bee-cool.jpg'
      },
      {
        name: 'Bee Cool Mug',
        description:
          'Show off your love for bees and how terribly important they are with this environmentally conscious, bee humor, eco-friendly, save the bees, bee pun coffee mug! Let the world know that it is super cool to care about the bees!',
        price: 29.99,
        stock: 15,
        imageUrl:
          'https://images.lookhuman.com/render/standard/6954620610410526/mug11oz-whi-z1-t-bee-cool.jpg'
      },
      {
        name: 'Bee Cool Mug',
        description:
          'Show off your love for bees and how terribly important they are with this environmentally conscious, bee humor, eco-friendly, save the bees, bee pun coffee mug! Let the world know that it is super cool to care about the bees!',
        price: 29.99,
        stock: 15,
        imageUrl:
          'https://images.lookhuman.com/render/standard/6954620610410526/mug11oz-whi-z1-t-bee-cool.jpg'
      }
    ]
    return (
      <div>
        <h1>OUR CART</h1>
        <ul>
          {items.map(item => {
            return <li>{item.name}</li>
          })}
        </ul>
      </div>
    )
  }
}
