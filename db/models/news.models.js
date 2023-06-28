const db = require("../connection.js");
const fs = require("fs/promises");

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchEndpoints = () => {
  return fs.readFile("endpoints.json", "utf8").then((endpoints) => {
    return JSON.parse(endpoints);
  });
};
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
