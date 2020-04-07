'use strict';

const axios = require('axios');
const ClientOAuth2 = require('client-oauth2');

class EkoClient {
  constructor (opts) {
    const baseURL = opts.baseURL; 
    this.instance = axios.create({
      baseURL,
      timeout: 5000
    });

    this.botOAuth = new ClientOAuth2({
      clientId: opts.clientId,
      clientSecret: opts.clientSecret,
      accessTokenUri: `${baseURL}/oauth/token`,
      scopes: ['bot']
    });
    this.token();
  }

  async token () {
    try {
      const { data: { access_token } } = await this.botOAuth.credentials.getToken();
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    } catch (e) {
      console.error(e);
    }
  }

  async message (replyToken, message) {
    const response = await this.instance.post('/bot/v1/message/text', {
      replyToken,
      message
    });
    return response.data;
  }
}

module.exports = EkoClient;
