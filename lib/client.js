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
      scopes: ['bot', 'workflow']
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
    try {
      const response = await this.instance.post('/bot/v1/message/text', {
        replyToken,
        message
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async replyV2(replyToken, messages, tries=0) {
    try {
      const response = await this.instance.post('/bot/v2/message/reply', {
        replyToken,
        messages
      });
      return response.data;
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 401 && tries < 1) {
        await this.token();
        await this.replyV2(replyToken, messages, tries + 1);
      }
    }
  }

  async pushV2(gid, tid, messages, tries=0) {
    try {
      const response = await this.instance.post('/bot/v2/message/push', {
        tid,
        gid,
        messages
      });
      return response.data;
    } catch (e) {
      console.error(e);
      if (e.response && e.response.status === 401 && tries < 1) {
        await this.token();
        await this.pushV2(replyToken, messages, tries + 1);
      }
    }
  }
}

module.exports = EkoClient;
