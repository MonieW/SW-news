const {fetchComments} = require('../models/comments.models')

exports.getComments = (request, response, next) => {
    const{article_id} = request.params
    fetchComments(article_id)
    .then((comments) => {
        response.status(200).send({comments})
       
    })
    .catch(next)
}