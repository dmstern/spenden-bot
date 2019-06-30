var Twit = require("twit");

let TwitterClient = null;

const key = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
};

function getClient() {
  if (TwitterClient) {
    return TwitterClient;
  }
  return (TwitterClient = new Twit({ ...key }));
}

module.exports = getClient;
