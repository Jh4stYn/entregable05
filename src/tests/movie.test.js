require('../models')
const request = require('supertest')
const app = require('../app')
const Genre = require('../models/Genre.model')
const Actor = require('../models/Actor.model')
const Director = require('../models/Director.model')

const BASE_URL = '/api/v1/movies'

let movieId 

const movie = {
  name: "Inception",
  image: "https://example.com/inception.jpg",
  synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  releaseYear: "2010-07-16"
}

const movieUpdate = {
  name: "Parasite",
  image: "https://example.com/parasite.jpg",
  synopsis: "The film explores complex social class dynamics through the story of a low-income family that infiltrates the lives of a wealthy family. Winning several international awards, including the Academy Award for Best Picture, it is renowned for its social commentary and intricate plot.",
  releaseYear: "2019-07-16"
}

test('POST -> BASE_URL, should return statusCode 201, and res.body.name === movie.name', async() => {
  const res = await request(app)
    .post(BASE_URL)
    .send(movie)
  
  console.log(res.body)
  movieId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1', async() => {
  const res = await request(app)
    .get(BASE_URL)
  
  console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].genres).toHaveLength(0)
    expect(res.body[0].actors).toHaveLength(0)
    expect(res.body[0].directors ).toHaveLength(0)
})

test('GET -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movie.name', async() => { 
  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test('PUT -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movieUpdate.name', async() => {
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)
  
  console.log(res.body)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
})

test('POST -> BASE_URL/movieId/genres should return statusCode 200, and res.body.length === 1', async() => {
  const genre = {
    name: 'Science Fiction'
  }
  const createGenres = await Genre.create(genre)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenres.id])

  console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createGenres.id)

  await createGenres.destroy()
})

test('POST -> BASE_URL/movieId/actors should return statusCode 200, and res.body.length === 1', async() => {
  const actor = {
    firstName: 'Leonardo',
    lastName: 'DiCaprio',
    nationality: 'American',
    image: 'http://',
    birthday: '1974-06-16',
  }
  const createActors = await Actor.create(actor)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActors.id])

  console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createActors.id)

  await createActors.destroy()
})

test('POST -> BASE_URL/movieId/directors should return statusCode 200, and res.body.length === 1', async() => {
  const director = {
    firstName: 'Christopher',
    lastName: 'Nolan',
    nationality: 'British-American',
    image: 'http//',
    birthday: '1970-08-30',
  }
  const createDirectors = await Director.create(director)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirectors.id])

  console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createDirectors.id)

  await createDirectors.destroy()
})

test('DELETE -> BASE_URL/movieId, should return statusCode 204', async() => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)
  
  console.log(res.body)
  expect(res.status).toBe(204)
})