const request = require("supertest")
const app = require('../app')
require('../models')

let directorId

const director = {
    firstName: "Rafael",
    lastName: "Pérez",
    nationality: "Venezuelan",
    image: "RafaImage.png",
    birthday: "1999-02-12"
}

const BASE_URL = "/api/v1/directors"

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstname === director.firstname", async () => {
    const res = await request(app)
    .post(`${BASE_URL}`)
    .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)  
    expect(res.body.lastName).toBe(director.lastName)
    expect(res.body.nationality).toBe(director.nationality)
    expect(res.body.image).toBe(director.image)
    expect(res.body.birthday).toBe(director.birthday)
})

test("Get -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => { 
    
    const res = await request(app)
    .get(`${BASE_URL}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
 })

 test("Get -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === director.firstName", async () => { 
    
    const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
    expect(res.body.lastName).toBe(director.lastName)
    expect(res.body.nationality).toBe(director.nationality)
    expect(res.body.image).toBe(director.image)
    expect(res.body.birthday).toBe(director.birthday)
 })

 test("PUT -> BASE_URL/directorId, should return statusCode 200, and res.body.director === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: "Adam",
        lastName: "Sandler",
        nationality: "Canadian",
        image: "AdamImage.png",
        birthday: "1964-06-17"
    }

    const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
    expect(res.body.lastName).toBe(directorUpdate.lastName)
    expect(res.body.nationality).toBe(directorUpdate.nationality)
    expect(res.body.image).toBe(directorUpdate.image)
    expect(res.body.birthday).toBe(directorUpdate.birthday)
})

test("DELETE -> BASE_URL/directorId, should return statusCode 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)
})
