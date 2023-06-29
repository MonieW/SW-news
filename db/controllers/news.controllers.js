const {selectTopics,fetchEndpoints} = require("../models/news.models.js");

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


