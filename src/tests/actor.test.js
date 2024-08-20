const request = require("supertest")
const app = require('../app')

const actor = {
    firstName: "Jim",
    lastName: "Carrey",
    nationality: "American",
    image: "Jim Image",
    birthday: "1962-01-17"
}

const BASE_URL = "/api/v1/actors"

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstname === actor.firstname", async () => {
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)
    console.log(res.body);
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)  
})

// firstName:,lastName:, nationality:, image, birthday: