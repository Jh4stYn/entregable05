const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/actors'

let actorId 

const actor = {
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
  nationality: 'American',
  image: 'http://',
  birthday: '1974-06-16',
}

const actorUpdate = {
  firstName: 'Song',
  lastName: 'Kang-ho',
  nationality: 'South Korean',
  image: 'http:/',
  birthday: '1967-06-16',
}

test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === actor.firstName ', async() => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor)
  
  // console.log(res.body)
  actorId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1 ', async() => { 
  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('GET -> BASE_URL/actorId, should return statusCode 200, and res.body.length === 1 ', async() => { 
  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test('PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actorUpdate.firstName', async() => {
  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)
  
  // console.log(res.body)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)
})

test('DELETE -> BASE_URL/actorId, should return statusCode 204', async() => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

  // console.log(res.body)
  expect(res.status).toBe(204)
})

