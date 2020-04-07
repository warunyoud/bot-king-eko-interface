'use strict';

const express = require('express');

class HttpServer {
  constructor (bot, opts) {
    const app = express();
    app.use(express.json());

    app.post('/', async (req, res) => {
      try {
        if (bot) {
          await bot.handleRequest(req.body);
        }
        res.sendStatus(200);
      } catch (e) {
        console.error(e);
      }
    });
    app.listen(opts.port || 80);
  }
}

module.exports = HttpServer;
