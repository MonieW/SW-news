const {
  selectTopics,
  fetchEndpoints,
  fetchArticlesById,
  fetchArticles,
} = require("../models/news.models.js");

exports.getTopics = (request, response, next) => {
  selectTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch(next);
};

exports.getEndpoints = (request, response, next) => {
  fetchEndpoints()
    .then((endpoints) => {
      response.status(200).send(endpoints);
    })
    .catch(next);
};
exports.getArticlesById = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticlesById(article_id)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};
exports.getArticles = (request, response, next) => {
  console.log("inthecontroller");
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};
