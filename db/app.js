const{getTopics, getEndpoints} = require('./controllers/news.controllers.js')
const{getArticlesById, getArticles} = require('./controllers/articles.controllers')
const{getComments} = require('./controllers/comments.controllers')
const express = require('express')
const app = express()


app.get('/api/topics', getTopics)

app.get('/api/', getEndpoints)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getComments)



//errors



app.use((error, request, response, next) => {
    console.log(error)
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
