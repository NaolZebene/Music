const joi = require("@hapi/joi");

const schema = {
  music: joi.object({
    title: joi.string().required(),
    genre: joi.string().required(),
    album: joi.string().required(),
    artist: joi.string().required(),
  })
};

module.exports = schema;