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

exports.insertComment = (newComment, article_id) => {
    const{body, author} = newComment
    return db
    .query('INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;',[body, author, article_id])

    .then(({rows}) => {
        return rows[0];
     })
}
exports.removeComment = (comment_id) => {
    console.log(comment_id, '< COMMENT')
    return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    .then(({rows}) => {
console.log(rows, '<<ROWS')
        return rows;
    })
}

