const request = require('supertest');
const app = require('../db/app');
const seed = require('../db/seeds/seed');
const testdata = require('../db/data/test-data');
const db = require('../db/connection')

beforeEach(() => {
    return seed(testdata)
})

afterAll(() => {
    return db.end()
})
describe('GET /api/topics', () => {
    it('responds with a status of 200, and an array containing all topic objects', () => {
        return request(app) // arrange
        .get('/api/topics') // act
        .expect(200) // assert
        .then(({body}) => {
            expect(body.topics.length).toBe(3);  
            body.topics.forEach(topic => {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                });
            }) 
        })
    })
    describe('GET /api/', () => {
        it('responds with a status of 200, and an object containing all endpoints', () => {

        })
    }) 
})
