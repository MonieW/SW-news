const db = require("../connection.js");
const articles = require("../data/test-data/articles.js");


exports.fetchArticlesById = (article_id) => {
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: `id not found` });
        }
        return rows[0];
      });
  };

  
  exports.fetchArticles = () => {
    return db
      .query(
        `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
      COUNT(comments.article_id)::INT 
      AS comment_count 
      FROM articles 
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id 
      GROUP BY articles.article_id
      ORDER BY created_at DESC`
      )
      .then(({ rows }) => {
      return rows;
      });
  };
  exports.updateArticle = (newVote, article_id) => {
    const {inc_votes} = newVote
    return db
    .query (`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,[inc_votes, article_id],
  
      )
      .then (({rows}) => {
        return rows[0]
      })
     
   
  }