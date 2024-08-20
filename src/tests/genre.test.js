const request = require("supertest")
const app = require('../app')
require('../models')

let genreId

const genre = {
    name: "Comedy"
}

const BASE_URL = "/api/v1/genres"

test("POST -> BASE_URL, should return statusCode 201, and res.body.name === genre.name", async () => {
    const res = await request(app)
    .post(`${BASE_URL}`)
    .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name) 
})

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
        .get(`${BASE_URL}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        expect(res.body[0].name).toBe(genre.name)
})

test("GET -> BASE_URL/:id, should return statusCode 200, and res.body.name === genre.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${genreId}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
})

test("PUT -> BASE_URL/:id, should return statusCode 200, and res.body.name === genreUpdate.name", async() => {
    const genreUpdate = {
        name: "Comedy",
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genreUpdate.name)
})

test("DELETE -> BASE_URL/:id, should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)

        // console.log(res.status)

        expect(res.status).toBe(204)
        expect(res.body).toBeDefined()
})