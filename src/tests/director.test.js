const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/directors'

let directorId 

const director = {
  firstName: 'Christopher',
  lastName: 'Nolan',
  nationality: 'British-American',
  image: 'http//',
  birthday: '1970-08-30',
}

const directorUpdate = {
  firstName: 'Bong',
  lastName: 'Joon-ho',
  nationality: 'South Korean',
  image: 'http://',
  birthday: '1969-08-30',
}

test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === director.firstName', async() => {
  const res = await request(app)
    .post(BASE_URL)
    .send(director)
  
  // console.log(res.body)
  directorId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1', async() => {
  const res = await request(app)
    .get(BASE_URL)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test('GET -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === director.firstName', async() => { 
  const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

test('PUT -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === directorUpdate.firstName', async() => {
  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)
  
  // console.log(res.body)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test('DELETE -> BASE_URL/directorId, should return statusCode 204', async() => {
  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)
  
  // console.log(res.body)
  expect(res.status).toBe(204)
})