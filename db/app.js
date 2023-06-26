const{getTopics} = require('./controllers/news.controllers')
const express = require('express')
const app = express()

app.get('/api/topics', getTopics)



module.exports = app
