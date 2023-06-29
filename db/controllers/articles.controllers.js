const {fetchArticlesById, fetchArticles}=require('../models/articles.models')


exports.getArticlesById = (request, response, next) => {
    const { article_id } = request.params;
    fetchArticlesById(article_id)
      .then((articles) => {
        response.status(200).send({ articles });
      })
      .catch(next);
  };

  
  exports.getArticles = (request, response, next) => {
    fetchArticles()
      .then((articles) => {
        response.status(200).send({ articles });
      })
      .catch(next);
  };