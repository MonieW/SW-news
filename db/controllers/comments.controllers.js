const {fetchComments, insertComment, removeComment} = require('../models/comments.models')

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

exports.deleteComment = (requests, response, next) => {
    const {comment_id} = request.params
    console.log(comment_id, '<COMMENTID')
    removeComment(request.body, comment_id)
    .then((comment) => {
        response.status(204).send({comment})
    })

}