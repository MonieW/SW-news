const request = require('supertest');
const app = require('../db/app');
const seed = require('../db/seeds/seed');
const testdata = require('../db/data/test-data');
const db = require('../db/connection')
const fs = require('fs/promises');
const articles = require('../db/data/test-data/articles');

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
            return request(app)
            .get('/api/')
            .expect(200)
            .then(({body}) => {
                fs.readFile('./endpoints.json', 'utf8')
                .then((endpoints) => {
                   expect(body).toMatchObject(JSON.parse(endpoints))
                })  
            })
        })
 })
 describe('GET /api/articles/:articles_id', () => {
    it('responds with a status of 200, and an array containing article object matching the id input', () => {
        return request(app) // arrange
        .get('/api/articles/1') // act
        .expect(200) // assert
        .then(({body}) => {
                expect(body.articles).toMatchObject({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id:1,
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String)
                });
            }) 
        })
    })
 describe('GET /api/articles/:article_id', () => {
    it('status:400, responds with an error message when passed an invalid user ID', () => {
        return request(app)
        .get('/api/articles/notAnId')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('invalid input')
            })  
        })
    })
})
describe('GET /api/articles/:article_id', () => {
    it('status:404, responds with an error message when passed an id that doesn/t exist', () => {
        return request(app)
        .get('/api/articles/50')
        .expect(404)
        .then(({body}) => {
             expect(body.msg).toBe('id not found')
            })  
        })
    })  


