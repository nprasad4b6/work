const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/users')


const objectId =new mongoose.Types.objectId()
const userOne = {
    _id: objectId,
    name :"TestName",
    email : "testemail@gmail.com",
    password: "test123"
}

beforeEach( async ()=>{
await User.deleteMany()
await new User(userOne).save()
})

test('for creating new user', async ()=> {
    await request(app).post('/users').send({
            name: "prasad1",
            email: "prasad1@gmail.com",
            password: "pass123"
    }).expect(201)
})

test('for login existing user', async ()=> {
    await request(app).post('/users/login').send({
            email:userOne.email,
            password: userOne.password
    }).expect(200)
})


test('for login of invalid user', async ()=> {
    await request(app).post('/users/login').send({
            email:"test",
            password: userOne.password
    }).expect(400)
})

test('getting user by id', async ()=> {
    await request(app).get('/users/me')
    .send()
    .set('Authorization', `Bearer ${userOne._id}`)
    .expect(400)
})