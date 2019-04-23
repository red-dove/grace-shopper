/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('--- --->/api/products/', () => {

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      // expect(res.body[0].id).to.be.equal('1')
    })
  })
  describe('/api/products/:id', () => {

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)
        .expect('Content-Type', /json/)
    })

  })
})

