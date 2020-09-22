'use strict';

const express = require('express');

class HttpServer {
  constructor (bot, opts) {
    const app = opts.app || express();

    if (!opts.app) {
      app.use(express.json());
    }

    app.post(`/${opts.path}` || '/', async (req, res) => {
      try {
        if (bot) {
          await bot.handleRequest(req.body, opts.path);
        }
        res.sendStatus(200);
      } catch (e) {
        console.error(e);
      }
    });
    
    if (!opts.app) {
      app.listen(opts.port || 80);
    }
  }
}

module.exports = HttpServer;
