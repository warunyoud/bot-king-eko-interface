'use strict';

const {
  HttpServer,
  EkoClient
} = require('./lib');

module.exports = {
  HttpServer,
  EkoClient
};

module.exports = (bot, opts) => {
  const httpServer = new HttpServer(bot, opts);
  const client = new EkoClient(opts);

  return {
    httpServer,
    client
  }
}
