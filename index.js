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
  const httpServer = new HttpServer(bot, opts.httpServer);
  const client = new EkoClient(opts.eko);

  return {
    httpServer,
    client
  }
}
