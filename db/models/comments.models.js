const db = require("../connection.js");


exports.fetchComments = (article_id) => {
    return db.query (`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({ status: 404, msg: 'id not found' });
        }
    })
    .then(() => {
        return db
        .query (
            `SELECT * FROM comments  WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id])
            .then(({rows}) => {
                return rows
                
            })   
    })
    };

