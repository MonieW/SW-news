const{selectTopics} = require('../models/news.models.js')

exports.getTopics = (request, response) => {
    selectTopics()
.then((topics) => {
response.status(200).send({topics})

})
}