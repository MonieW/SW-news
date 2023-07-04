const {fetchComments, insertComment} = require('../models/comments.models')

exports.getComments = (request, response, next) => {
    const{article_id} = request.params
    fetchComments(article_id)
    .then((comments) => {
        response.status(200).send({comments})
       
    })
    .catch(next)
}

exports.postComment = (request, response, next) => {
    const{article_id} = request.params
    insertComment(request.body, article_id)
    .then((comment) => {
    response.status(200).send({comment})
    })
    .catch(next)    
    

}