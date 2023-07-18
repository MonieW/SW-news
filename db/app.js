const{getTopics, getEndpoints} = require('./controllers/news.controllers.js')
const{getArticlesById, getArticles, patchArticle} = require('./controllers/articles.controllers')
const{getComments, postComment, deleteComment} = require('./controllers/comments.controllers')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());

app.use(express.json());


app.get('/api/topics', getTopics)

app.get('/api/', getEndpoints)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getComments)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle )

app.delete('api/comments/:comment_id', deleteComment)


//errors



app.use((error, request, response, next) => {
    if(error.status && error.msg) {
        response.status(error.status).send({msg: `${error.msg}`})
} else next(error);
})

app.use((error, request, response, next) => {
    if(error.code === '22P02'|| error.code ==='23502') {
        response.status(400).send({msg: 'invalid input'})
    } else if(error.code === '23503') {
        response.status(404).send({msg: 'not found'})
    } else (next(error))
    
})

app.use((error, request, response, next) => {
   console.log(error)
    response.status(500).send({msg: 'Internal Server Error'})
})









module.exports = app
