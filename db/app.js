const{getTopics, getEndpoints, getArticlesById, getArticles} = require('./controllers/news.controllers.js')
const express = require('express')
const app = express()

app.get('/api/topics', getTopics)

app.get('/api/', getEndpoints)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)


app.use((error, request, response, next) => {
    if(error.status && error.msg) {
        response.status(error.status).send({msg: `${error.msg}`})
} else next(error);
})

app.use((error, request, response, next) => {
    if(error.code === '22P02') {
        response.status(400).send({msg: 'invalid input'})
    } else next(error)
    
})

app.use((error, request, response, next) => {
    console.log(error)
    response.status(500).send({msg: 'Internal Server Error'})
})









module.exports = app
