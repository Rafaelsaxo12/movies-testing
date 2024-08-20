const request = require("supertest")
const app = require('../app')
require('../models');

let actorId

const actor = {
    firstName: "Jim",
    lastName: "Carrey",
    nationality: "American",
    image: "JimImage.png",
    birthday: "1962-01-17"
}

const BASE_URL = "/api/v1/actors"

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstname === actor.firstname", async () => {
    const res = await request(app)
    .post(`${BASE_URL}`)
    .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)  
    expect(res.body.lastName).toBe(actor.lastName)
    expect(res.body.nationality).toBe(actor.nationality)
    expect(res.body.image).toBe(actor.image)
    expect(res.body.birthday).toBe(actor.birthday)
})

test("Get -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => { 
    
    const res = await request(app)
    .get(`${BASE_URL}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
 })

test("Get -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actor.firstName", async () => { 
    
    const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
    expect(res.body.lastName).toBe(actor.lastName)
    expect(res.body.nationality).toBe(actor.nationality)
    expect(res.body.image).toBe(actor.image)
    expect(res.body.birthday).toBe(actor.birthday)
 })

test("PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.actor === actorUpdate.firstName", async () => {
    const actorUpdate = {
        firstName: "Adam",
        lastName: "Sandler",
        nationality: "Canadian",
        image: "AdamImage.png",
        birthday: "1964-06-17"
    }

    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
    expect(res.body.lastName).toBe(actorUpdate.lastName)
    expect(res.body.nationality).toBe(actorUpdate.nationality)
    expect(res.body.image).toBe(actorUpdate.image)
    expect(res.body.birthday).toBe(actorUpdate.birthday)
})

test("DELETE -> BASE_URL/actorId, should return statusCode 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(204)
})